import { supabase } from '../../util/supabaseClient'

export default async function  process({influencer_id}) { 
  let status 
  let data={} 
  let event = await supabase
  .from('collab')
  .select("*", { count: 'exact' })
  .eq('influencer_id', influencer_id)
  .neq('status', 'requested')
  .neq('status', 'business_rejected')

  let sales = await supabase
  .from('order')
  .select("*", { count: 'exact' })
  .eq('influencer_id', influencer_id)


  

  const sales_total = sales.data.reduce((total, currentValue) => total = total + currentValue.total, 0);



  console.log(event)
  

  let data2={
    collabs:event.count,  
    sales:sales.count,  
    sales_total:sales_total,    
  }
  return data2
}
