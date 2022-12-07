import { supabase } from '../../util/supabaseClient'
import getInfluencer from '../get/influencer'
import getBusiness from '../get/business'
import getProduct from '../get/product'
import getTresholds from '../get/tresholds'

export default async function  process({influencer_id}) {  
  console.log("influencer_id", influencer_id)
  let out={}
  let collabs = await supabase
  .from('collab')
  .select(`
  *,
  business(*),
  influencer2(*),
  product(*),
  collab_performance:performance_id(*)
  `)
  .eq("influencer_id", influencer_id)
  .neq('status', 'requested')
  .neq('status', 'business_rejected')
  .order('created_at', { ascending: true })

  let items=collabs.data
  let tresholds=await getTresholds(items)
  console.log("tresholds", tresholds)

  out={items, tresholds}

  console.log("collabs", collabs.data)
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
  var results = await Promise.all(collabs.data.map(async (item) => {
      await getBusiness(item);
      await getInfluencer(item);
      await getProduct(item)
      return item;
  }));*/

  //let data2=collabs.data
 // let data2=collabs2
  //let data2=collabs.data
  return out
}
