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
          reject("Error from runOnce:", e)
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

app.get("/run-lighthouse-stream", async (req, res) => {
  const {
    mode,
    network,
    runs = 1,
    url,
  } = req.query;

  if (!url) {
    res.writeHead(400, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*"
    });
    res.write(`event: error\ndata: ${JSON.stringify({ error: "Missing URL." })}\n\n`);
    res.end();
    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });

  const emit = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  const results = [];
  const commonOptions = {
    emulatedFormFactor: mode === 'Mobile' ? 'mobile' : 'desktop',
    throttlingMethod: 'provided',
    onlyCategories: ['performance','accessibility','seo'],
    output: 'json',
    throttling: getThrottlingProfile(network)
  };

  for (let i = 0; i < runs; i++) {
    try {
      const lhr = await runOnce(url, commonOptions);
      results.push(lhr);
      emit("progress", { completed: i + 1, total: runs });
    } catch (err) {
      console.error('Run failed:', err);
      results.push(null);
      emit("progress", { completed: i + 1, total: runs, error: true });
    }
  }

  emit("complete", results);
  res.end();
});

app.listen(3001, () => {
  console.log("✅ Backend running on http://localhost:3001");
});
