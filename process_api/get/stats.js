import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

const get_table_type = ({data_type}) => {
  let table, table_type_id
  if(data_type=="business"){
    table="business_stats"
    table_type_id='business_id'
  } else if(data_type=="influencer"){    
    table="influencer_stats"
    table_type_id='influencer_id'
  } 
  return {table, table_type_id}
}
const getStats = async ({data_type, type_id}) =>{ 
  let { table, table_type_id } =get_table_type({data_type})
  if(!table) return {id:'', meta:{}} 
  let res = await supabase
  .from(table)
  .select()     
  .eq(table_type_id, type_id)
  let data=res.data ? res.data[0] : {id:'', meta:{}}   
  console.log("influencer table", res)
  return data
}

const updateStats = async ({data_type, id='', inData}) =>{ 
  let { table, table_type_id } =get_table_type({data_type})  
  let res
  if(id!='') {
    res = await supabase
    .from(table)
    .update([inData])     
    .eq('id', id) 
  }else{
    res = await supabase
    .from(table)
    .insert([inData])  
  }  
  let data=res.data ? res.data[0] : {} 
  console.log("influencer Update", data)
  return data 
}

const get_type_stats = ({meta, type, init_data={}}) =>{ 
  meta= {[type]: init_data, ...meta}    
  return meta[type]
}


export {
  getStats,
  updateStats,
  get_type_stats
}
