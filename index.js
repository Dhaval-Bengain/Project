const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto("https://swap.defillama.com/");

// Fill the form

  await page.click(".css-1d8n9bt");
  const ArbitrumOption = (await page.$x("//div[contains(text(),'Arbitrum')]"))[0]; // selecting Arbitrum Option
  await ArbitrumOption.click();

// deleting predefine input
  const inputSelector = 'input[class="chakra-input css-lv0ed5"]';
  await page.focus(inputSelector);
  await page.keyboard.down("ControlLeft");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("Backspace");
  await page.keyboard.up("ControlLeft");

// typing input 
  await page.type(inputSelector, "12");

  // Token (you sell)
  await page.click('span[class="chakra-text css-sys4p8"]');                           // select token (you sell)
  await page.type('input[class="chakra-input css-s1d1f4"]', "WBTC");                  // filling the input
  const btcOption = await page.waitForSelector( "div ::-p-text(Wrapped BTC (WBTC))"); // selecting BTC option
  await btcOption.click();

  // Select token (you buy)
  const btn = (await page.$x("//span[contains(text(),'Select Token')]"))[0]; // button click
  await btn.click();
  await page.type('input[class="chakra-input css-s1d1f4"]', "usdc"); // filling the input
  const usdcOption = await page.waitForSelector('div ::-p-text("USD Coin (USDC)")'); // usdc element capture
  await usdcOption.click();


  await page.waitForSelector(".sc-d413ea6e-0", {visible: true,timeout: 4000,}); // wait for right section to load
 
  // setTimeout is used when site takes time to load
  setTimeout(() => {
    page.evaluate(() => {
      let elements = document.getElementsByClassName("sc-d413ea6e-0");
      if (elements.length > 0) elements[1].click();
    });
  }, 5000);

  
  // Keep the browser window open
  await new Promise(() => { });
})();
