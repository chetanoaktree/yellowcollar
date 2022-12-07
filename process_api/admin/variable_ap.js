import { supabase } from '../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import shortid from 'shortid'
import {range, get_switch, extract_com, extract_influencer, extract_business, extract_product} from '../get/query'

import _ from 'lodash'

import {
  get_influencer, 
  update_meta_influencer,
  update_treshold_influencer
} from '../_model/m_influencer'

import {
  get_collab, 
  update_meta_collab,
  update_performance_collab
} from '../_model/m_collab'

import {
  get_treshold_from_ids
} from '../_model/m_treshold'

import {
  get_performance_from_ids
} from '../_model/m_performance'


import {
  get_option, 
  update_option
} from '../_model/m_option'

import {
  get_variable,
  get_variable_from_item
} from '../get/g_variable_p'


import {
  get_merged_ids
} from '../get/data'

const get_variable_from_item2 = (v, goal_types) => {  
  let _d=false
  let {influencer={}, performance={}, meta}=v
  let fixed_fees =  {}
  if(influencer && influencer.meta ){
    let {fixed_fee_story=0, fixed_fee_reel=0, fixed_fee_video=0, fixed_fee_post=0 }=influencer.meta
    fixed_fees={fixed_fee_story, fixed_fee_reel, fixed_fee_video, fixed_fee_post }
  }
  let post_type = (meta && meta.post_type) ? meta.post_type : 'post'
  let goal = (meta && meta.goal) ? meta.goal : 'sales'
  _d = get_variable({treshold:influencer.treshold, performance, goal_types:goal_types.value, fixed_fees, post_type, goal})  
  
  if(_d.base_amount){
    v.click_through=_d.click_through
    v.engagement=_d.engagement
    v.impressions=_d.impressions
    v.capped=_d.capped   
    v.base_amount=_d.base_amount   
    v.variable=_d.variable
    v.total=_d.total
  }
    console.log("ITEM influencer", v)
    console.log("ITEM influencer _d", _d)
  return v
}
const get_variable_from_items = async (items) => {
  let goal_types = await get_option({key:'variable'})
  _.forEach(items, (v, k)=>{  
    v=get_variable_from_item(v, goal_types)    
  }) 
  //console.log("ITEMS", items)
  return items
}
const get_influencers = (props) => {
  let {action, business_id, start, end, influencer_name} = props
  let switch_=get_switch(props) 
  let query = supabase
  .from('influencer2')
  .select(`
    *,
    treshold:treshold_id(*)
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
  query=extract_influencer({query, parent:'influencer', props})
  //if(influencer_name) query=query.ilike('name', `%${influencer_name}%`)  

  query=query.order('created_at', { ascending: false })
  return query
}
const get_collabs = (props) => {
  let {action, business_id, start, end, influencer_name} = props  
  let switch_=get_switch(props) 
  let query = supabase
  .from('collab')
  .select(`
    *,
    product:product_id!inner(*), 
    business:business_id!inner(*), 
    influencer:influencer_id!inner(*, treshold:treshold_id(*)),
    performance:performance_id(*)
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

  query=extract_influencer({query, parent:'collab', props})
  query=extract_business({query, parent:'collab', props})
  query=extract_product({query, parent:'collab', props})

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
    if(type=="influencers"){
      query=get_influencers(props)
      if( start && end ) query = range(query, props)  
      res=await query
      data=res.data ? res.data : []
    }else if(type=="collabs"){
      query=get_collabs(props)
      if( start && end ) query = range(query, props)  
      res=await query
      data=res.data ? res.data : []
      //data = await get_collab_tresholds(data)
      //data = await get_collab_performances(data)
      data = await get_variable_from_items(data)
    }
  }else if(action=='get_total'){ 
    if(type=="influencers"){
      query=get_influencers(props)
      //if( start && end ) query = range(query, props)  
      res=await query
      data=res.count ? res.count : 0
    }else if(type=="collabs"){
      query=get_collabs(props)
      //if( start && end ) query = range(query, props)  
      res=await query
      data=res.count ? res.count : 0
    } 
  }else if(action=='update_influencer'){ 
    let {id, treshold_id, treshold, meta} = inData
    let treshold_ = await update_treshold_influencer({treshold_id, treshold})    
    if(id && meta ){
      let {instagram_url=''} = meta ? meta : {}
      let inf = await get_influencer({id, select:`meta`})  
      console.log("meta", meta)    
      if(inf.id && instagram_url!=''){
        inf.meta={...inf.meta, instagram_url}  
        console.log("inf.meta", inf.meta)          
        await update_meta_influencer({id, meta:inf.meta})        
      }
    }
    data = get_influencer({id, select:` *, treshold:treshold_id(*) `})
  }else if(action=='update_collab'){ 
    let {id, performance_id, performance, meta} = inData
    let performance_ = await update_performance_collab({performance_id, performance})   
    data = await get_collab({id, select:` *, product:product_id(*), business:business_id(*),  influencer:influencer_id(*, treshold:treshold_id(*)), performance:performance_id(*) `})
    let goal_types = await get_option({key:'variable'})    
    data = get_variable_from_item(data, goal_types)
    //console.log("get_collab", data)

  }else if(action=='get_goal'){ 
    console.log("Goal Get", inData)   
    data=await get_option({key:'variable'})   

  }else if(action=='update_goal'){ 
    console.log("Goal Update", inData)
    let {variable_cap, goal_awareness, goal_sales, goal_both} = inData
    data=await update_option({key:'variable', value:{variable_cap, goal_awareness, goal_sales, goal_both}})  

  }

  //console.log("Variable "+action, data)
  return data
}
