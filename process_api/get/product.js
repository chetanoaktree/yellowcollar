import { supabase } from '../../util/supabaseClient'

import { get_image, productImages } from './image'
import { getDiscountedPrice } from './order'
import _ from 'lodash'

export default async function process(data) { 
  let product = await supabase
  .from('product')
  .select()
  .eq("id", data.product_id)
  data.product=product.data ? product.data[0] : {title:'', img:''}
  //console.log(business)
  return data
}

const get_product_image = ({img, image_id, image}) =>{
  let src=''
  if(image_id!=''){
    let image=get_image({img, image_id, image})    
  }else{
    src=img
  }
  return src
}

const get_product_prices = (items) =>{
  if(items){
    _.forEach(items, (v, k)=>{      
      v.final_price=getDiscountedPrice(v.price, v.discount) 
      v.discount_amount=v.price-v.final_price
    }) 
  }
  return items
}


const map_stats = (i) => {
  if(i[0]){
    _.forEach(i, (v, k)=>{      
      v.stats=v.stats[0]  
    }) 
  }else{
    if(i.stats){
      i.stats=i.stats[0]    
    }
  }  
  return i
}

export {
  map_stats,
  get_image,
  get_product_image,
  get_product_prices,
  productImages,
}
