import { supabase } from '../../util/supabaseClient'

import { get_image, productImages, typeImages } from './image'
import { getDiscountedPrice } from './order'
import { map_stats } from './product'

import _ from 'lodash'

const get_product_defined = async ({id, business_id}) => {
  let data={}
  let product = await supabase
  .from('product')
  .select(`
    *,
    stats:product_stats(*)
  `)
  .eq('id', id)
  .eq('business_id', business_id)

  if(product.data && !product.data[0]){
    return data
  }

  let campaign = await supabase
  .from('product__campaign')
  .select()
  .eq('product_id', id)

  let extra = await supabase
  .from('product__extra')
  .select()
  .eq('product_id', id)

  let variations = await supabase
  .from('product')
  .select(`
    *,
    stats:product_stats(*),
    attributes:product_attribute(*)
  `)
  .eq('parent_id', id)  

 

  if(product.data){
    data.product=product.data[0]

    if(variations.data){
      data.product.variations=variations.data  
      data.product.variations=map_stats( data.product.variations)    
    }  
    if(data.product.stats){
      data.product=map_stats(data.product)      
    }  
    if(data.product.image_id){
      data.product.image=await get_image({image_id:data.product.image_id})
    }
    data.product.final_price=getDiscountedPrice(data.product.price, data.product.discount)   
    
  }
  if(campaign.data && campaign.data[0]){
    data.campaign=campaign.data[0].meta 
  }  
  if(extra.data && extra.data[0] ){
    data.extra=extra.data[0] 
    if(data.extra.influencers) data.extra.influencers=await typeImages(data.extra.influencers)
  } 
  return data  
}

export {
  get_product_defined
}
