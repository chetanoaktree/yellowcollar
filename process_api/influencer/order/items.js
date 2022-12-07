import { supabase } from '../../../util/supabaseClient'
import getCollaborated from '../../get/collaborated'

import { productImages } from '../../get/image'

export default async function  process({influencer_id}) {  
  //console.log("influencer_id", influencer_id)
  let orders = await supabase
  .from('order_item_join')
  .select(`
  *,
  order(*),
  influencer2(id, name, profile_pic),
  business(id, name, profile_pic),
  product(*)
  `)
  .eq("influencer_id", influencer_id)
  //.order('created_at', { ascending: true })

  console.log("order_item_join", orders.data)

  var results = await Promise.all(orders.data.map(async (item) => {
      //await getBusiness(item);
      //await getInfluencer(item);
      item.product=await getCollaborated(item.product, influencer_id)
      return item;
  }));
  results=await productImages(results)
  console.log("orders results", results)
  
  let data2=results
  return data2
}
