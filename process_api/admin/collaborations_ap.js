import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import {collabTresholds} from '../get/tresholds'
import {collabEvents, collabPayments, collabMatch} from '../get/collaboration'
import _ from 'lodash'

const get_query =(props)=>{
  let {action, id, match, product_id, business_id, influencer_id, collab_status, product_name, influencer_name, business_name, start, end}=props
  let query = supabase
    .from('collab')
    .select(`
      *,
      influencer:influencer_id!inner(
        *,
        influencer_meta(*)
      ),
      business:business_id!inner(*),
      product:product_id!inner(*),
      performance:performance_id(*)
    `, { count: 'exact' })   
    .order('created_at', { ascending: false })

    //if (order_id)  { query = query.eq('order_id', order_id) }
    if (collab_status && collab_status.value)  { query = query.ilike('status', `%${collab_status.value}%`) } 
    if (business_name)  { query = query.ilike('business.name', `%${business_name}%`) }   
    if (influencer_name)  { query = query.ilike('influencer.name', `%${influencer_name}%`) }  
    if (influencer_id)  { query = query.eq('influencer.id', influencer_id) }    
    if (product_name)  { query = query.ilike('product.title', `%${product_name}%`) }  
    if (product_id)  { query = query.eq('product.id', product_id) }  
    if (business_id)  { query = query.eq('business.id', business_id) }   
    return query
}
export default async function  process(props) { 
  let {action, id, match, product_id, business_id, influencer_id, collab_status, product_name, influencer_name, business_name, start, end}=props
  let data={}

  console.log("props", props)

  /*if(action=='update'){     
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

    let collab = await supabase
    .from('collab')
    .insert([
      {status:'requested', influencer_id, business_id, product_id, match },
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

  }else */if(action=='get'){      
    let query=get_query(props)
    if( start && end ) { query = query.range(start-1, end-1) }  
    let collabs = await query
    data=collabs.data      
    data=await collabTresholds(data)  
    data=await collabEvents(data)
    data=await collabPayments(data)
    data=await collabMatch(data)
    

  }else if(action=='get_total'){    
    let query=get_query(props)
    let collabs = await query
    data=collabs.count

  } else if(action=='promotion_complete'){   
    
    let res = await supabase
    .from('collab')
    .update([
      {status:'completed'},
    ])  
    .eq('id', id)
    let collab=res.data ? res.data[0].id : {}
    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id:id, type:"completed" },
      {collab_id:id, type:"payment_details" },      
    ])  
  }
    
  console.log("Collab  "+action, props)
  return data
}
