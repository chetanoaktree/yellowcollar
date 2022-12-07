import _ from 'lodash'

let get_size_src=(i)=>{  
  let {src='', path='', tr} = i
  let urlEndpoint = process.env.IKENDPOINT;
  if(!tr) tr="tr:w-120,h-120"
  
  let src_
  if(path!=''){    
    src_=`${urlEndpoint}/${tr}${path}`
  }else if(src!=''){
    src_=src
  }else{
    src_='/images/Img_box_light.svg'
  }
  //console.log("img", i)
  return src_
}
let get_thumb_src=(i)=>{  
  let {src='', path='', tr} = i
  if(!tr) tr="tr:w-120,h-120,cm-pad_resize,bg-ffffff"  
  let src_=get_size_src({src, path, tr})  
  return src_
} 
let get_size_600_src=(i)=>{  
  let {src='', path='', tr} = i
  if(!tr) tr="tr:w-800,h-800"  
  let src_=get_size_src({src, path, tr})  
  return src_
} 
let get_size_p600_src=(i)=>{  
  let {src='', path='', tr} = i
  if(!tr) tr="tr:w-600,h-600,cm-pad_resize,bg-ffffff"  
  let src_=get_size_src({src, path, tr})  
  return src_
} 



const get_image_src = ({image_id, image, img, type}) =>{
  let src=''
  if(image_id && image){
    src=image.path_
  }else{
    if(type!='' && img!=''){
      src=`/${type}/${img}`
    }else if(img!=''){
      src=img
    }else{
      src='/images/Img_box_light.svg'
    }
  }
  return src
}
const get_product_image_src = ({image_id, image, img}) =>{
  let src=get_image_src({image_id, image, img, type:'products'})
  return src
}
const get_brand_image_src = ({image_id, image, img}) =>{
  let src=get_image_src({image_id, image, img, type:'brands'})
  return src
}
const get_site_image_src = ({image_id, image, img}) =>{
  let src=get_image_src({image_id, image, img, type:'site'})
  return src
}
const Thumb = (image) =>{
  let src=get_thumb_src(image)  
  return (<div className={'rounded-full bg-cover bg-center'} style={{paddingTop:'100%', backgroundImage:'url("'+src+'")'}}></div>)
}

export {
  get_size_src,
  get_thumb_src,
  get_size_600_src,
  get_size_p600_src,
  get_image_src,
  get_site_image_src,
  get_brand_image_src,
  get_product_image_src,
  Thumb
}
