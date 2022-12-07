import { supabase } from '../../util/supabaseClient'
import _ from "lodash"


const influencerProductData = async (influencer_id, products_id) =>{
  let purchased = await supabase
    .from('order_item_join')
    .select(`
      *,
      item:item_id(*)
    `)    
    .eq("product_id", products_id)
    .eq("influencer_id", influencer_id)

  let collab_request = await supabase
    .from('collab_request')    
    .select()
    .order('created_at', { ascending: false } )
    .eq("product_id", products_id)  
    .eq("influencer_id", influencer_id)

  let collab = await supabase
    .from('collab')    
    .select()
    .order('created_at', { ascending: false } )
    .eq("product_id", products_id)  
    .eq("influencer_id", influencer_id)

  return {
    purchased:purchased.data ? purchased.data[0]: {},
    collab_request:collab_request.data ? collab_request.data[0] :{},
    collab:collab.data ? collab.data[0] : {},
  }
}

const influencerProductsData = async (influencer_id, products_ids) =>{
  let purchased = await supabase
    .from('order_item_join')
    .select(`*`)    
    .in("product_id", products_ids)
    .eq("influencer_id", influencer_id)

  let collab_request = await supabase
    .from('collab_request')    
    .select()
    .order('created_at', { ascending: false } )
    .in("product_id", products_ids)  
    .eq("influencer_id", influencer_id)

  let collab = await supabase
    .from('collab')    
    .select()
    .order('created_at', { ascending: false } )
    .in("product_id", products_ids)  
    .eq("influencer_id", influencer_id)

  return {
    purchased:purchased.data,
    collab_request:collab_request.data,
    collab:collab.data,
  }
}

const influencerProductStats = ({item, influencer_product_data}) => {
  console.log("ITEM", item)  

  let {purchased, collab_request, collab }=influencer_product_data
  if(purchased && item.id==purchased.product_id) {
    if(purchased.item.status=="delivered"){
      item.isPreviouslyPurchased=true
    }else{
      item.isPreviouslyPurchasedNotDelivered=true
    }    
  }
  if(collab_request && item.id==collab_request.product_id) {
    item.isOfferSent=true
  }
  if(collab && item.id==collab.product_id) {
    //item.product.isActiveCollaboration=true        
    if(collab.status=="business_accepted"){
      item.isActiveCollaboration=true
    }
    if(collab.status=="paid"){
      item.isPreviouslyCollaborated=true
      item.isCollaborateAgain=true
    }
  } 
  return item
}

const influencerProductsStats = ({item, influencer_products_data, parent=''}) => {
  let {purchased, collab_request, collab }=influencer_products_data
  let product_id
  let product
  if(parent=='product') {
    product_id=item.id 
    product=item
  }else{
    product_id=item.product_id
    product=item.product
  }
  _.forEach(purchased, (v, k)=>{
    if(product_id==v.product_id) {
      product.isPreviouslyPurchased=true
    }
  }) 
  _.forEach(collab_request, (v, k)=>{     
    if(product_id==v.product_id) {
      product.isOfferSent=true
    }
  }) 
  _.forEach(collab, (v, k)=>{     
    if(product_id==v.product_id) {
      //item.product.isActiveCollaboration=true        
      if(v.status=="business_accepted"){
        product.isActiveCollaboration=true
      }
      if(v.status=="paid"){
        product.isPreviouslyCollaborated=true
      }
    }
  })   
  if(parent=='product') {    
    item=product
  }else{    
    item.product=product
  }
  item.product_stats='processed'
  return item
}

export default async function process({influencer_id, products, parent=''}) { 
  let products_ids=[]
  let p=_.forEach(products, (v, k)=>{
    products_ids.push(v.product_id ? v.product_id : v.id)
  }) 

  let influencer_products_data = await influencerProductsData(influencer_id, products_ids)

  console.log("influencer_products_data", influencer_products_data)
  let results=products.map((item, index)=>{
    item=influencerProductsStats({item, influencer_products_data, parent})   
    return item
  })

  //console.log("results", results)   
  
  return results 
}

export {
  influencerProductData,
  influencerProductStats
}