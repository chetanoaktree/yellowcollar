//import action from '/process_api/com/image_upload/action'
import mv from 'mv'
import _ from 'lodash'

import { open } from 'node:fs/promises';

var ImageKit = require("imagekit");
var fs = require('fs');
var path = require('path');    


var imagekit = new ImageKit({
    publicKey : process.env.IKPBK,
    privateKey : process.env.IKPVK,
    urlEndpoint : process.env.IKENDPOINT
}); 
const upload_url_file = async ({file, test, filename="my_file_name.jpg", folder=""}) => {
    //console.log("upload_local_file", 1)
     const ret = await new Promise((resolve, reject) => {       
        var filePath=file
        console.log("filePath", filePath)        
        imagekit.upload({
            file : filePath, //required
            fileName : filename, //required
            folder : folder, 
            tags: ["tag1", "tag2"]
        }, function(error, result) {
            if (error) return reject(error)
            if (result) return resolve(result); 
        });
     })
    return ret 
}
const upload_local_file = async ({file, test, filename="my_file_name.jpg", folder=""}) => {
    //console.log("upload_local_file", 1)
     const ret = await new Promise((resolve, reject) => {        
        var filePath=file
        console.log("filePath", filePath)        
        fs.readFile(filePath, function(err, data) {
            //console.log("Image", data);
            if (err) throw reject(err); // Fail if the file can't be read.
            imagekit.upload({
                file : data, //required
                fileName : filename, //required
                folder : folder, 
                tags: ["tag1", "tag2"]
            }, function(error, result) {
                if (error) return reject(error)
                if (result) return resolve(result); 
            });
        });
     })
    return ret 
}
const handler = async (req, res) => {   
    const { auth } = req.query   
    console.log("imagekit", imagekit)
    let da={test:'fasty', query:req.query }
    if(auth==1) {
        da=imagekit.getAuthenticationParameters()        
    }else{

    }
    upload_local_file({file:'./public/user/l6oxsn92_1_Influencer_01.png'})
    upload_local_file({file:'./public/user/l6oxtzwb_1_influencer_2.png'})
    res.status(200).json(da)
}

export default handler

const IKUpload = (i) =>{
    let {IKFile, IKFolder, IKName} = i
    console.log("IKupload", i)
    imagekit.upload({
        file : IKFile, //required
        fileName : IKName, //required
        tags: ["tag1", "tag2"]
    }, function(error, result) {
        if(error) console.log("error", error);
        else console.log("result", result);
    });
}
const IKUploadUrl = async (i) =>{
    let {test, IKFile, IKFolder, IKName} = i
    console.log("IKupload", i)
    let data=await upload_url_file({test, file:IKFile, filename:IKName, folder:IKFolder})   
    console.log("IKUploadLocal data", data)
    return data
}
const IKUploadLocal = async (i) =>{
    let {test, IKFile, IKFolder, IKName} = i
    console.log("IKupload", i)
    let data=await upload_local_file({test, file:IKFile, filename:IKName, folder:IKFolder})   
    console.log("IKUploadLocal data", data)
    return data
}
const IKDelete = async ({file_id}) =>{
    imagekit.deleteFile(file_id, function(error, result) {
        if(error) console.log(error);
        else console.log(result);
    });
}

export {
    IKUploadUrl,
    IKUploadLocal,
    IKDelete
}
