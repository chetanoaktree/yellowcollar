import { supabase } from '../../util/supabaseClient'

const get_collab = async ({id, select=`*`}) => {
  let data={}
  if(!id) return data
  let collab = await supabase
  .from('collab')
  .select(select) 
  .eq("id", id)  
  data=collab.data ? collab.data[0] : {} 
  console.log("get collab", data) 
  return data
}
const update_collab = async ({id, update=false}) => {
  let data={}  
  console.log("update", update) 
  if(!id || update==false) return data
  let collab = await supabase
  .from('collab')
  .update([update]) 
  .eq("id", id)  
  data=collab.data ? collab.data[0] : {}
  console.log("update collab", data) 
  return data
}
const update_meta_collab = async ({id, meta=false}) => {
  let data={}  
  console.log("update meta", meta) 
  if(!id || meta==false) return data
  let collab = await supabase
  .from('collab')
  .update([{meta}]) 
  .eq("id", id)  
  data=collab.data ? collab.data[0] : {}
  console.log("update meta collab", data) 
  return data
}
const update_performance_collab = async ({performance_id, performance=false}) => {
  let data={}  
  console.log("update performance", performance) 
  if(!performance_id || performance==false) return data
  let collab = await supabase
  .from('collab_performance')
  .update([performance]) 
  .eq("id", performance_id)  
  data=collab.data ? collab.data[0] : {}
  console.log("update performance collab", data) 
  return data
}

export{
  get_collab,
  update_collab,
  update_meta_collab,
  update_performance_collab
}