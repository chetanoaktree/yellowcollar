import { supabase } from '../../util/supabaseClient'

const get_treshold = async (i) => { 
  let data={}
  let {treshold_id} =i
  if(!treshold_id ) return data
  let res = await supabase
  .from('influencer_treshold')
  .select(`*`)
  .eq("id", treshold_id)    
  data=res.data ? res.data[0] : {} 
  return data
}

const get_treshold_from_ids = async ({ids}) => { 
  let data=[]
  if(!ids ) return data
  let res = await supabase
  .from('influencer_treshold')
  .select()     
  .filter('id', 'in', '('+ids+')') 
  data=res.data ? res.data : [] 
  console.log("tresholds", data)
  return data
}



 

export{
  get_treshold,
  get_treshold_from_ids
}