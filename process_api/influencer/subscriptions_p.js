import { supabase } from '../../util/supabaseClient'

export default async function  process({action, influencer_id}) { 
  let status 
  let data={} 
  if(action=="get"){
    let subscriptions = await supabase
    .from('option')
    .select("*")
    .eq('key', 'subscriptions_influencer') 

    data=subscriptions.data[0].value
  }
  
  return data
}
