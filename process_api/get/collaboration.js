import { supabase } from '../../util/supabaseClient'
import {collab_match} from './match'
import _ from 'lodash'


const getEvents = async (items) =>{ 
  let events_list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.id)
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)

  let events2 = await supabase
  .from('collab_event')
  .select()     
  .filter('collab_id', 'in', '('+ids_+')')
  .order('created_at', { ascending: true }) 

  events_list=events2.data 
  return events_list
}

const collabEvents = async (items) => {
  let events_list=await getEvents(items)
  //console.log("events", events_list)
  if(events_list){
    _.forEach(items, (v, k)=>{            
      let events_=_.filter(events_list, ['collab_id', v.id])    
      items[k]['events']= events_[0] ?  events_ : []
    }) 
  }
  return items
}

const getPayments = async (items) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.id)
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)

  let payments = await supabase
  .from('collab_payment')
  .select()     
  .filter('collab_id', 'in', '('+ids_+')')
  .order('created_at', { ascending: true }) 

  list=payments.data 
  return list
}
const collabPayments = async (items) => {
  let list=await getPayments(items)
  //console.log("payments", list)
  if(list){
    _.forEach(items, (v, k)=>{            
      let payments=_.filter(list, ['collab_id', v.id])    
      items[k]['payments']= payments[0] ?  payments : []
    }) 
  }
  return items
}

const getProductCampaign = async (items) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.product_id)
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)
  let res = await supabase
  .from('product__campaign')
  .select()     
  .filter('product_id', 'in', '('+ids_+')')
  //.order('created_at', { ascending: true }) 

  list=res.data 
  return list
}

const collabInfluencerDemographic = async (items) => {
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.influencer_id)
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)
  let res = await supabase
  .from('influencer_demographic')
  .select()     
  .filter('influencer_id', 'in', '('+ids_+')')
  //.order('created_at', { ascending: true }) 
  list=res.data 
  return list
}

const collabMatch = async (items) => {
  let pc=await getProductCampaign(items)
  let id=await collabInfluencerDemographic(items)
  console.log("id", id)
  if(pc){
    _.forEach(items, (v, k)=>{            
      let matchs=_.filter(pc, ['product_id', v.product_id])      
      items[k]['product_campaign']= matchs[0] ?  matchs[0].meta : {}
    }) 
  }
  if(id){
    _.forEach(items, (v, k)=>{            
      let matchs=_.filter(id, ['influencer_id', v.influencer_id])      
      items[k]['influencer_demographic']= matchs[0] ?  matchs[0] : {}
    }) 
  }

  _.forEach(items, (v, k)=>{ 
    items[k]=collab_match(v)
    //items[k]['testing']= 'fasty'
  }) 
  return items
}

export {
  collabEvents,
  collabPayments,
  collabMatch,
}
