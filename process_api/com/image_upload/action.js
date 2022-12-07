import { supabase } from '../../../util/supabaseClient'
import fs from "fs";

import {insert_image, delete_image} from '../../get/image'

const upload_an_image = async ({ik_file, img}) =>{
  let ret 
  if(ik_file){
    let image=await insert_image({ik_file, source:'imagekit'})  
    console.log("ik_file res", image) 
    ret={image_id:image.image_id}
  }else{
    ret={img}
  } 
  return ret
}
const upload_or_change_image = async (props) => {     
    let {type, change_img} = props 
    let res={...props}   
    if(change_img) {
      fs.unlink(`./public/${type}/${change_img}`, ()=>console.log("file_changed"))
    }
    return res
}
const delete_an_image = async (props) => {     
    let {type, img, image_id} = props 
    let res={...props} 
    res.img=''
    res.image_id=''
    if(image_id) delete_image({image_id})
    if(img) fs.unlink(`./public/${type}/${img}`, ()=>console.log("file_deleted"))
    return res
}
export default async function  process(props) {
  let {action, type, product_id, business_id, title, name, change_img, img, ik_file}=props 
  let status   
  let data={} 
  let product={}
  let res={}
  console.log("props", props)

  let image_args=await upload_an_image(props)

  if(action=='upload_image'){ 

    product = await supabase
    .from('product_image')
    .insert([{product_id, ...image_args}])      
    console.log("product", product)

  }else if(action=='upload_product_image'){ 
    
          
    product = await supabase
    .from('product')
    .update([
      {...image_args},
    ])      
    .eq('id', product_id)
    console.log("product", product)
    if(change_img) {
      fs.unlink("./public/products/"+change_img, ()=>console.log("file_changed"))
    }
  }else if(action=='upload_brand_image'){       
    res=upload_or_change_image(props)
  }else if(action=='upload_site_image'){       
    res=upload_or_change_image(props)
  }else if(action=='upload_user_image'){       
    res=upload_or_change_image(props)

  }else if(action=='delete_product_image'){     
    product = await supabase
    .from('product')
    .update([
      {img:'', image_id:''},
    ])      
    .eq('id', product_id)
    console.log("product", product)
    /*if(image_id) {
      fs.unlink("./public/products/"+img, ()=>console.log("file_deleted"))
    } 
    if(img) {
      fs.unlink("./public/products/"+img, ()=>console.log("file_deleted"))
    }  */
    delete_an_image(props)
  }else if(action=='delete_brand_image'){       
    res=delete_an_image(props)
  }else if(action=='delete_site_image'){       
    res=delete_an_image(props)
  }else if(action=='delete_user_image'){       
    res=delete_an_image(props)
  }


  if(product.data && product.data[0]) {
    data=product.data[0]
  }else if(product.data) {
    data=product.data
  }else if(res) {
    data=res
  }
  //console.log("data", data)
  return data
}


export {
  insert_image,
  delete_image
}