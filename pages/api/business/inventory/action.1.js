import action from '../../../../process_api/business/inventory/action'
import { supabase } from '../../../../util/supabaseClient'

import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';
import mv from 'mv'
import {moveFile} from 'move-file';
import _ from 'lodash'

/* Don't miss that! */
export const config = {
    api: {
        bodyParser: false,
    }
};

//type ProcessedFiles = Array;

const handler2 = async (req, res) => {
    //console.log("req.body", req.body)
    //const { data, error } = await supabase.storage.createBucket('avatars')
    //console.log( "STs", error);
    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

    /* Get files using formidable */

    const data2 = await new Promise((resolve, reject) => {
       const form = new formidable.IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            console.log("files", files)
            //console.log(fields, files)
            if(files){
                console.log("filepath",files.file.filepath)
                var oldPath = files.file.filepath;
                var newPath = `./public/products/${files.file.originalFilename}`;
                mv(oldPath, newPath, function(err) {
                });
                fields["img"]=files.file.originalFilename 
            }           
            resolve({fields, files});           
            //res.status(200).json(da)
        })
    }).catch(e => {
        console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });
    console.log("data2", data2)
    const da=await action(data2.fields)
    res.status(200).json(da)
    /*
    const {body, files} = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files = [];
        let body = {};
        form.parse(req,function(err, fields, file){
            body=fields       
            //console.log('fields', fields);
        });
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve({body, files}));
        form.on('error', err => reject(err));
        form.parse(req, () => {
            console.log("fasty", 'req')
        });   
          
    }).catch(e => {
        console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });
    console.log("files", files);
    console.log("body", body); 
    */   
    /*if(files && files.length){

      let file=files[0]
      console.log("file", file);

      let obj={}
      _.forOwn(file[1], function(value, key) { 
        obj[key]=value
      });
      console.log("obj", obj)
      
      let avatarFile=file[1]
      const uploaded = await supabase.storage
      .from('products')
      .upload(obj.originalFilename, obj)
      console.log("avatarFile", avatarFile)      
      console.log( "STs", uploaded);
    }
    
    
    console.log("sd", process.cwd())
    if (files?.length) {

        // Create directory for uploads
        const targetPath = path.join(process.cwd(), `/uploads/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        // Move uploaded files to directory 
        for (const file of files) {
            const tempPath = file[1].filepath;
            await fs.rename(tempPath, targetPath + file[1].originalFilename);           
        }
    }*/
    

    if (2>4 && files?.length) {
        // Create directory for uploads
        const targetPath = path.join(process.cwd(), `/uploads/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }
        const file= files[0]        
        const tempPath = file[1].filepath;  
        const desPath = file[1].originalFilename;            
        /*mv(tempPath, targetPath + desPath, function(err) {
            console.log(err)
        });*/
        moveFile(tempPath, targetPath + desPath, function(err) {
            console.log(err)
        });
        
        body["img"]=desPath   

        const Store = await supabase.storage
        .from('products')
        .upload(file[1].originalFilename, file) 
        console.log("Store", Store)   
    }
    //const data=await action(body)
    //console.log("resultBody", resultBody);
    //res.status(status).json(resultBody);
}

const handler = async (req, res) => {
  
  console.log("req", req) 
  //const { id } = req.query  
  const data=await action(req.body)  
  //console.log(req)
  //const data={fasty:123}
  res.status(200).json(data);  
}

export default handler
