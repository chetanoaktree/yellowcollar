import { supabase } from '../../util/supabaseClient'

const get_performance = async (i) => { 
  let data={}
  let {performance_id} =i
  if(!performance_id ) return data
  let res = await supabase
  .from('collab_performance')
  .select(`*`)
  .eq("id", performance_id)    
  data=res.data ? res.data[0] : {} 
  return data
}

const get_performance_from_ids = async ({ids}) => { 
  let data=[]
  if(!ids ) return data
  let res = await supabase
  .from('collab_performance')
  .select()     
  .filter('id', 'in', '('+ids+')') 
  data=res.data ? res.data : [] 
  console.log("performances", data)
  return data
}


export{
  get_performance,
  get_performance_from_ids
}