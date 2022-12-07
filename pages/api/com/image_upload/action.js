import action from '/process_api/com/image_upload/action'
import {simple as uniqid} from '/process_api/util/uniqid';
import formidable from 'formidable';
import mv from 'mv'
import _ from 'lodash'

import { open } from 'node:fs/promises';

import {IKUploadLocal, IKUploadUrl} from '/process_api/com/image_upload/imagekit'


/* Don't miss that! */
export const config = {
    api: {
        bodyParser: false,
    }
};

const upload_to_IK = async ({oldPath, newPath, destImg, folder}) => {
    let IKFolder=`/${folder}/`               
    let IKName=destImg
    
    
    const ret = await new Promise((resolve, reject) => {
        mv(oldPath, newPath, async function(err) {
            let mv_data
            let IKFile
            if(process.env.ENVIRONMENT=='prod'){
                IKFile=`${process.env.API}/${folder}/${destImg}`
                mv_data= await IKUploadUrl({IKFile, IKFolder, IKName})
            }else{
                IKFile=`./public/${folder}/${destImg}`
                mv_data= await IKUploadLocal({IKFile, IKFolder, IKName})
            }     
            console.log("mv_data", mv_data)       
            resolve(mv_data);
        });
    })    
    return ret
}
//type ProcessedFiles = Array;
const handler = async (req, res) => {    
    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

    /* Get files using formidable */
    const data2 = await new Promise((resolve, reject) => {
       const form = new formidable.IncomingForm()        
       
        form.parse(req, async (err, fields, files) => {
            console.log("fields", fields)  
            console.log("files", files) 
            let folder='products'
            let prefix=uniqid()+'_'
            if(fields.product_id) prefix+=fields.product_id+'_'
            if(fields.type=='brand') folder='brands'
            else if(fields.type=='site') folder='site'
            else if(fields.type=='user') folder='user'

            if (err) return reject(err)

           
            if(files.file){  
                var destImg = prefix + files.file.originalFilename
                var oldPath = files.file.filepath;
                var newPath = `./public/${folder}/${destImg}`;                            
                let ik_file=await upload_to_IK({oldPath, newPath, destImg, folder})                
                fields["ik_file"]=ik_file
                fields["img"]=destImg
            }           
            resolve({fields, files}); 
        })
    }).catch(e => {
        //console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });
    console.log("data2", data2)    
    const da=await action(data2.fields)
    res.status(200).json(da)
}

export default handler
