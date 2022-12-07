import { supabase } from '../../../util/supabaseClient'
//import getInfluencer from '../get/influencer'
//import getBusiness from '../get/business'

//import {get_image, typeImages} from '../../get/image'
//import { getDiscountedPrice } from '../../get/order'
//import { map_stats } from '../../get/product'
import { get_product_defined } from '../../get/product_defined'
import _ from 'lodash'



export default async function  process(props) { 
  let { id, business_id} =props
  let data=await get_product_defined({id, business_id})
   
   console.log("single props", props) 
  console.log("DATAT", data)

  return data
}
