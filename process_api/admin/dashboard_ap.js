import { supabase } from '../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import _ from 'lodash'

//import { typeImages, get_image} from '../get/image'

export default async function  process(props) { 
  let {action, id, type}=props 
  let data={}  

  console.log("props", props) 
  
  if(action=='get_actions'){ 
    /*let res = await supabase
    .from('admin_action')
    .select()    
    .order('created_at', { ascending: false }) */ 

  }
  console.log("Dashboard "+action, data)
  return data
}
