import { supabase } from '../../../util/supabaseClient'

import {insert_image, delete_image} from '../../get/image'

const update_product_image = async ({product_id, image_id}) => {
  let product = await supabase
  .from('product')
  .update([
    {image_id},
  ])      
  .eq('id', product_id) 
  console.log("IK product", product)
  return product.data ? product.data[0]  : {}
}

export default async function  process(props) {
  let {action, type, product_id, business_id, image_id, change_image_id, ik_file}=props 

  let data={} 
  console.log("IK props", props)
  data={...props}
  if(action=='upload_IK_image'){
    let image=await insert_image({ik_file, source:'imagekit'}) 
    data.image=image
    if(type=="product") {
      data.product=await update_product_image({product_id, image_id:image.image_id})
    }
    if(change_image_id){
      let image=await delete_image({image_id:change_image_id}) 
    }
  }else if(action=='delete_IK_image'){
    let image=await delete_image({image_id}) 
    data.image=image
    if(type=="product") {
      data.product=await update_product_image({product_id, image_id:''})
    }
  }
  console.log("IK data "+action, data)
  return data
}
