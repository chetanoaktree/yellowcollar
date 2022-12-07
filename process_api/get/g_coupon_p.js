import { supabase } from '../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, type, start, end, inData}=props 
  let data={}  
  let res
  console.log("props", props) 
  
  if(action=='get_coupon'){ 
      let {code} =inData
      let res = await supabase
      .from('coupon')
      .select(`*`)
      .eq("code", code)    
      data=res.data ? res.data[] : {} 

  }
  console.log("Cuopon "+action, data)
  return data
}
