import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import {signupCodeUsers} from '../get/signup_code'
import _ from 'lodash'
import shortid from 'shortid'

const get_ids = ({generate_count}) => {
  let ids=[]  
  var service_count=0;
  let unique_id
  for(let i=0;i<generate_count;i++){
      unique_id=shortid.generate()     
      if(ids.indexOf(unique_id) === -1) {
          ids.push(unique_id);        
      }
  }
  console.log("ids", ids)
  return ids
}

export default async function  process(props) { 
  let {action, id, code, limit_, usage, user_name, user_email, user_id, generate_count=50, meta}=props
  let data={}
  
 //action="set_limit"
  console.log("props", props)

  if(action=='generate_codes'){

    let oids=[]  
    let ids = get_ids({generate_count}) 
    _.forEach(ids, function(value, key) {
      oids.push({code:value});
    }); 
    let res = await supabase
    .from('signup_code')
    .insert(oids)  
    data={...res.data, ids, oids}  

  }else if(action=='set_limit'){

    let res = await supabase
    .from('signup_code')
    .update({limit:3}) 
    .eq('limit', null)
    data={...res.data}  

  }else if(action=='update_limit'){

    let res = await supabase
    .from('signup_code')
    .update({limit_}) 
    .eq('id', id)
    data={...res.data}  

  }else if(action=='get'){ 

    let query = supabase
    .from('signup_code')   
    if(user_email || user_name){
      query=query.select(`
        *,
        users:signup_code_user!inner(*)
      `) 
      if (user_email)  { query = query.ilike('users.email', `%${user_email}%`) }  
      if (user_name)  { query = query.ilike('users.fullname', `%${user_name}%`) }  
    }else{
      query=query.select(`
        *,
        users:signup_code_user(*)
      `) 
    }
    query=query.order('id', { ascending: true })
    //.limit(6)
    //if (collab_status && collab_status.value)  { query = query.ilike('status', `%${collab_status.value}%`) } 
    //if (user_name)  { query = query.ilike('users.', `%${user_name}%`) }   
    //if (user_email)  { query = query.ilike('users.email', `%${user_email}%`) }   
    if (code)  { query = query.ilike('code', `%${code}%`) }   
    if (usage)  { query = query.eq('usage', usage) }  
    if (limit_)  { query = query.eq('limit_', limit_) }    
    //if (user_name)  { query = query.ilike('influencer.name', `%${influencer_name}%`) }  
    //if (influencer_id)  { query = query.eq('influencer.id', influencer_id) }    
   // if (product_name)  { query = query.ilike('product.title', `%${product_name}%`) }  
    //if (product_id)  { query = query.eq('product.id', product_id) }  

    let res = await query
    data=res.data
   // data = await signupCodeUsers(data)

  }
  
  //console.log("Signup Codes Requests "+action, data)
  return data
}
