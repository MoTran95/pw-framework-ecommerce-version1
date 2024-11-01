// globalTeardown.js
module.exports = async () => {
    console.log("Global Teardown: Closing browser...");
    if (global.browser) {
      await global.browser.close();  // Close the browser after all tests
    }
  };
  