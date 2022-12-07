import { supabase } from '../util/supabaseClient'

import inf_sub_action from './influencer/subscriptions_p'
import bus_sub_action from './business/subscriptions_p'

import {get_meta} from './get/g_subscription_p'
import _ from 'lodash'

const get_sub_meta = (subscrioptions, user_type) => {
  let sub=[] 
  _.forEach(subscrioptions, (i, index)=>{
    i.meta2=get_meta({...i, user_type})
    sub.push(i)
  })  
  return sub
}

export default async function  process(props) {  
  let {action, user_type, name}=props
  let data={} 
  console.log("props", props)

  if(action=='get'){ 
    if(user_type=='influencer'){
      data.subscriptions=await inf_sub_action({action:'get'})
    }else if(user_type=='business'){
      data.subscriptions=await bus_sub_action({action:'get'})
    }   
    if(data.subscriptions) data.subscriptions2=await get_sub_meta(data.subscriptions, user_type)
  } 
  console.log("data", data)  
  return data
}
