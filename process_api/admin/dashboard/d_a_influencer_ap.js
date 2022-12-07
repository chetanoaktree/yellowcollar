import { supabase } from '../../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'

import influencer_action from '../influencers_ap'

import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, meta, type, type_id, in_data={}}=props
  let { performance_id, click_through}=in_data
  let data={}  

  console.log("props", props) 
 
  if(action=='update') {     
    //console.log("update_performance", {action:'update_performance', ...in_data})
    //data=await collab_action({action:'update_performance', ...in_data}) 
    //data =data[0]  ? data[0]  : data 
    //data.action_status='done' 
  }else if(action=='update_fee_approve') { 
    console.log("approve", {action:'approve', ...in_data})
    data= await influencer_action({action:'update_fee_approve', influencer_id:type_id, ...in_data})
    data.action_status='done'
  }else if(action=='update_fee_reject')  {
    //console.log("decline", {action:'decline', ...in_data})
    //data= await influencer_action({action:'update_fee_decline', ...in_data})
    data.action_status='done'
  }
  
  
  console.log("D Actions "+action, data)
  return data
}

