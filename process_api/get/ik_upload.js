import {insert_image, delete_image} from './image'

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IKPBK,
    privateKey : process.env.IKPVK,
    urlEndpoint : process.env.IKENDPOINT
}); 


const upload_url_file = async ({file, filename="my_file_name.jpg", folder=""}) => {  
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
  if(ret) await insert_image({ik_file:ret, source:'imagekit'}) 
  return ret 
}
export {
  upload_url_file
}