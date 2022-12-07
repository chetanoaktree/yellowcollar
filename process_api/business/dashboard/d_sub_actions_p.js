import { supabase } from '../../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import _ from 'lodash'

import collab_action from '../collab/action'

export default async function  process(props) { 
  let {sub_action, inData}=props 
  let data={}  

  console.log("sub action props", props) 
  
  if(sub_action=='approve_collab_request'){ 
    data = await collab_action({action:'business_accept', ...inData})   
  }else if(sub_action=='reject_collab_request'){ 
    data = await collab_action({action:'business_reject', ...inData})   
  }   
  return data
}
