import { supabase } from '../../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'

import user_action from '../../user/action'
import onboarding_action from '../../onboarding_p'
import {onboarding} from '../../com/email_admin'

import _ from 'lodash'

const send_onboarding_email = async(i)=>{
  let {fullname, userType, email, user_id, status}=i
  let args={
    user_id:user_id,
    user_email:email,
    user_name:fullname,
    user_type: userType,
    status: status,   
  }
  let send=await onboarding(args)
}

export default async function  process(props) { 
  let {action, id, meta, type, type_id, in_data={}}=props
  //let { performance_id, click_through}=in_data
  let data={}  

  console.log("props", props) 
  //need to change for product - start
  if(action=='request_approve') { 
    //console.log("approve", {action:'request_approve', ...in_data})
    data= await user_action({action:'create_role', ...in_data})
    await onboarding_action({action:'approved', in_data, id:type_id})
    //await send_onboarding_email({...in_data, status:'approved'})
    data.action_status='done'

  }else if(action=='email_approve') {     
    await send_onboarding_email({...in_data, status:'approved'})    

  }else if(action=='request_reject')  {
    //console.log("reject", {action:'request_reject', ...in_data})
    await onboarding_action({action:'rejected', in_data, id:type_id})   
    //await send_onboarding_email({...in_data, status:'rejected'})
    data.action_status='done'

  }else if(action=='email_reject') {     
    await send_onboarding_email({...in_data, status:'rejected'})    

  }
  //need to change for product - start
  
  
  console.log("D Actions "+action, data)
  return data
}

