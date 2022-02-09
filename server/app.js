const puppeteer = require("puppeteer-extra");
const express = require("express");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

/* REST API */

const app = express();

app.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});

app.listen(4000, () => console.log(`Example app listening on port ${4000}!`));

const webScraper = async (url, xPath, source) => {
  console.log(source, "starting...");

  //var startTime = performance.now();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForTimeout(5000);

  const featureArticle = (await page.$x(xPath))[0];

  const text = await page.evaluate((el) => {
    return el.textContent;
  }, featureArticle);

  if (source === "Solscan: ") {
    var text2 = text.replace(/,/g, "");
    //console.log(text2);
    calculateAPY(text2);
  } else {
    console.log(source, text);
  }

  //var endTime = performance.now();
  //console.log(`${source} took ${Math.floor(endTime - startTime)} milliseconds`);

  await browser.close();
};

const calculateAPY = (vaultTokens) => {
  var t = 80 * (13194.444444444443 / vaultTokens) * 365;
  var x = 100 * (Math.pow(1 + t / 29200, 29200) - 1);
  console.log("BASIS: ", x);
};

// var interval = setInterval(() => {
//   webScraper(
//     "https://francium.io/app/lend",
//     '//*[@id="app"]/div/div[3]/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/table/tbody/tr[22]/td[2]/div/p',
//     "Francium: "
//   );
//   webScraper(
//     "https://tulip.garden/lend",
//     '//*[contains(text(), "BASIS")]/parent::*/parent::*/parent::*//*[contains(text(), "%")]',
//     "Tulip: "
//   );
//   webScraper(
//     "https://solscan.io/account/3sBX8hj4URsiBCSRV26fEHkake295fQnM44EYKKsSs51",
//     '//*[@id="root"]/section/main/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/text()[1]',
//     "Solscan: "
//   );
// }, 300000);

webScraper(
  "https://francium.io/app/lend",
  '//*[@id="app"]/div/div[3]/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/table/tbody/tr[22]/td[2]/div/p',
  "Francium: " //*[@id="app"]/div/div[3]/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/table/tbody/tr[contains(text(), "BASIS")]
);
webScraper(
  "https://tulip.garden/lend",
  '//*[contains(text(), "BASIS")]/parent::*/parent::*/parent::*//*[contains(text(), "%")]',
  "Tulip: "
);
webScraper(
  "https://solscan.io/account/3sBX8hj4URsiBCSRV26fEHkake295fQnM44EYKKsSs51",
  '//*[@id="root"]/section/main/div/div[2]/div/div[1]/div/div[2]/div[4]/div[2]/text()[1]',
  "Solscan: "
);
