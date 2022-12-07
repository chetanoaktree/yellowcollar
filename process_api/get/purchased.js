import { supabase } from '../../util/supabaseClient'

export default async function process(data, influencer_id) { 
  let orders = await supabase
  .from('order_item_join')    
  .select()
  .eq("product_id", data.id)
  .eq("influencer_id", influencer_id)
  //console.log("pdata", data)
  data.isPreviouslyPurchased = orders.data[0] ? true : false  
  return data
}
