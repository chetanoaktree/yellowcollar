const puppeteer = require('puppeteer')

export default async function handler(req, res) { 
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://blog.risingstack.com', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });
  
  console.log("PDF", pdf)
 
  await browser.close();  

  let data={test:12}  
  res.status(200).json(data);  
}
