import { supabase } from '../../util/supabaseClient'
import { getDiscountedPrice } from '../get/order'
import { get_image, productImages, businessImages, influencerImages } from '../get/image'
import { earningsStats } from '../get/business_stats'
//import { get_all } from '../get/util'

import sub_actions from './dashboard/d_sub_actions_p'

import _ from 'lodash'

const getSalesStats = async ({business_id}) => {
  let ret={amount:0}
  let res = await supabase
  .from('order_item_join')
  .select(`
    *,     
    item:item_id(*)
  `)
  .eq('business_id', business_id) 
 // console.log("items", res)
  let ea= res.data ?  res.data : [] 
  let ea_=0 
  _.forEach(ea, (v, k)=>{
    let value= (v.item && v.item.final_price_after_discount) ? v.item.final_price_after_discount : 0
    ea_+=parseInt(value)
  })
  ret.amount=ea_
  return ret
}
const getCollabsStats = async ({business_id}) => {
  let ret={total_items:0}
  let res = await supabase
  .from('collab')
  .select(`
    *
  `)
  .eq('business_id', business_id) 
  //console.log("items", res)
  let ea= res.data ?  res.data : []  
  ret.total_items=ea.length
  return ret
}
const getRequestsStats = async ({business_id}) => {
  let ret={total_items:0}
  let res = await supabase
  .from('collab')
  .select(`
    *
  `)
  .eq('status', 'requested') 
  .eq('business_id', business_id) 
  //console.log("items", res)
  let ea= res.data ?  res.data : []  
  ret.total_items=ea.length
  return ret
}
const getOrdersStats = async ({business_id}) => {
  let ret={total_items:0}
  let res = await supabase
  .from('order_item_join')
  .select(`
    *
  `)
  .eq('business_id', business_id) 
  //console.log("items", res)
  let ea= res.data ?  res.data : []  
  ret.total_items=ea.length
  return ret
}
const getLiveStats = async ({business_id}) => {
  let ret={earnings:{amount:0}, collabs:{total_items:0}, requests:{total_items:0}, sales:{total_items:0}}  
  ret.earnings=await getSalesStats({business_id})
  ret.collabs=await getCollabsStats({business_id})
  ret.requests=await getRequestsStats({business_id})
  ret.orders=await getOrdersStats({business_id})
  return ret
}

export default async function  process(props) { 
  let {action, id, action_type='main', business_id, inData} = props
  console.log("props", props)
  let data={}, list=false
  
  if(action_type=="sub"){
    data=await sub_actions(props)
  }else if(action=="get_stats"){
    //let s= await earningsStats({business_id, amount:23}) 
    //console.log("business_Stats", s)
    let res = await supabase
    .from('business_stats')
    .select(`*`)
    .eq('business_id', business_id) 
    data = res.data ?  res.data[0] : {} 
    data = (data && data.meta) ?  data.meta : {} 
    
  }else if(action=="get_live_stats"){
    data=await getLiveStats(props)
    
  }else if(action=="get_collabs"){
    let res = await supabase
    .from('collab')
    .select(`
      *,   
      product:product_id(title, image_id),   
      influencer:influencer_id(name, image_id)
    `)
    .eq('business_id', business_id) 
    .limit(6) 
    data = res.data ?  res.data : []   
    list=true
  }else if(action=="get_requests"){
    let res = await supabase
    .from('collab')
    .select(`
      *,   
      product:product_id(title, image_id),   
      influencer:influencer_id(name, image_id)
    `)
    .eq("status", "requested")
    .eq('business_id', business_id) 
    .limit(6) 
    data = res.data ?  res.data : []   
    list=true
  }else if(action=="get_sales"){
    let res = await supabase
    .from('order_item_join')
    .select(`
      *,     
      item:item_id(*),
      order:order_id(*),
      influencer:influencer_id(name, image_id),
      product:product_id(title, image_id)
    `)
    .eq('business_id', business_id) 
    .order('order_id', { ascending: false })
    .limit(12) 
    data = res.data ?  res.data : []   
    list=true
  }   

  
  if(data && list){
    data = await productImages(data) 
    data = await influencerImages(data)
  }  
  return data
}
