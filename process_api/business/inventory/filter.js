import { supabase } from '../../../util/supabaseClient'

import {productImages} from '../../get/image'
import { getDiscountedPrice } from '../../get/order'
import { update_product_units } from '../../get/inventory'
import _ from 'lodash'

export default async function  process({business_id, product_id, product_status, product_name}) {  
  console.log("business_id", business_id)
  console.log("product_id", product_id)
  console.log("product_name", product_name)
  console.log("product_status", product_status)

  let inventory_query = supabase
  .from('product')
  .select(`
  *,
  stats:product_stats(*)
  `)
  .eq('business_id', business_id)
  .filter("parent_id","is", null)
  //.neq('status', 'rejected')
  .order('created_at', { ascending: true })

  
  if (product_status && product_status.value)  { inventory_query = inventory_query.ilike('status', `%${product_status.value}%`) }
  if (product_name)  { inventory_query = inventory_query.ilike('title', `%${product_name}%`) }  
  if (product_id)  { inventory_query = inventory_query.eq('id', product_id) }  

  let inventory = await inventory_query

  console.log("inventory", inventory)
  
  //let data2=collabs.data
 // let data2=collabs2
  let data2=inventory.data
  if(data2){
    _.forEach(data2, (v, k)=>{      
      v.final_price=getDiscountedPrice(v.price, v.discount)  
      data2[k]=v
    }) 
  }


  data2 =await productImages(data2)
  
  return data2
}
