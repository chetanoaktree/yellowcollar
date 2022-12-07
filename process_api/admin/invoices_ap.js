import { supabase } from '../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import shortid from 'shortid'
import _ from 'lodash'

import {range, get_switch, extract_com, extract_influencer, extract_business, extract_product} from '../get/query'
import {getImagesFromParent} from '../get/image'

import {
  get_invoice
} from '../_model/m_invoice'

//import { typeImages, get_image} from '../get/image'

const map_get = (items) =>{
  items=_.map(items, (v, k)=>{
    let details=v.details[0] ? v.details[0] : {} 
    delete details.id  
    v={...v, ...details}   
    delete v.details
    return v
  })
  return items
}
const get_query = (props) => {
  let {action, business_name, inData} = props
  let switch_=get_switch(props) 
  let query = supabase
  .from('invoice')
  .select(`
    *,
    items:invoice_item(
      *,
      product:product_id!inner(title, image_id)
    ),
    details:invoice_details(*),
    influencer:influencer_id!inner(name, image_id, email),
    business:business_id!inner(name, company_name, image_id, email)   
  `, { count: 'exact' })
  
  if(switch_) {
    if(switch_=='used'){
      query=query.gt('usage', 0)
    }else if(switch_=='unused'){
      query=query.eq('usage', 0)
    }else{
      query=query.eq('type', switch_)
    }    
  }
  query=extract_business({query, parent:'invoice', props})
  query=extract_influencer({query, parent:'invoice', props})
  //if(business_name!='') query=query.ilike('business.business.name', `%${business_name}%`) 

  query=query.order('created_at', { ascending: false })
  return query
}
export default async function  process(props) { 
  let {action, id, type, start, end, inData}=props 
  let data={}  
  let query
  let res

  console.log("Invoices props", props) 
  
  if(action=='get'){ 
     query=get_query(props)
     if( start && end ) query = range(query, props)
     res=await query 
     data=res.data ? res.data : []
     data=map_get(data)
     data = await getImagesFromParent(data, 'product', 'items')
     
  }else if(action=='get_total'){ 
     query=get_query(props)
     res=await query  
     data=res.count ? res.count : 0

  }else if(action=='download_item'){ 
    let {code, _limit, type, usage, unit, value, status} = inData  
    //type=(type && type.value ) ?  type.value : type
    //unit=(unit && unit.value ) ?  unit.value : unit
    //status=(status && status.value ) ?  status.value : status
    /*let res = await supabase
    .from('coupon')
    .update([{code, _limit, type, usage, unit, value, status}])
    .eq('id',id)    
    data=res.data ? res.data[0] : {} */ 
  }
 
  console.log("Invoices "+action, data)
  return data
}
