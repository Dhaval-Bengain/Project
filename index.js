const puppeteer = require('puppeteer');

(async () => {
  // Launch headful browser
  const browser = await puppeteer.launch({ headless: false });

  // Open a new tab and navigate to the website
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});                                   //open page in max size
  await page.goto('https://swap.defillama.com/'); 


  // Fill the form

  

  await page.locator('input[class="chakra-input css-lv0ed5"]').fill('12');                //you sell input

  //token (you sell)
  await page.locator('span[class="chakra-text css-sys4p8"]').click();                     // select token (you sell)
  await page.locator('input[class="chakra-input css-s1d1f4"]').fill('WBTC');              // filling the input
  const btcOption = await page.waitForSelector('div ::-p-text(Wrapped BTC (WBTC))');    // selecting BTC option
  await btcOption.click();


  // select token (you buy)
  //  Note => insted of class use spam to capture the botton otherwise first button will be selected
  
  const btn = (await page.$x("//span[contains(text(),'Select Token')]"))[0];          //button click   
  await btn.click();
  await page.locator('input[class="chakra-input css-s1d1f4"]').fill('usdc');          // filling the input
  const usdcOption = await page.waitForSelector('div ::-p-text(USD Coin (USDC))');    // udsc element capture
  await usdcOption.click();


  
await page.waitForSelector('.sc-d413ea6e-0', { timeout: 50000 });                    // wait for right section to lode
await page.evaluate(() => {                                                          // evaluate is used to write vanilla javascript
          		let elements = document.getElementsByClassName('sc-d413ea6e-0');       // select all div containing 'sc-d413ea6e-0' class
          		if (elements.length > 0)
  				elements[1].click()                                                        // selecting 2nd element
      		})



  // Keep the browser window open
  await new Promise(() => { });
})();
