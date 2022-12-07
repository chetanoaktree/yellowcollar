import action, {generate_html, generate_handlebars_html, get_footer} from '../../process_api/admin/invoice_download'

import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';
import axios from 'axios'


const pipeline = promisify(stream.pipeline);
//const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';


const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})



const handler1 = async (req, res) => { 
  let API=process.env.API 
  const { id } = req.query  
  const obj = await action({id, API});

  const response = await fetch(obj.url, { agent });
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${obj.filename}`);
  await pipeline(response.body, res);
};
const handler = async (req, res) => { 
  let API=process.env.API 
  const { id } = req.query  
  let html = await generate_handlebars_html({id, API}); 
  let footer = get_footer(); 
  console.log("html", html)
  html=encodeURIComponent(html)
  
  console.log("html2", html)
  const obj = {
    url:'https://yccpdf.vercel.app/?html='+html,
    url:'http://prali.in/tool/pdf/api/?html='+html,
    url:'http://prali.in/tool/pdf/api/',
    filename:'invocie.pdf'
  }
  const params = new URLSearchParams();
  params.append('html', html);
  params.append('footer', footer)
  const body={html:'fasty'}
  const response = await fetch(obj.url, { method: 'post', body: params});
  const pdfBuffer = await response.buffer();
  //await writeFile('test.mp4', buffer);
  console.log('Done!');
  console.log("response", response)
  console.log("buffer", pdfBuffer)
  //const response = await axios(obj.url);
  //if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  //console.log("response", response)
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${obj.filename}`);
  res.send(pdfBuffer)
  //await pipeline(response.body, res);
  //res.status(200).json(obj);
};
const handler2 = async (req, res) => {
  let API=process.env.API 
  const { id } = req.query  
  const html = await generate_html({id, API}); 
  let body=`<h1>Fasty</h1>`
  res.status(200).send(html);
};

export default handler;
