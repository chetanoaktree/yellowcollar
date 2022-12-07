import { supabase } from '../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import _ from 'lodash'

import { get_performance } from '../_model/m_performance'
import { get_treshold } from '../_model/m_treshold'
import { get_option } from '../_model/m_option'

const process_value = (field, treshold={}, performance={}) => { 
 //console.log('field', field)
  //console.log('performance', performance)
  //console.log('treshold', treshold)
  let ret=0
  let tv = treshold[field] ? treshold[field] : 0
  let pv = performance[field] ? performance[field] : 0 
  let dv =  parseInt(pv) - parseInt(tv) 
  if(dv > 0) ret = dv
  return ret
}
const multiply_value = (value, field, goal_values) => { 
  let ret=value * parseInt(goal_values[field] )
  return ret
}
const get_goal_values = ({goal, treshold, performance, goal_types}) => { 
  let goal_values
  if(goal=='awareness'){
    goal_values=goal_types['goal_awareness']
  }else if(goal=='sales'){
    goal_values=goal_types['goal_sales']
  }else{
    goal_values=goal_types['goal_both']
  }
  return goal_values
}
const get_base_amount = ({fixed_fees, post_type}) => { 
  let amount=0
  //console.log("Fixed Fees", fixed_fees)
  if(!fixed_fees) return amount
  if(post_type=='story' && fixed_fees['fixed_fee_story']){
    amount=fixed_fees['fixed_fee_story']
  }else if(post_type=='reel' && fixed_fees['fixed_fee_reel']){
    amount=fixed_fees['fixed_fee_reel']
  }else if(post_type=='video' && fixed_fees['fixed_fee_video']){
    amount=fixed_fees['fixed_fee_video']
  }else if(post_type=='post' && fixed_fees['fixed_fee_post']){
    amount=fixed_fees['fixed_fee_post']
  }

  return parseInt(amount)
}
const get_variable = (i) => {  
  let {status, treshold, goal_types, base=0, post_type='post', goal='both'} = i 
  let {variable_cap} = goal_types
  variable_cap=parseInt(variable_cap)
  let performance = {...i.performance}
  let fixed_fees = {...i.fixed_fees}
  //let base_amount=get_base_amount({fixed_fees, post_type})
  let base_amount=base
  let capped=base_amount * (parseInt(variable_cap)/100)
  let ret={
    status:status,
    base_amount:base_amount,
    variable_cap:variable_cap,
    capped:capped,    
    variable:0,    
    total:0    
  }  
  if(status=='completed'){
    console.log("treshold completed", treshold)
    console.log("performance completed", performance)
  }
  //if(treshold && performance){
    let goal_values = get_goal_values({goal, treshold, performance, goal_types})
    let ctv = process_value('click_through', treshold, performance)
    let ev = process_value('engagement', treshold, performance)
    let iv = process_value('impressions', treshold, performance)
    if(ctv > 0 && ev > 0 && iv > 0){
      ctv=multiply_value(ctv, 'click_through', goal_values)
      ev=multiply_value(ev, 'engagement', goal_values)
      iv=multiply_value(iv, 'impressions', goal_values)
      let variable=ctv+ev+iv     
      ret.click_through=ctv
      ret.engagement=ev
      ret.impressions=iv
      ret.variable=variable    
    }  
  //}  
  ret.total =  base_amount + ret.variable  
  if(ret.total > capped) ret.total=capped
  ret.balance_amount=ret.total-base_amount
  //console.log("variable", i)
  //console.log("variable ret", ret)
  return ret
}
const getVariable = async (i) => { 
  let {treshold_id, performance_id} =i
  let treshold= await get_treshold({treshold_id})
  let performance= await get_performance({performance_id})
  let goal= await get_option({key:'variable'})
  let data = {treshold, performance, goal}
  return data
}

const get_variable_from_item = (v, goal_types) => {  
  let _d=false
  let {influencer={}, influencer2=false, performance={}, meta, status=''}=v
  if(influencer2!=false) influencer=influencer2

  let fixed_fees =  {}
  if(influencer && influencer.meta ){
    let {fixed_fee_story=0, fixed_fee_reel=0, fixed_fee_video=0, fixed_fee_post=0 }=influencer.meta
    fixed_fees={fixed_fee_story, fixed_fee_reel, fixed_fee_video, fixed_fee_post }
  }
  let base = (meta && meta.base) ? meta.base : 0
  let post_type = (meta && meta.post_type) ? meta.post_type : 'post'
  let goal = (meta && meta.goal) ? meta.goal : 'sales'
  _d = get_variable({status, treshold:influencer.treshold, performance, goal_types:goal_types.value, fixed_fees, base, post_type, goal})  
  
  if(_d.base_amount){
    v.click_through=_d.click_through
    v.engagement=_d.engagement
    v.impressions=_d.impressions
    v.variable_cap=_d.variable_cap   
    v.capped=_d.capped   
    v.base_amount=_d.base_amount   
    v.balance_amount=_d.balance_amount   
    v.variable=_d.variable    
    v.total=_d.total
  }
  if(status=='completed_request') console.log("ITEM influencer completed_request", v)
    //console.log("ITEM influencer _d", _d)
  return v
}
export{
  get_variable_from_item,
  get_variable,
  getVariable
}