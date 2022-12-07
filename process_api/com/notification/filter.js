import { supabase } from '../../../util/supabaseClient'

export default async function  process({business_id, influencer_id}) {
  let data2=[] 
  let query = supabase
  .from('notification')
  .select(`
  *,
  business(*),
  influencer2(*),
  product(*)
  `)  
  .order('created_at', { ascending: false })

  if(business_id || influencer_id){
    if(business_id) query= query.eq('business_id', business_id)
    if(influencer_id) query= query.eq('influencer_id', influencer_id)

    let result = await query
    console.log("result", result)    
  
    if(result.data) data2=result.data
  }
  return data2
}
