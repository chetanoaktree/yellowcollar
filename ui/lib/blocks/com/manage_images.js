import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import LoadingSimple from './loading_simple';
import s from './manage_images.module.scss';
import axios from 'axios';

const com = ({type="product", images, user, product_id, deleteImageHandler, getImagesHandler, ...props}) => { 
  if(!user) return (<div></div>)
  
  const [isCurrentImage, setCurrentImage] = useState({url:'', name:''});
  const [isFile, setFile] = useState(false) 
  const [isProcess, setProcess] = useState(false) 

  let c_=''

  const uploadHandler = async (i) => {    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };    

    const formData = new FormData();
    formData.append('file', i);
    formData.append('fileName', i.name); 
    formData.append('action', 'upload_image');
    formData.append('business_id', user.id);
    formData.append('product_id', product_id);

    //console.log('file', i)
    const upload = await axios.post(process.env.API+'/api/com/image_upload/action', formData, config);

    await getImagesHandler2()
    setFile(false)
    console.log('upload_data', upload.data)
  }  
  const getImagesHandler2= async () => {    
    await getImagesHandler({action:'get_images', product_id:product_id})
  }
  const deleteImageHandler2= async (id, img, image_id) => {
    console.log("id", id)
    setProcess(id)
    await deleteImageHandler({action:'delete_image', id, img, image_id, product_id:product_id})
    setProcess(false)
    getImagesHandler2()
  }

  const handleChange=(e)=>{
    let i=e.target.files[0]
    
    setCurrentImage((prev)=>{           
      return ({...prev, url:URL.createObjectURL(i)})
    });
    setFile((prev)=>{ 
      uploadHandler(i)       
      return({...prev, ...i})
    })  
     
     
  }
  
  const Loading2 = () => {
    return(<div  className={s.loading} ><img src="/images/loading.svg"/></div>)
  }
  const Image=(i)=>{
    let {id, img, name, image, image_id} = i 
    //console.log("IMAGE", image)
    let src=''
    if(image_id){
      src=image.path_
    }else{
      src="/products/'+img+'"
    }
    return(
      <div className={s.image} style={{backgroundImage:'url("'+src+'")'}}>
       {name}
       <div className={s.actions}>
        <div className={s.action+' '+s.delete} onClick={()=>deleteImageHandler2(id, img, image_id)}><img src="/images/Trash_light.svg"/></div>
       </div>
       <LoadingSimple show={isProcess == id ? true : false}/>
      </div>
    )
  }
  const Images=()=>{
    return(
      <div className={s.images}>
        {images.map((i, index)=>{
          return <Image key={index} {...i}/>
        })}  
        {isFile && <CurrentImage/>}
        <UploadImage/>      
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
        <div className={s.label}>Upload Image</div>
        <input name="img" type="file" onChange={handleChange}/> 
      </div>
    )
  }
  return(
    <div className={s.main+' '+c_}>
      <Images/>      
    </div>
  )
}
export default com