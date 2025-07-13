#!/usr/bin/env node
// backend/run-lhr.js
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

// Read arguments from the parent process
// We expect a single JSON-stringified arg: { url, options }
const { url, options } = JSON.parse(process.argv[2])

;(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
  try {
    const runnerResult = await lighthouse(url, {
      port: chrome.port,
      ...options
    })
    // Print the LHR to stdout so parent can read it
    console.log(JSON.stringify(runnerResult.lhr))
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await chrome.kill()
  }
})()
