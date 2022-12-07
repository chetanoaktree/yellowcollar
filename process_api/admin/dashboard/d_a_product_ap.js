import { supabase } from '../../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'

import products_action from '../products_ap'

import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, meta, type, type_id, in_data={}}=props
  let { performance_id, click_through}=in_data
  let data={}  

  console.log("props", props) 
  //need to change for product - start
  if(action=='update_approve') { 
    console.log("approve", {action:'update_approve', ...in_data})
    data= await products_action({action:'update_approve', ...in_data})
    data.action_status='done'
  }else if(action=='update_reject')  {
    console.log("reject", {action:'update_reject', ...in_data})
    data= await products_action({action:'update_reject', ...in_data})
    data.action_status='done'
  }
  //need to change for product - start
  
  
  console.log("D Actions "+action, data)
  return data
}

