import { supabase } from '../../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'

import _ from 'lodash'

//import { typeImages, get_image} from '../get/image'
const get_all = (item, set) =>{
  if(set){
    if(set.product) item['product']=set.product
    if(set.influencer) item['influencer']=set.influencer
    if(set.business) item['business']=set.business
  }
  return item
}

const getCollabRequests = async (items) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{ 
    if(v.type=='collab' && v.action=='Request') {        
      ids.add(v.type_id)
    }
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)

  let collabs = await supabase
  .from('collab_request')
  .select(`
    *,
    influencer:influencer_id(*),
    business:business_id(*),
    product:product_id(*)
  `)
  .filter('id', 'in', '('+ids_+')')
  .order('created_at', { ascending: true }) 

  list=collabs.data 
  return list
}
const adminCollabRequests = async (items) => {
  let list=await getCollabRequests(items)
  //console.log("collabs", list)
  if(list){
    _.forEach(items, (v, k)=>{     
      if(v.type=='collab' && v.action=='Request') { 
        let collabs_=_.filter(list, ['id', v.type_id])    
        items[k]['collab_request']= collabs_[0] ?  collabs_[0] : {}
        let cr= collabs_[0] ?  collabs_[0] : {}        
        items[k]=get_all(items[k], cr)
        items[k]['collab_request']=cr
      }
    }) 
  }
  return items
}

const getCollabs = async (items) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{ 
    if(v.type=='collab') {           
      ids.add(v.type_id)
    }
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)

  let collabs = await supabase
  .from('collab')
  .select(`
    *,
    influencer:influencer_id(*),
    business:business_id(*),
    product:product_id(*),
    performance:performance_id(*)
  `)
  .filter('id', 'in', '('+ids_+')')
  .order('created_at', { ascending: true }) 

  list=collabs.data    
  return list
}
const adminCollabs = async (items) => {
  let list=await getCollabs(items)
  //console.log("collabs", list)
  if(list){
    _.forEach(items, (v, k)=>{ 
      if(v.type=='collab') {             
        let collabs_=_.filter(list, ['id', v.type_id])    
        let collab= collabs_[0] ?  collabs_[0] : {}        
        items[k]=get_all(items[k], collab)
        items[k]['collab']=collab
      }
    }) 
  }
  return items
}

const getProductsIDs = (items) =>{  
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{
    if(v.type=='product'){
      ids.add(v.type_id)
    }
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)
  return ids_
}
const getProducts = async (ids_) =>{  
  let res = await supabase
  .from('product')
  .select(`
    *,   
    business:business_id(name, company_name, image_id)   
  `)
  .filter('id', 'in', '('+ids_+')')
  .order('created_at', { ascending: true }) 
  //console.log("res", res)
  let list=res.data 
  return list
}
const getProductsCampaigns = async (ids_) =>{  
  let res = await supabase
  .from('product__campaign')
  .select(`*`)
  .filter('product_id', 'in', '('+ids_+')') 
  //console.log("res", res)
  let list=res.data 
  return list
}
const adminProducts = async (items) => {
  let ids_=getProductsIDs(items)
  let products=await getProducts(ids_)
  let campaigns=await getProductsCampaigns(ids_)
  //console.log("products", list)
  if(products){
    _.forEach(items, (v, k)=>{ 
     if(v.type=='product') {             
        let ds_=_.filter(products, ['id', v.type_id])    
        let d= ds_[0] ?  ds_[0] : {}        
        items[k]=get_all(items[k], d)
        items[k]['product']=d
      }
    }) 
  }  
  if(campaigns){
    _.forEach(items, (v, k)=>{ 
     if(v.type=='product') {             
        let ds_=_.filter(campaigns, ['product_id', v.type_id])    
        let d= ds_[0] ?  ds_[0] : {}        
        items[k]=get_all(items[k], d)
        items[k]['campaign']=d
      }
    }) 
  }  
  return items
}
const getInfluencers = async (items) =>{ 
  /*let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{ 
    if(v.type=='influencer') {           
      ids.add(v.type_id)
    }
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)

  let its = await supabase
  .from('influencer2')
  .select(`
    *
  `)
  .filter('id', 'in', '('+ids_+')')
  .order('created_at', { ascending: true }) 

  list=its.data    
  return list*/
}
const adminInfluencers = async (items) => {
  /*let list=await getInfluencers(items)
  //console.log("collabs", list)
  if(list){
    _.forEach(items, (v, k)=>{ 
      if(v.type=='influencer') {             
        let influencers_=_.filter(list, ['id', v.type_id]) 
        items[k]['influencer']=influencers_ ?  influencers_[0] : {}  
      }
    }) 
  }*/
  return items
}
export {
  adminCollabRequests,
  adminCollabs,
  adminProducts,
  adminInfluencers
}