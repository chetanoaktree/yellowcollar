//const playwright = require('playwright');
export default async function handler(req, res) { 
  /*  // @ts-check
  (async () => {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/search?q=Google');
    await page.pdf({ path: `document.pdf` });
    await browser.close();
  })();
*/
  let data={test:12}  
  res.status(200).json(data);  
}
