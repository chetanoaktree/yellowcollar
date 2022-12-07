import { supabase } from '../util/supabaseClient'

export default async function  process(props) {  
  let {action, name}=props
  let data={} 
  console.log("props", props)

  if(action=='get'){  
    let user = await supabase
    .from('page')
    .select(`*`) 
    .eq("name", name)
    data=user.data[0]
    console.log("User", user)
  } 
  console.log("data", data)  
  return data
}
