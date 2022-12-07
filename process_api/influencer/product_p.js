import product1 from '../../data/products/product1'
import product2 from '../../data/products/product2'
import product3 from '../../data/products/product3'
import product4 from '../../data/products/product4'
import product5 from '../../data/products/product5'
import desc1 from '../../data/products/desc1'

import { supabase } from '../../util/supabaseClient'

import getBusiness from '../get/business'
import getPurchased from '../get/purchased'
import getCollaborated from '../get/collaborated'
import { getDiscountedPrice } from '../get/order'
import { get_image, productImages } from '../get/image'
import { map_stats } from '../get/product'



import {  influencerProductData,  influencerProductStats} from '../get/influencer_product_stats'
import _ from 'lodash'

export default async function  process({id, influencer_id}) { 
  /*const products=[
    product1,
    product2,
    product3,
    product4,
    product5,
  ]
  let data=products[id-1]
  data.description=desc1*/

  /*let { data, error } = await supabase
  .from('product')
  .select()*/

  let product = await supabase
  .from('product')
  .select(`
  *,
  stats:product_stats(available_units),
  business:business_id(*)`)
  .eq('id', id)
  .eq('status', 'published')
  //.neq('business.from', 'dev')
  let data=product.data[0]
  if(!data) return false
  if(data.stats) data.stats=data.stats[0]
  let extra = await supabase
  .from('product__extra')
  .select(`*`)
  .eq('product_id', id)

  let variations = await supabase
  .from('product')
  .select(`
    *,
    stats:product_stats(available_units),
    attributes:product_attribute(*)
  `)
  .eq('parent_id', id)

  let popular = await supabase
  .from('product_stats')
  .select(`
    *,
    product(
      *,
      business:business_id(*)
    )
  `) 
  .eq('business_id', data.business_id)
  .order("views", {ascending:false})      
  .limit(6) 
  
  let influencer_product_data= await influencerProductData(influencer_id, id);
  console.log("influencer_product_data", influencer_product_data)
  data=influencerProductStats({item:data, influencer_product_data}) 
  
  if(popular.data){
    _.forEach(popular.data, (v, k)=>{      
      //treshold_ids.push(v.influencer_id)
      v.product.final_price=getDiscountedPrice(v.product.price, v.product.discount)  
      popular.data[k]=v
    }) 
  }
  /*
  popular.data=_.map(popular.data, (v, k)=>{

  }) */ 

  /*data=await getBusiness(data)
  data=await getPurchased(data, influencer_id)
  data=await getCollaborated(data, influencer_id)*/
  data.final_price=getDiscountedPrice(data.price, data.discount)   
  data.description=data.description ? data.description : desc1
  data.extra=extra.data ? extra.data[0] : {}
  data.variations=variations.data ? variations.data : []
  data.variations=map_stats(data.variations)  
  data.popular=popular.data ? popular.data : []
  data.popular=await productImages(data.popular)
  data.image=await get_image(data)   
  return data
}
