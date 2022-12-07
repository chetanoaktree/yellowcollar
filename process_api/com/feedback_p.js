import { supabase } from '../../util/supabaseClient'
import axios from 'axios';

import {send_order_status_change, send_feedback, send_feedback_a} from './email_admin'

export default async function  process(props) {  
  let {action, user, membership, experience, feedback} = props
  let data={}  
   
  if(action=='send_feedback'){  
    /*let user = await supabase
    .from('influencer2')
    .update([{meta:meta}]) 
    .eq("id", influencer_id)
    data2=user.data[0]
    //console.log("User", user)
    */
    let args={
      user_id:user.user_id,
      user_email:user.email,
      user_name:user.name,     
    }
    let send=await send_feedback(args)
    console.log("send", send)
    
  }else if(action=='send_feedback_a'){  
    let args_a={
      user_id:user.user_id,
      user_email:user.email,
      user_name:user.name,
      experience,
      feedback,
      membership_plan: membership.plan
    }  
    let send_a=await send_feedback_a(args_a)
    console.log("send_a", send_a)
  }
  data={status:'uploaded'}
  console.log("data "+action, data)  
  return data
}
