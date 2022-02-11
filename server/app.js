const puppeteer = require("puppeteer-extra");
const express = require("express");
const cors = require("cors");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

let basisAPY;
let franciumAPY;
let tulipAPY;

const webScraper = async (url, xPath, source) => {
  console.log(source, "starting...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(5000);

    const APYSelector = (await page.$x(xPath))[0];

    const text = await page.evaluate((el) => {
      return el.textContent;
    }, APYSelector);

    if (source === "Solscan: ") {
      var text2 = text.replace(/,/g, "");
      //console.log(text2);
      calculateAPY(text2);
    } else {
      var text3 = text.replace(/ \%/g, "");
      console.log(source, text3);
    }

    if (source === "Francium: ") {
      franciumAPY = text3;
    }

    if (source === "Tulip: ") {
      tulipAPY = text3;
    }
  } catch (e) {
    console.log("There was an error: ", e);
  } finally {
    await browser.close();
  }
};

const calculateAPY = (vaultTokens) => {
  var t = 80 * (13194.444444444443 / vaultTokens) * 365;
  var x = Math.round(100 * (Math.pow(1 + t / 29200, 29200) - 1)).toFixed(2);
  console.log("BASIS: ", x);
  basisAPY = x;
};

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

var interval = setInterval(() => {
  webScraper(
    "https://francium.io/app/lend",
    '//*[@id="app"]/div/div[3]/div/div/div/div[2]/div/div[2]/div/div/div/div/div/div/table/tbody/tr[22]/td[2]/div/p',
    "Francium: "
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
}, 300000);

/* REST API */

const app = express();
app.use(cors());

// Used to lock down domain
// app.use(cors({
//   origin: 'http://yourapp.com'
// }));

app.get("/basis", (req, res) => {
  res.status(200).send({
    basis: basisAPY,
    francium: franciumAPY,
    tulip: tulipAPY,
  });
});

app.listen(4000, () => console.log(`Example app listening on port ${4000}!`));
