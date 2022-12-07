import { supabase } from '../../util/supabaseClient'
//import {process_membership} from '/ui/lib/get/membership'


export default async function  process(props) {  
  let {action, email, code, fullname, user_id} = props
  //console.log("props", props)
  let data={status:'fail'}   
  
  if(action=='check_signup_code'){  
    let res = await supabase
    .from('signup_code')
    .select() 
    .eq("code", code) 

    let input=res.data ? res.data[0] : {} 
    if(input && input.code){
      if(input.usage < input.limit_) {
        data.status='available'

        let res = await supabase
        .from('signup_code_user')
        .insert([{signup_code_id:input.id, code, email, fullname}]) 
        data=res.data ? res.data[0] : {}

        let up = await supabase
        .from('signup_code')
        .update([{usage:input.usage+1}]) 
        .eq("id", input.id)        

      }else{
        data.status='full'
      }
    }
    data.input=input

  }else if(action=='update_user'){ 
    let res = await supabase
    .from('signup_code_user')
    .update([{user_id}]) 
    .eq("email", email)  

  }


  console.log("User Auth", data)
  return data
}
