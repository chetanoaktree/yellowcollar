import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import LoadingSimple from './loading_simple';
import {tag, Loading} from '../../view/_blocks/ui'
import s from './add_images.module.scss';
import axios from 'axios';

import { IKContext, IKImage, IKUpload } from 'imagekitio-react';



const IK_Upload = ({type, handler, id, setProcess, btype="upload", custom_button}) => {
  const publicKey = process.env.IKPBK;
  const urlEndpoint =  process.env.IKENDPOINT;
  const authenticationEndpoint = process.env.API+'/api/com/image_upload/ik';

  const onError = err => {
    console.log("Error", err);
    setProcess(false) 
  };

  const onSuccess = res => {
    //console.log("Success", res);
    handler({ik_file:res})
    setProcess(false)   
  };
  const onChange = res => {
    console.log("IK Change", res);
    setProcess(id)   
  };
  const onClick = res => {
    console.log("IK Click", res);
  };
  
  let text = btype=='upload' ? 'Upload' : 'Change'
  let c_= btype=='upload' ? s.upload_image : s.change_image  

  let content_=(
    <div>
      { btype=='upload' && <div className={s.icon}><img src="/images/Add_blue.svg"/></div>}
      <div className={s.label}>{text}</div>
    </div>
  )
  if(custom_button!=false){
    content_=custom_button
    c_=s.custom_button
  }
  return(
    <div className={c_}>
      {content_}
      <IKContext 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticationEndpoint={authenticationEndpoint} 
      >        
        <IKUpload   
          folder={type}
          onClick={onClick}   
          onChange={onChange}       
          onError={onError}
          onSuccess={onSuccess}
        />
      </IKContext>
    </div>
  )
}

const com = ({type="product", img=false, image_id, image, user, id, product_id, custom_button=false, handler, ...props}) => { 
  if(!user) return (<div></div>)
  
  const [isCurrentImage, setCurrentImage] = useState({url:'', name:''});
  const [isFile, setFile] = useState(false) 
  const [isProcess, setProcess] = useState(false) 
  const [isImage, setImage] = useState(image ? image : {image_id:''}) 

  let c_=''

  //console.log("image", image)
  //console.log("isImage", isImage)

  useEffect(()=>{
    if(image_id!='' && image) setImage(image) 
  },[image_id])
  
  const uploadIKHandler = async ({ik_file}) => {   
    setProcess(id)    
    console.log("ik_file", ik_file); 
    let args={type, ik_file, product_id}
    if(isImage.image_id) args.change_image_id=isImage.image_id
    const result=await handler({action:"upload_IK_image", ...args})     
    console.log("ik_file return", result); 
    if(result) setImage(result.image) 
    setProcess(false)  
  }
  const deleteIKHandler = async () => {   
    setProcess(id)    
    const result=await handler({action:"delete_IK_image", image_id:isImage.image_id})  
    setImage({})
    setProcess(false)  
    console.log("ik_file delete return", result);   
  }

  const uploadImageHandler = async (action, i) => {    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };    
    let actionM="upload_product_image"
    if(type=="brand") actionM="upload_brand_image"
    if(type=="site") actionM="upload_site_image"
    if(type=="user") actionM="upload_user_image"
    const formData = new FormData();
    formData.append('type', type);
    formData.append('file', i);    
    formData.append('fileName', i.name); 
    formData.append('action', actionM);
    formData.append('business_id', user.id);
    formData.append('product_id', product_id);
    if(img) {
      formData.append('change_img', img);
      console.log("change_img", img)
    }
    if(image_id) {
      formData.append('change_image_id', image_id);
      console.log("change_image_id", image_id)
    }
    
    //const upload = await axios.post(process.env.API+'/api/com/image_upload/action', formData, config);
    const result=await handler(formData, config)    
    setFile(false)
  }  
  
  const deleteImageHandler= async () => {   
    setProcess(id)
    let action2="delete_product_image"
    if(type=="brand") action2="delete_brand_image"
    if(type=="site") action2="delete_site_image"
    if(type=="user") action2="delete_user_image"
    await handler({action:action2, img, product_id:product_id})
    setProcess(false)    
  }

  const handleChange=(action, e)=>{
    let i=e.target.files[0]
    console.log("i", i)
    
    setCurrentImage((prev)=>{           
      return ({...prev, url:URL.createObjectURL(i)})
    });
    setFile((prev)=>{ 
      uploadImageHandler(action, i)       
      return({...prev, ...i})
    })
  } 
  //<div className={s.image} style={{backgroundImage:'url("/products/'+img+'")'}}>
  const Loading2 = () => {
    return(<div  className={s.loading} ><img src="/images/loading.svg"/></div>)
  }
  const Image=()=>{
    let name=isCurrentImage.name
    let image_url
    if(isImage.image_id){
      image_url=isImage.path_
    }else if(img){
      image_url=`/${type}/${img}`
    }   
    return(
      <div className={s.image} style={{backgroundImage:'url("'+image_url+'")'}}>
       {name}
       <div className={s.actions}>
        {/*<div className={s.action+' '+s.delete} onClick={()=>deleteImageHandler()}><img src="/images/Trash_light.svg"/></div>*/}
        <div className={s.action+' '+s.delete} onClick={()=>deleteIKHandler()}><img src="/images/Trash_light.svg"/></div>
       </div>
       <LoadingSimple show={isProcess == id ? true : false}/>
      </div>
    )
  } 
  const CurrentImage=()=>{
    return(
      <div className={s.current_image} style={{backgroundImage:'url("'+isCurrentImage.url+'")'}}>
        <LoadingSimple show={true}/>
      </div>
    )
  }
  const UploadImage=()=>{
    return(
      <div className={s.upload_image}>
        <div className={s.icon}><img src="/images/Add_blue.svg"/></div>
        <div className={s.label}>Add Image</div>
        <input name="img" type="file" onChange={(e)=>handleChange("add", e)}/> 
      </div>
    )
  }
  const ChangeImage=()=>{
    return(
      <div className={s.change_image}>        
        <div className={s.label}>Change Image</div>
        <input name="img" type="file" onChange={(e)=>handleChange("change", e)}/> 
      </div>
    )
  }
  c_+= id ? (" "+s.change) : " " 

  if(custom_button!=''){
    c_+=' '+s.custom_button_holder
  }

  let loading_ = <Loading {...{value:'', isProcessing:true}}/>
  return(
    <div>
      <div className={s.main+' '+c_}>      
        {(isImage.image_id) && <Image/>} 
        {/*isImage && <CurrentImage/>} 
        {(img && !isFile) && <ChangeImage/> }
        {(!img && !isFile) && <UploadImage/> */}
        {(isImage.image_id) &&<IK_Upload {...{type, handler:uploadIKHandler, btype:"change", custom_button, id, setProcess}}/>}
        {(!isImage.image_id) &&<IK_Upload {...{type, handler:uploadIKHandler, btype:"upload", custom_button, id, setProcess}}/>}
        {isProcess !=false && <div className={s.loading+" "}>{loading_}</div>}
      </div>
    </div>
  )
  /*return(    
    <div className={s.main+' '+c_}>      
      {(img && !isFile) && <Image/>} 
      {isFile && <CurrentImage/>} 
      {(img && !isFile) && <ChangeImage/> }
      {(!img && !isFile) && <UploadImage/> }
      
    </div>
  )*/
}
export default com