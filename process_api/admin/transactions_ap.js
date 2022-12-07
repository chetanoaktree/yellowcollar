import { supabase } from '../../util/supabaseClient'
import {match_score} from '../get/match'
import NotificationAction from '../com/notification/action'
import { businessImages} from '../get/image'
import _ from 'lodash'

import {range, get_switch, extract_com, extract_influencer, extract_business, extract_product} from '../get/query'

const get_collabs = (props) => {
  let {action, start, end} = props
  let switch_=get_switch(props) 
  let query = supabase
  .from('collab_payment')
  .select(`
    *,
    collab:collab_id(
      *,
      influencer:influencer_id!inner(name),
      business:business_id!inner(company_name, name),
      product:product_id!inner(title)
    )
  `, { count: 'exact' })
  
  if(switch_) {
    if(switch_=='used'){
      //query=query.gt('usage', 0)
    }else if(switch_=='unused'){
      //query=query.eq('usage', 0)
    }else{
      query=query.eq('status', switch_)
    }    
  }
  //query=extract_influencer({query, parent:'influencer', props})
  //if(influencer_name) query=query.ilike('name', `%${influencer_name}%`)  

  query=query.order('created_at', { ascending: false })
  return query
}
const get_orders = (props) => {
  let {action, start, end} = props
  let switch_=get_switch(props) 
  let query = supabase  
  .from('order_payment')
  .select(`
    *,
    order:order_id(
      *,        
      influencer:influencer_id!inner(name)
    )
  `, { count: 'exact' })
  
  if(switch_) {
    if(switch_=='used'){
      //query=query.gt('usage', 0)
    }else if(switch_=='unused'){
      //query=query.eq('usage', 0)
    }else{
      query=query.eq('status', switch_)
    }    
  }
  //query=extract_influencer({query, parent:'influencer', props})
  //if(influencer_name) query=query.ilike('name', `%${influencer_name}%`)  

  query=query.order('created_at', { ascending: false })
  return query
}
const get_memberships = (props) => {
  let {action, start, end} = props
  let switch_=get_switch(props) 
  let query = supabase  
  .from('membership_payment')
  .select(`
    *,
    influencer:influencer_id(name),
    business:business_id(company_name, name)
  `, { count: 'exact' })
  
  if(switch_) {
    if(switch_=='used'){
      //query=query.gt('usage', 0)
    }else if(switch_=='unused'){
      //query=query.eq('usage', 0)
    }else{
      query=query.eq('status', switch_)
    }    
  }
  //query=extract_influencer({query, parent:'influencer', props})
  //if(influencer_name) query=query.ilike('name', `%${influencer_name}%`)  

  query=query.order('created_at', { ascending: false })
  return query
}

export default async function  process(props) { 
  let {action, type,  id, start, end}=props
  let data={}
  let query 
  console.log("props", props)

  if(action=='get'){   
    if(type=="collabs"){
      query = get_collabs(props)
      
    }else if(type=="orders"){
      query = get_orders(props)

    }else if(type=="memberships"){
      query = get_memberships(props)
    } 
    if(query){
      if(start && end ) query = range(query, props) 
      let get = await query
      data=get.data ? get.data : {}  
    }

  }else if(action=='get_total'){ 
    if(type=="collabs"){
      query = get_collabs(props)
      
    }else if(type=="orders"){
      query = get_orders(props)

    }else if(type=="memberships"){
      query = get_memberships(props)
    } 
    if(query){
      let res=await query
      data=res.count ? res.count : 0   
    }else{
      data=0
    }

  }
  
  console.log("Transactions "+action, data)
  return data
}
