import { supabase } from '../../util/supabaseClient'

const get_option = async ({key=false}) => {
  let data={}  
  console.log("get Option", key) 
  if(key==false) return data
  let res = await supabase
  .from('option')
  .select() 
  .eq("key", key)  
  data=res.data ? res.data[0] : {}
  //console.log("get option", data) 
  return data
}
const update_option = async ({key=false, value=false}) => {
  let data={}  
  console.log("update Option", key, value) 
  if(key==false || value==false) return data
  let option = await get_option({key})
  if(option && option.id){
     let res = await supabase
    .from('option')
    .update([{key, value}]) 
    .eq("id", option.id)  
    data=res.data ? res.data[0] : {}
  }else{
     let res = await supabase
    .from('option')
    .insert([{key, value}])    
    data=res.data ? res.data[0] : {}
  } 
  //console.log("update option", data) 
  return data
}
export{
  get_option,
  update_option
}