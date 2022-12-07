import { supabase } from '../util/supabaseClient'

//import {onboarding_status_a} from './com/email_admin'
import admin_actions from './admin/dashboard/d_actions_ap'

const get = async (props) =>{
  let {id}=props
  let user = await supabase
  .from('user')
  .select(`*`) 
  .eq("id", id)  
  return user.data ? user.data[0] : {}
}
const update_meta = async (props) =>{
  let {id, meta, inData}=props
  meta={...meta, ...inData}
  let res = await supabase
  .from('user')
  .update([{meta}]) 
  .eq("id", id)
  return res.data[0] ? res.data[0] : {} 
}


export default async function  process(props) {  
  let {action, id, name, inData={}}=props
  let data={} 
  let userD ={}
  console.log("props", props)

  if(id){
    userD = await get(props)
  }

  if(action=='get'){  
    data = userD

  } else if(action=='update'){  
    if(userD.id){  
      inData.status='pending' 
      data=await update_meta({...userD, inData})
      await admin_actions({admin_action:'add_action', type:"onboarding", type_id:userD.id,  action:'Request', meta:inData})  
    }

  } else if(action=='approved' || action=='rejected'){     
    if(userD.id){  
      inData.status = action
      data=await update_meta({...userD, inData})
    }
  } 
  console.log("data "+action, data)  
  return data
}
