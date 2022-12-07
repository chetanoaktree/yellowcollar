import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

const freeSubscription = async (user_type) =>{
  let out={    
    meta:{
      platform_fee_sale:10,
      platform_fee_collab:5,
      promotional_request:10,
    }    
  }  
  let key
  if(user_type=="influencer"){
    key='influencer_subscriptions_free'
  }else{
    key='business_subscriptions_free'
  }
  let subscription = await supabase
  .from('option')
  .select() 
  .eq("key", key)   

  
  if(subscription.data[0]) out={...out, ...subscription.data[0].value}
  //console.log("free subscription", out)
  return out
}

const get_commissions= async (transactions, meta_key='', user_type)=>{ 
  if(!meta_key) {
    //console.log("no meta key")
    return
  } 
  let free_subscription = await freeSubscription(user_type)

  let ids=[]
  let data=[]
  _.forEach(transactions, function(i, key) { 
    //console.log("i", i)    
    ids.push(i.user_id);
  });

  let percentages={}
  let membership = await supabase
  .from('membership')
  .select() 
  .in("user_id", ids ) 
  .eq("user_type", user_type ) 
  //console.log("ids", ids) 
  //console.log("membership", membership) 


  _.forEach(membership.data, function(i, key) {      
    percentages[i.user_id]=i.meta[meta_key]
  });
  //console.log("percentages", percentages)   

  _.forEach(transactions, function(i, key) { 
    let percentage = percentages[i.user_id] ? percentages[i.user_id] : free_subscription.meta[meta_key]
    data.push({percentage, type:meta_key, transaction_id:i.id});
  });

  return data  
}

const new_commission = async (transaction, meta_key, user_type="influencer") => { 
  let getCommissions=await get_commissions(transaction, meta_key, user_type)
  let commissions = await supabase
    .from('commission')
    .insert(getCommissions)
}
const new_commission_single = async (transaction, meta_key, user_id, user_type="influencer") => { 
  //console.log("new_commission_single_user_type", user_type)
  let free_subscription=await freeSubscription(user_type)

  let membership = await supabase
  .from('membership')
  .select() 
  .eq("user_id", user_id ) 
  .eq("user_type", user_type ) 

  //console.log("membership", membership)
  let percentage = membership.data.length ? membership.data[0].meta[meta_key] : free_subscription.meta[meta_key]
  let commissions = await supabase
    .from('commission')
    .insert({percentage, type:meta_key, transaction_id:transaction.id})
}
const get_commission_single = async (user_id, meta_key, user_type="business") => { 
  //console.log("get_commission_single_user_type", user_id)
  let free_subscription=await freeSubscription(user_type)
  //console.log("free_subscription", free_subscription)
  let membership = await supabase
  .from('membership')
  .select() 
  .eq("user_id", user_id) 
  .eq("user_type", user_type) 
  //console.log("membership", membership)
  let percentage
  //console.log("membership", membership)
  if(membership.data){
    percentage = membership.data[0] ? membership.data[0].meta[meta_key] : free_subscription.meta[meta_key]
  }
  
  //let percentage=1
  //console.log("percentage", percentage)
  return percentage
  
}
export {
  get_commission_single,
  new_commission,
  new_commission_single
}
