import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import _ from 'lodash'

import {range, get_switch, extract_com, extract_influencer, extract_business, extract_product} from '../get/query'

const get_query =(props)=>{
  let {action, id, match, product_id, business_id, influencer_id, status, product_name, influencer_name, business_name, start, end}=props
  let switch_=get_switch(props) 
  let query = supabase
    .from('business')
    .select(`
      *,
      details:details_id(*)     
    `, { count: 'exact' })   
  
  if(switch_) {
    if(switch_=='from_dev'){
      query=query.eq('from', 'dev')
    }else if(switch_=='from_live'){
      query=query.eq('from', 'live')
    }else if(switch_=='unused'){
      //query=query.eq('usage', 0)
    }else{
      query=query.eq('status', switch_)
    }    
  }

  query=extract_business({query, parent:'business', props})
  query=query.order('created_at', { ascending: false })   
  return query
}
export default async function  process(props) { 
  let {action, id, match, product_id, business_id, influencer_id, status, product_name, influencer_name, business_name, start, end, inData}=props
  let data={}

  console.log("props", props)

  if(action=='get'){      
    let query=get_query(props)
    if( start && end ) query = range(query, props)  
    let res = await query
    data=res.data 

  }else if(action=='get_total'){    
    let query=get_query(props)
    let res = await query
    data=res.count
  }
    
  console.log("Business res "+action, data)
  return data
}
