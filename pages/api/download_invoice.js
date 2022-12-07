import action, {generate_html} from '../../process_api/admin/invoice_download'

import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';


const pipeline = promisify(stream.pipeline);
//const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';


const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})



const handler = async (req, res) => { 
  let API=process.env.API 
  const { id } = req.query  
  const obj = await action({id, API});

  const response = await fetch(obj.url, { agent });
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${obj.filename}`);
  await pipeline(response.body, res);
};
const handler2 = async (req, res) => {
  let API=process.env.API 
  const { id } = req.query  
  const html = await generate_html({id, API}); 
  let body=`<h1>Fasty</h1>`
  res.status(200).send(html);
};

export default handler;
