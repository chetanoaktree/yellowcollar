import { supabase } from '../../util/supabaseClient'

const get_user = async (i) =>{
  let {id, select=`*`} = i
  let user = await supabase
  .from('user')
  .select(select) 
  .eq("id", id)  
  return user.data ? user.data[0] : {}
}

const get_user_from_ids = async (i) => { 
  let {ids, select=`*`} = i 
  if(!ids ) return {}
  let res = await supabase
  .from('user')
  .select(select)     
  .filter('id', 'in', '('+ids+')') 
  let data=res.data ? res.data : [] 
  console.log("users", data)
  return data
}

const update_user_meta = async (i) =>{
  let {id, meta}=i
  let user = await get_user({id})
  let user_meta = user.meta ? user.meta :{}
  meta={...user_meta, ...meta}
  let res = await supabase
  .from('user')
  .update([{meta}]) 
  .eq("id", id)
  return res.data[0] ? res.data[0] : {} 
}



 

export{
  get_user,
  get_user_from_ids,
  update_user_meta
}