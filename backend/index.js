import { getThrottlingProfile } from "./utils/networkThrottling.js";
import cors from "cors";
import express from "express";

import { spawn } from "child_process";

const app = express();
app.use(express.json());
app.use(cors());

// Helper to run one Lighthouse audit in its own process
function runOnce(url, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath, // node executable
      ['./run-lhr.js', JSON.stringify({ url, options })],
      { stdio: ['ignore', 'pipe', 'inherit'] }
    )

    let output = ''
    child.stdout.on('data', chunk => (output += chunk))

    child.on('close', code => {
      if (code === 0) {
        try {
          resolve(JSON.parse(output))
        } catch (e) {
          reject(e)
        }
      } else {
        reject(new Error(`LHR child exited with code ${code}`))
      }
    })
  })
}

app.post("/run-lighthouse", async (req, res) => {
  const {
    mode,
    network,
    runs,
    url,
  } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing URL." });
  }

  const results = [];
  const commonOptions = {
    emulatedFormFactor: mode === 'Mobile' ? 'mobile' : 'desktop',
    throttlingMethod: 'provided',
    onlyCategories: ['performance','accessibility','seo'],
    output: 'json'
  };
  const throttlingConfig = getThrottlingProfile(network);
  commonOptions.throttling = throttlingConfig;

  for (let i = 0; i < runs; i++) {
    try {
      const lhr = await runOnce(url, commonOptions)
      results.push(lhr)
    } catch (err) {
      console.error('Run failed:', err)
      // decide whether to retry or push a dummy
      results.push(null)
    }
  }
  res.json(results);
});

app.listen(3001, () => {
  console.log("✅ Backend running on http://localhost:3001");
});
