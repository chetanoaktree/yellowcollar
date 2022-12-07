
import { supabase } from '../../util/supabaseClient'

import influencerProductStats from '../get/influencer_product_stats'

import { productImages, get_image } from '../get/image'
import { getDiscountedPrice } from '../get/order'

import _ from "lodash"

export default async function  process(props) { 
  let {cat, influencer_id}=props 
  let data={}

  let categories = await supabase
  .from('category')
  .select(`*`)
  .eq('slug', cat)
  console.log("categories", categories)
  let category=categories.data[0]

  let products = await supabase
  .from('product_cat')
  .select(`
  *,
  product!inner(
    *,
    business:business_id!inner(image_id, profile_pic, name)
  )
  `)  
  .eq('product.status', 'published')
  .neq('product.business.from', 'dev')
  .eq("cat_id", category.id)

  if(products.data){
    _.forEach(products.data, (v, k)=>{      
      //treshold_ids.push(v.influencer_id)
      v.product.final_price=getDiscountedPrice(v.product.price, v.product.discount)  
      products.data[k]=v
    }) 
  }
 
  if(category.meta.banner_image) category.meta.banner_image.image=await get_image(category.meta.banner_image)
  

  let results=await influencerProductStats({influencer_id, products:products.data })
  results=await productImages(results)
 

  data={
    category:category,
    products:results
  }
  let data2={sd:12}
  console.log("data", data)
  return data
}
