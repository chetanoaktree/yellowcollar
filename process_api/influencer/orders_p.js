import { supabase } from '../../util/supabaseClient'
import getInfluencer from '../get/influencer'
import getBusiness from '../get/business'
import getProduct from '../get/product'
import getCollaborated from '../get/collaborated'

import {saleActivity} from '../get/sale'

export default async function  process({influencer_id}) {  
  console.log("influencer_id", influencer_id)
  let orders = await supabase
  .from('order')
  .select(`
  *,
  influencer2:influencer_id(*),
  items:order_item(*),
  payment:order_payment(*),
  details:order_details(*)
  `)  
  .eq("influencer_id", influencer_id)
  .order('created_at', { ascending: false })

  //console.log("orders - ", orders.data)
  /*
  const getBusiness = async (collab) =>{
    let business = await supabase
    .from('business')
    .select()
    .eq("id", collab.business_id)
    collab.business=business.data[0]
    console.log("collab business", collab)
    return collab
  }
  const getInfluencer = async (collab) =>{
    let influencer = await supabase
    .from('influencer')
    .select()
    .eq("id", collab.influencer_id)
    collab.influencer=influencer.data[0]
    console.log("collab influencer", collab)
    return collab
  }
  var results = await Promise.all(orders.data.map(async (item) => {
      //await getBusiness(item);
      //await getInfluencer(item);
      item.product=await getCollaborated(item.product, influencer_id)
      return item;
  }));
  console.log("orders results", results)*/

  //let data2=collabs.data
 // let data2=collabs2
 let data2=orders.data
 
  //let data2=results
  return data2
}
