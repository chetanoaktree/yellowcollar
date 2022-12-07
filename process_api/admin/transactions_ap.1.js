import { supabase } from '../../util/supabaseClient'
import {match_score} from '../get/match'
import NotificationAction from '../com/notification/action'
import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, match, type, product_id, business_id, influencer_id, collab_status, product_name, influencer_name}=props
  let data={}

  console.log("props", props)
   
  let mc=match_score({product_id:1, business_id:2, influencer_id:3})
  console.log("MC", mc) 

  if(action=='update'){     
    let history = await supabase
    .from('option_history')
    .insert([{key, value}]) 
    data=history.data 

  }else if(action=='get'){
    let query 
    if(type=="collab"){
      query = supabase
      .from('collab_payment')
      .select(`
        *,
        collab:collab_id(
          *,
          influencer:influencer_id(*)
        )
      `) 
    }else{
      query = supabase
      .from('order_payment')
      .select(`
        *,
        order:order_id(
          *,        
          influencer:influencer_id(*)
        )
      `) 
    }
    
    //.eq("type", "collab_payment")   
    /*
    //if (order_id)  { query = query.eq('order_id', order_id) }
    if (collab_status && collab_status.value)  { query = query.ilike('status', `%${collab_status.value}%`) }  
    if (influencer_name)  { query = query.ilike('influencer.name', `%${influencer_name}%`) }  
    if (influencer_id)  { query = query.eq('influencer.id', influencer_id) }    
    if (product_name)  { query = query.ilike('product.title', `%${product_name}%`) }  
    if (product_id)  { query = query.eq('product.id', product_id) } */ 

    let get = await query

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
    data=get.data    
  }
  
  console.log("Transactions "+action, data)
  return data
}
