// globalSetup.js
const { chromium } = require('playwright');

module.exports = async () => {
  console.log("Global Setup: Launching browser...");
  const browser = await chromium.launch({ headless: false });
  global.browser = browser;  // Store the browser globally
};
