import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import influencerProductStats from '../get/influencer_product_stats'
import { getDiscountedPrice } from '../get/order'
import { productImages, typeImages } from '../get/image'


import {range, get_switch, extract_com, extract_influencer, extract_business, extract_product} from '../get/query'

import _ from 'lodash'

const get_query = (props) => {
  

  let {action, business_id, query='', categories, start, end, influencer_name, API} = props
  let switch_=get_switch(props) 
  let select=`
    *,
    business:business_id!inner(name, image_id, company_name)
  `
  if(categories && categories.name){
     select=`
      *,
      business:business_id!inner(name, image_id, company_name),
      category:product_cat!inner(*, cat:category!inner(*))
    `
  }
  let product_name=query
  query = supabase
  .from('product')
  .select(select, { count: 'exact' })
  .filter("parent_id","is", null)
  
  if(switch_) {
    if(switch_=='used'){
      //query=query.gt('usage', 0)
    }else if(switch_=='unused'){
      //query=query.eq('usage', 0)
    }else{
      query=query.eq('category.cat.slug', switch_)
    }    
  }  
  if(categories && categories.name){
    query=query.eq('category.cat.slug', categories.name)
  }
  query=query.eq('status', 'published')
  //if(API=='https://www.yellowcollar.club' || API=='https://localhost:3000'){
  if(API=='https://www.yellowcollar.club'){
     query=query.neq('business.from', 'dev')
  }else{
     query=query.eq('business.from', 'dev')
  }
  if(product_name!='') query=query.ilike('title',  `%${product_name}%`)
  //query=extract_product({query, parent:'product', props})
  //query=extract_influencer({query, parent:'influencer', props})
  //if(influencer_name) query=query.ilike('name', `%${influencer_name}%`)  

  query=query.order('created_at', { ascending: false })
  return query
}

const get_product_supporting = async (data) => {
   data=await productImages(data) 
   data.map((p, key)=>{
      p.final_price=getDiscountedPrice(p.price, p.discount)    
      return p   
   }) 
   return data  
}
export default async function  process(props) { 

  let {action, influencer_id, id, type, start, end, inData, API}=props 
  let data={}  
  let query
  let res

  console.log("props", props) 

  if(action=='get'){ 
    query=get_query(props)
    if( start && end ) query = range(query, props)  
    res=await query
    data=res.data ? res.data : []
    data=await get_product_supporting(data)  
    data=await influencerProductStats({influencer_id, products:data, parent:'product'}) 

  }else if(action=='get_total'){ 
    query=get_query(props)
    //if( start && end ) query = range(query, props)  
    res=await query
    data=res.count ? res.count : 0
  }else if(action=='get_extra'){ 
    query=get_query(props)
    if( start && end ) query = range(query, props)  
    res=await query
    data=res.data ? res.data : []
    data=await get_product_supporting(data) 
    data=await influencerProductStats({influencer_id, products:data, parent:'product' })

  }
  
  //console.log("Pages "+action, data)
  return data
}
