import { supabase } from '../../util/supabaseClient'

const get_product = async({id, select=`*`}) => {  
  if(!id) return {}
  let res = await supabase
  .from('product')
  .select(select) 
  .eq("id", id)  
  let data=res.data ? res.data[0] : {} 
  console.log("get product", data) 
  return data
}
const update_product = async({id, update=false}) => {  
  let data={}
  console.log("update", update) 
  if(!id || update==false) return data
  let product = await supabase
  .from('product')
  .update([update]) 
  .eq("id", id)  
  data=product.data ? product.data[0] : {}
  console.log("update product", data) 
  return data
}
const update_meta_product = async({id, meta=false}) => { 
  let data={} 
  console.log("update meta", meta) 
  if(!id || meta==false) return data
  let product = await supabase
  .from('product')
  .update([{meta}]) 
  .eq("id", id)  
  data=product.data ? product.data[0] : {}
  console.log("update meta product", data) 
  return data
}
const get_stats_product = async ({product_id}) => {  
  let data={}   
  if(!product_id) return data
  let res = await supabase
  .from('product_stats')
  .select(`*`) 
  .eq("product_id", product_id)  
  data=res.data ? res.data[0] : {} 
  return data
}
const update_stats_product = async ({product_id, stats=false}) => {  
  let data={} 
  let res={}
  console.log("update stats", stats) 
  if(stats==false) return data
  let product_stats=await get_stats_product({product_id})
  stats={...product_stats, ...stats, product_id}
  if(product_stats && product_stats.id){
    res = await supabase
    .from('product_stats')
    .update([stats]) 
    .eq("product_id", product_id)  
  }else{
    res = await supabase
    .from('product_stats')
    .insert([stats])    
  }
  
  data=res.data ? res.data[0] : {}
  console.log("update stats product", data) 
  return data
}
const get_campaign_product = async ({product_id}) => {  
  let data={}   
  if(!product_id) return data
  let res = await supabase
  .from('product__campaign')
  .select(`*`) 
  .eq("product_id", product_id)  
  data=(res.data && res.data[0] && res.data[0].meta) ? res.data[0].meta : {} 
  return data
}
const update_campaign_product = async ({product_id, campaign=false}) => {  
  let data={} 
  console.log("update campaign", campaign) 
  if(!product_id || campaign==false) return data
  let product_campaign=await get_campaign_product({product_id})
  campaign={...product_campaign, ...campaign}
  if(product_campaign.id){
    let res = await supabase
    .from('product__campaign')
    .update([{meta:campaign}]) 
    .eq("product_id", product_id)  
  }else{
    let res = await supabase
    .from('product__campaign')
    .insert([{meta:campaign}])    
  }
  
  data=res.data ? res.data[0] : {}
  console.log("update campaign product", data) 
  return data
}

export{
  get_product,
  update_product,
  update_meta_product,
  update_campaign_product,
  update_stats_product
}