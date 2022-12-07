import { supabase } from '../../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import _ from 'lodash'

import {adminCollabs, adminCollabRequests, adminProducts, adminInfluencers} from './d_a_c_get_ap'
import action_collab from './d_a_collab_ap'
import action_product from './d_a_product_ap'
import action_onboarding from './d_a_onboarding_ap'
import action_influencer from './d_a_influencer_ap'

import {range, get_switch, extract_com, extract_influencer, extract_business, extract_product} from '../../get/query'

//import { typeImages, get_image} from '../get/image'

const get = (props) => {
  let {action, business_id, start, end, influencer_name} = props  
  let switch_=get_switch(props) 
  let query = supabase
  .from('admin_action')
  .select(`
    *`, { count: 'exact' })
  
  if(switch_) {
    if(switch_=='used'){
      //query=query.gt('usage', 0)
    }else if(switch_=='unused'){
      //query=query.eq('usage', 0)
    }else{
      query=query.eq('status', switch_)
    }    
  }

  query=extract_influencer({query, parent:'collab', props})
  query=extract_business({query, parent:'collab', props})
  query=extract_product({query, parent:'collab', props})

  query=query.order('created_at', { ascending: false })
  return query
}

export default async function  process(props) { 
  let {admin_action, action, id, type, type_id, meta, result, start, end }=props 
  let data={}  
  let query
  let res

  console.log("props", props) 
  
  if(admin_action=='get_actions'){ 

    /*let res = await supabase
    .from('admin_action')
    .select()    
    .order('created_at', { ascending: false }) 
    data=res.data*/

    query=get(props)
    console.log("query", query)
    if( start && end ) query = range(query, props)  
    res=await query
    data=res.data ? res.data : []

    data=await adminCollabRequests(data)
    data=await adminCollabs(data)
    data=await adminProducts(data)
    data=await adminInfluencers(data)

  }else if(admin_action=='get_actions_total'){ 

    query=get(props)
    if( start && end ) query = range(query, props)  
    res=await query
    data=res.count ? res.count : 0        

  }else if(admin_action == 'add_action'){
    let del_req = await supabase
    .from('admin_action')
    .delete() 
    .eq('action', action)  
    .eq('type', type)  
    .eq('type_id', type_id)

    let req = await supabase
    .from('admin_action')
    .insert([
      {action, type, type_id, meta},
    ])   
  }else if(admin_action == 'get_action'){
    let sel_req = await supabase
    .from('admin_action')
    .select() 
    .eq('action', action)  
    .eq('type', type)  
    .eq('type_id', type_id)
    .order('created_at', { ascending: false }) 
    data=sel_req.data ? sel_req.data[0] : {}
    
  }else if(type=='collab'){ 
    data=await action_collab(props)  

  }else if(type=='product'){ 
    data=await action_product(props)  

  }else if(type=='onboarding'){ 
    data=await action_onboarding(props)  

  }else if(type=='influencer'){ 
    data=await action_influencer(props)  

  }

  if(data && data.action_status=="done"){
    let res = await supabase
    .from('admin_action')
    .update([{status:data.action_status, result}])
    .eq('id', id)
    data['admin_action']=res.data[0] ? res.data[0] : {}
  }

  //console.log("Dashboard "+action, data)
  return data
}
