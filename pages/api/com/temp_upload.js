import formidable from "formidable";
import fs from "fs";
import shortid from 'shortid'

const config = {
  api: {
    bodyParser: false
  }
};

const savePostFile = async (req, res) => {
  const myPromise = new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      console.log("fields", fields)
      console.log("files", files.file)
      fields.uploaded_file=await saveToServer(files.file);
      resolve(fields);
    });    
  });
  return myPromise
};

const saveToServer = async (file) => {
  let shortid_=shortid.generate()   
  console.log("file.path", file)
  const data = fs.readFileSync(file.filepath);
  let ret={
    public_path:`/temp/${shortid_}-${file.originalFilename}`,
    server_path:`./public/temp/${shortid_}-${file.originalFilename}`
  }
  fs.writeFileSync(ret.server_path, data);  
  //await fs.unlinkSync(file.path);
  return ret;
};

// not using now
export{
  config,
  savePostFile
}
