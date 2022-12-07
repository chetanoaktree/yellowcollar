import { jsPDF } from "jspdf";
import { Blob } from 'buffer';

export default async function handler(req, res) {  

  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  doc.text("Hello world!", 10, 10);
  //doc.save("a4.pdf");
  var blobPDF =  new Blob([ doc.output() ], { type : 'application/pdf'});
  console.log("blobPDF", blobPDF)
  let data={test:12}  
  res.status(200).json(data);  
}
