import { supabase } from '../../util/supabaseClient'

const get_influencer = async ({id, select=`*`}) => {
  let data={}
  if(!id) return data
  let inf = await supabase
  .from('influencer2')
  .select(`*`) 
  .eq("id", id)  
  data=inf.data ? inf.data[0] : {} 
  console.log("get inf", data) 
  return data
}
const update_influencer = async ({id, update=false}) => {
  let data={}  
  console.log("update", update) 
  if(!id || update==false) return data
  let inf = await supabase
  .from('influencer2')
  .update([update]) 
  .eq("id", id)  
  data=inf.data ? inf.data[0] : {}
  console.log("update inf", data) 
  return data
}
const update_meta_influencer = async ({id, meta=false}) => {
  let data={}  
  console.log("update meta", meta) 
  if(!id || meta==false) return data
  let influencer=await get_influencer({id})
  let inf_meta= influencer.meta ? influencer.meta : {}
  meta={...inf_meta, ...meta}
  let inf = await supabase
  .from('influencer2')
  .update([{meta}]) 
  .eq("id", id)  
  data=inf.data ? inf.data[0] : {}
  console.log("update meta inf", data) 
  return data
}
const update_treshold_influencer = async ({treshold_id, treshold=false}) => {
  let data={}  
  console.log("update treshold", treshold) 
  if(!treshold_id || treshold==false) return data
  let inf = await supabase
  .from('influencer_treshold')
  .update([treshold]) 
  .eq("id", treshold_id)  
  data=inf.data ? inf.data[0] : {}
  console.log("update treshold inf", data) 
  return data
}

export{
  get_influencer,
  update_influencer,
  update_meta_influencer,
  update_treshold_influencer
}