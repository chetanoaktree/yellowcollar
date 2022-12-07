import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, match, product_id, business_id, influencer_id, collab_status, product_name, influencer_name}=props
  let data={}

  console.log("props", props)

  if(action=='update'){     
    let history = await supabase
    .from('option_history')
    .insert([{key, value}]) 
    data=history.data 
         
  }else if(action=='approve'){  
    let option = await supabase
    .from('collab_request')
    .delete() 
    .eq("id", id)   
    //data=option.data[0] 

    let performance = await supabase
    .from('collab_performance')
    .insert([
      {click_through:0}
    ])  
    let performance_id= performance.data ? performance.data[0].id : ''

    let collab = await supabase
    .from('collab')
    .insert([
      {status:'requested', influencer_id, business_id, product_id, performance_id, match },
    ])  
    let collab_id=collab.data[0].id
    
    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"request" },
    ])  

   

    NotificationAction({action:'insert_data', type:'collab', event:'requested', influencer_id, business_id, product_id, meta:{collab_id}})

  }else if(action=='decline'){  
    let option = await supabase
    .from('collab_request')
    .update([{status:'declined'}]) 
    .eq("id", id)   
    data=option.data[0]  

  }else if(action=='get'){  
    let query = supabase
    .from('collab_request')
    .select(`
      *,
      influencer:influencer_id!inner(
        *,
        influencer_meta(*)
      ),
      business:business_id!inner(*),
      product:product_id!inner(*)
    `)
    .eq("status", 'pending')    

    //if (order_id)  { query = query.eq('order_id', order_id) }
    if (collab_status && collab_status.value)  { query = query.ilike('status', `%${collab_status.value}%`) }  
    if (influencer_name)  { query = query.ilike('influencer.name', `%${influencer_name}%`) }  
    if (influencer_id)  { query = query.eq('influencer.id', influencer_id) }    
    if (product_name)  { query = query.ilike('product.title', `%${product_name}%`) }  
    if (product_id)  { query = query.eq('product.id', product_id) }  

    let collabs = await query

    /*let collabs2 = await supabase
    .from('collab_request')
    .select(`
      *,
      influencer:influencer_id(
        *,
        influencer_meta(*)
      ),
      product:product_id(*)
    `)  */
    data=collabs.data    
  }
  
  console.log("Collab Requests "+action, data)
  return data
}
