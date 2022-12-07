import { supabase } from '../../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'

import collab_requests_action from '../collab_requests_ap'
import collab_action from '../action'
import collaborations_action from '../collaborations_ap'

import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, meta, type, type_id, in_data={}}=props
  let { performance_id, click_through}=in_data
  let data={}  

  console.log("props", props) 
 
  if(action=='update_performance') {     
    console.log("update_performance", {action:'update_performance', ...in_data})
    data=await collab_action({action:'update_performance', ...in_data}) 
    data =data[0]  ? data[0]  : data 
    data.action_status='done' 
  }else if(action=='promotion_complete') {     
    console.log("update_performance", {action:'update_performance', ...in_data})
    data=await collab_action({action:'update_performance', ...in_data}) 
    data =data[0]  ? data[0]  : data 
    data.action_status='done' 

    await collaborations_action({action:'promotion_complete', id:type_id}) 

  }else if(action=='request_approve') { 
    console.log("approve", {action:'approve', ...in_data})
    data= await collab_requests_action({action:'approve', ...in_data})
    data.action_status='done'
  }else if(action=='request_reject')  {
    console.log("decline", {action:'decline', ...in_data})
    data= await collab_requests_action({action:'decline', ...in_data})
    data.action_status='done'
  }
  
  
  console.log("D Actions "+action, data)
  return data
}

