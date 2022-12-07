import { supabase } from '../../util/supabaseClient'

export default async function  process({business_id}) { 
  let status 
  let data={} 
  let event = await supabase
  .from('collab')
  .select("*", { count: 'exact' })
  .eq('business_id', business_id)
  .neq('status', 'requested')
  .neq('status', 'business_rejected')

  let event_requests = await supabase
  .from('collab')
  .select("*", { count: 'exact' })
  .eq('business_id', business_id)
  .eq('status', 'requested')

  let sales = await supabase
  .from('order')
  .select("*", { count: 'exact' })
  .eq('business_id', business_id)


  console.log("sales.data", sales.data)

  const sales_total = sales.data ? sales.data.reduce((total, currentValue) => total = total + currentValue.total, 0) : 0;
  const sales_count = sales.count ? sales.count : 0;



  
  

  let data2={
    collabs:event.count,  
    sales:sales_count,  
    platform_sales:sales_count, 
    collabs_requests:event_requests.count, 
    platform_sales_total:sales_total,    
  }
  return data2
}
