import { supabase } from '../../util/supabaseClient'
import { getDiscountedPrice } from '../get/order'
import { get_image, productImages, businessImages } from '../get/image'
import { earningsStats } from '../get/influencer_stats'
//import { get_all } from '../get/util'

import _ from 'lodash'

const getSalesStats = async ({influencer_id}) => {
  let ret={amount:0}
  let res = await supabase
  .from('collab_payment')
  .select(`
    *,     
    collab:collab_id!inner(influencer_id)
  `)
  .eq('collab.influencer_id', influencer_id) 
 // console.log("items", res)
  let ea= res.data ?  res.data : [] 
  let ea_=0 
  _.forEach(ea, (v, k)=>{
    let value= (v.meta && v.meta.sub_total) ? v.meta.sub_total : 0
    ea_+=parseInt(value)
  })
  ret.amount=ea_
  return ret
}
const getCollabsStats = async ({influencer_id}) => {
  let ret={total_items:0}
  let res = await supabase
  .from('collab')
  .select(`
    *
  `)
  .eq('influencer_id', influencer_id) 
  //console.log("items", res)
  let ea= res.data ?  res.data : []  
  ret.total_items=ea.length
  return ret
}
const getOrdersStats = async ({influencer_id}) => {
  let ret={total_items:0}
  let res = await supabase
  .from('order_item_join')
  .select(`
    *
  `)
  .eq('influencer_id', influencer_id) 
  //console.log("items", res)
  let ea= res.data ?  res.data : []  
  ret.total_items=ea.length
  return ret
}
const getLiveStats = async ({influencer_id}) => {
  let ret={earnings:{amount:0}, collabs:{total_items:0}, sales:{total_items:0}}  
  ret.earnings=await getSalesStats({influencer_id})
  ret.collabs=await getCollabsStats({influencer_id})
  ret.orders=await getOrdersStats({influencer_id})
  return ret
}

export default async function  process(props) { 
  let {action, id, influencer_id} = props
  console.log("props", props)
  let data={}, list=false
  
  if(action=="get_stats"){
    //let s= await earningsStats({influencer_id, amount:23}) 
    //console.log("influencer_Stats", s)
    let res = await supabase
    .from('influencer_stats')
    .select(`*`)
    .eq('influencer_id', influencer_id) 
    data = res.data ?  res.data[0] : {} 
    data = (data && data.meta) ?  data.meta : {} 

    
  }else if(action=="get_live_stats"){
    data=await getLiveStats(props)
    
  }else if(action=="get_collabs"){
    let res = await supabase
    .from('collab')
    .select(`
      *,      
      business:business_id(name, image_id),
      product:product_id(title, image_id)
    `)
    .eq('influencer_id', influencer_id) 
    .limit(6) 
    data = res.data ?  res.data : []   
    list=true
  }else if(action=="get_orders"){
    let res = await supabase
    .from('order_item_join')
    .select(`
      *,     
      item:item_id(*),
      order:order_id(*),
      business:business_id(name, image_id),
      product:product_id(title, image_id)
    `)
    .eq('influencer_id', influencer_id) 
    .order('order_id', { ascending: false })
    .limit(6) 
    data = res.data ?  res.data : []   
    list=true
  }   


  if(data && list){
    data = await productImages(data) 
    data = await businessImages(data)
  }  
  return data
}
