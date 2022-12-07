import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import _ from 'lodash'

import {range, get_switch, extract_com, extract_influencer, extract_business, extract_product} from '../get/query'


import {getImagesFromParent} from '../get/image'



import {
  generate_invoice
} from '../_model/m_order2invoice'

import {
  get_product, 
  update_product, 
  update_meta_product,
  update_campaign_product
} from '../_model/m_product'


const get_orders = (props) => {
  let {action, business_id, start, end, status=''} = props
  let switch_=get_switch(props) 
  let query = supabase
  .from('order')
  .select(`
    *,
    influencer:influencer_id!inner(*),
    details:order_details!inner(*),
    items:order_item!inner(*, product:product_id!inner(title, image_id, business:business_id!inner(name))),
    invoices:invoice(*)
  `, { count: 'exact' })
  
  if(switch_) {
    if(switch_=='used'){
      //query=query.gt('usage', 0)
    }else if(switch_=='from_dev'){
      query=query.eq('business.from', 'dev')
    }else if(switch_=='from_live'){
      query=query.neq('business.from', 'dev')
    }else{
      query=query.eq('items.status', switch_)
    }    
  }
  if(status && status.name) query=query.eq('status', status.name)
  query=extract_business({query, parent:'product', props})
  //if(influencer_name) query=query.ilike('name', `%${influencer_name}%`)  

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
    if(type=="orders"){
      query=get_orders(props)
      if( start && end ) query = range(query, props)  
      res=await query
      data=res.data ? res.data : []
      data=await getImagesFromParent(data, 'product', 'items')
      //data=get_product_prices(data)
    }else if(type=="campaigns"){
      query=get_campaigns(props)
      if( start && end ) query = range(query, props)  
      res=await query
      data=res.data ? res.data : [] 
    }

  }else if(action=='get_total'){ 
    if(type=="orders"){
      query=get_orders(props)
      res=await query
      data=res.count ? res.count : 0
    }else if(type=="campaigns"){
      query=get_campaigns(props)
      res=await query
      data=res.count ? res.count : 0
    } 


  }else if(action=='update_item_orders'){  
    let {status} = inData
    //let data = await update_product({id, update:{status}})   

  }else if(action=='generate_invoice'){      
    data=await generate_invoice({order:inData})    
  }

  console.log("Orders "+action, data)
  return data
}
