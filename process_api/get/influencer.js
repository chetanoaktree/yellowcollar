import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'


const getOrders = async (items, args) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.id)
  }) 
  let ids_=[...ids].join(',')

  let query = supabase
  .from('order')
  .select()     
  .filter('influencer_id', 'in', '('+ids_+')')
  .order('created_at', { ascending: false }) 

  if(args.limit!=0) { query = query.limit(args.limit) }  

  let res = await query  
  list=res.data 
  return list
}

const influencerOrders = async (items, args={limit:0}) => {
  let list=await getOrders(items, args)
  //console.log("orders list", list)
  if(list){
    _.forEach(items, (v, k)=>{            
      let events_=_.filter(list, ['influencer_id', v.id])    
      items[k]['orders']= events_[0] ?  events_ : []
    }) 
  }else{
    items[k]['orders']= []
  }
  return items
}

const getCollabs = async (items, args) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.id)
  }) 
  let ids_=[...ids].join(',')

  let query = supabase
  .from('collab')
  .select()     
  .filter('influencer_id', 'in', '('+ids_+')')
  .order('created_at', { ascending: false }) 

  if(args.limit!=0) { query = query.limit(args.limit) }  

  let res = await query  
  list=res.data 
  return list
}

const influencerCollabs = async (items, args={limit:0}) => {
  let list=await getCollabs(items, args)
  //console.log("Collabs list", list)
  if(list){
    _.forEach(items, (v, k)=>{            
      let events_=_.filter(list, ['influencer_id', v.id])    
      items[k]['collabs']= events_[0] ?  events_ : []
    }) 
  }else{
    items[k]['collabs']= []
  }
  return items
}
const remove_protected=(out)=>{
  if(out.influencer2 ) {
    if(out.influencer2.email) delete out.influencer2.email
    if(out.influencer2.meta ) {      
      if(out.influencer2.meta.facebook_accessToken) delete out.influencer2.meta.facebook_accessToken
      if(out.influencer2.meta.facebook_email) delete out.influencer2.meta.facebook_email
      if(out.influencer2.meta.facebook_id) delete out.influencer2.meta.facebook_id
      if(out.influencer2.meta.instagram) delete out.influencer2.meta.instagram
      if(out.influencer2.meta.instagramUserId) delete out.influencer2.meta.instagramUserId      
    }
  }
  return out
}

export {
  influencerOrders,
  influencerCollabs,
  remove_protected
}



export default async function process(data) { 
  let influencer = await supabase
  .from('influencer2')
  .select()
  .eq("id", data.influencer_id)  
  data.influencer=influencer.data ? influencer.data[0] : {name:'', profile_pic:''}
  //console.log("influencer", data)
  return data
}
