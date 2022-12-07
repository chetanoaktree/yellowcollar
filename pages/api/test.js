//var html_to_pdf = require('html-pdf-node');
let a=1
export default async function handler(req, res) { 
  let data={test:12}
  if(a>1) {
    res.status(200).json(data); 
  }else {
    /*
    //let file = { content: "<div><style>.bg{background-color:red;}</style><h1 style='letter-spacing:2px;'>Welcome to html-pdf-node fasty</h1><div style='width:100%; display:flex; justify-content:center; background-color:#ff0000;color:#00ffff;'>12<img style='margin:auto; width:400px; height:auto;' src='https://images.pexels.com/photos/13532888/pexels-photo-13532888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/></div><div class='bg' style='background-color:#ff0000; color:#00ffff; font-weight:bold; height:100px;'>123</div></div>" };
    // or //
    let file = { url: "https://www.yellowcollar.club/" };
    let options = { format: 'A4', path: a+'result2.pdf' };
    
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
      console.log("PDF Buffer:-", pdfBuffer);
    });    
    //import pdfGenerator from 'pdfkit'
    //const pdfGenerator = require('pdfkit')
    //const fs = require('fs')
  // let theOutput = new PDFGenerator()
    //theOutput.pipe(fs.createWriteStream('TestDocument.pdf'))
    //theOutput.end()    */
    res.status(200).json(data);  
  }
  a++
}
