import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import _ from 'lodash'

import {range, get_switch, extract_com, extract_influencer, extract_business, extract_product} from '../get/query'


import {get_product_prices, productImages} from '../get/product'
import {get_ids} from '../get/util'

import {
  get_product, 
  update_product, 
  update_meta_product,
  update_campaign_product
} from '../_model/m_product'

const get_variations = (items) => {
 let ids=get_ids({items, id_key:'id'})
 return ids
}

const get_details = (props) => {
  let {action, business_id, start, end, status=''} = props
  let switch_=get_switch(props) 
  let query = supabase
  .from('product')
  .select(`
    *,
    business:business_id!inner(name, company_name, image_id)
  `, { count: 'exact' })
  
  if(switch_) {
    if(switch_=='used'){
      //query=query.gt('usage', 0)
    }else if(switch_=='from_dev'){
      query=query.eq('business.from', 'dev')
    }else if(switch_=='from_live'){
      query=query.neq('business.from', 'dev')
    }else{
      query=query.eq('status', switch_)
    }    
  }
  if(status && status.name) query=query.eq('status', status.name)
  query=extract_business({query, parent:'product', props})
  //if(influencer_name) query=query.ilike('name', `%${influencer_name}%`)  

  query=query.filter("parent_id","is", null)
  query=query.order('created_at', { ascending: false })
  return query
}


export default async function  process(props) { 
  let {action, id, type, start, end, inData}=props 
  let data={}  
  let query
  let res

  console.log("props", props)

  if(action=='get'){ 
    if(type=="details"){
      query=get_details(props)
      if( start && end ) query = range(query, props)  
      res=await query
      data=res.data ? res.data : []
      data=await productImages(data)
      data=get_product_prices(data)
      data[0].variations=get_variations(data)
    }else if(type=="campaigns"){
      query=get_campaigns(props)
      if( start && end ) query = range(query, props)  
      res=await query
      data=res.data ? res.data : [] 
    }

  }else if(action=='get_total'){ 
    if(type=="details"){
      query=get_details(props)
      res=await query
      data=res.count ? res.count : 0
    }else if(type=="campaigns"){
      query=get_campaigns(props)
      res=await query
      data=res.count ? res.count : 0
    } 


  }else if(action=='update_item_details'){  
    let {status} = inData
    let data = await update_product({id, update:{status}})   

  }else if(action=='update_approve'){  

    let res = await supabase
    .from('product')
    .update([{status:'published'}]) 
    .eq("id", id)   
    data=res.data[0]  

  }else if(action=='update_reject'){  
    let res = await supabase
    .from('product')
    .update([{status:'rejected'}]) 
    .eq("id", id)   
    data=res.data[0]  

  }
  
  console.log("Products Requests "+action, data)
  return data
}
