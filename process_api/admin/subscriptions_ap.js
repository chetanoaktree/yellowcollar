import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

export default async function  process(props) { 
  let {action, key, value}=props
  let data={}

  if(action=='update'){     
    let history = await supabase
    .from('option_history')
    .insert([{key, value}]) 
    data=history.data  

    let option = await supabase
    .from('option')
    .update([{value}]) 
    .eq("key", "subscriptions")

    let option2 = await supabase
    .from('option')
    .update([{value:value['business']}]) 
    .eq("key", "subscriptions_business")

    let option3 = await supabase
    .from('option')
    .update([{value:value['influencer']}]) 
    .eq("key", "subscriptions_influencer")

    let option4 = await supabase
    .from('option')
    .update([{value:value['business']['level0']}]) 
    .eq("key", "business_subscriptions_free")

    let option5 = await supabase
    .from('option')
    .update([{value:value['influencer']['level0']}]) 
    .eq("key", "influencer_subscriptions_free")

    data=history.data      
  }else if(action=='get'){  
    let option = await supabase
    .from('option')
    .select() 
    .eq("key", "subscriptions")
    
    data=option.data[0].value     
  }
  console.log("Subscription "+action, data)
  return data
}
