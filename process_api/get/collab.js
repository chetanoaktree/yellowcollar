import { supabase } from '../../util/supabaseClient'
import {treshold_amount, variable} from '../../ui/lib/view/admin/action';
import {get_commission_single} from './commission';
import { get_image} from './image'
import { remove_protected} from './influencer'


import _ from 'lodash'

import { 
  get_variable_from_item
} from './g_variable_p'

import {
  get_option
} from '../_model/m_option'



const process_collab = async (i) => {
  i.processed=true
  i.influencer=i.influencer2

  i.percentage=await get_commission_single(i.business_id, 'platform_fee_collab', 'business')   

  console.log("process_collab", i.can_go_upto,  i.variable_cap)    
 
  //i.treshold=i.influencer.influencer_treshold // dont use this
 // i.treshold_amount=treshold_amount(i)   // dont use this 
  //i.variable=variable(i) // dont use this
  i.base=(i.meta && i.meta.base) ? i.meta.base : 0
  i.can_go_upto = i.base + i.treshold_amount  

  // init Payment
  i.init_fixed_fee=i.influencer.init_fixed_fee // not using
  i.init_platform_fee =(i.percentage*i.base)/100 
  i.init_tax = 0  
  i.total_init_payment=i.base + i.init_platform_fee  

  // Final Payment
  //i.platform_fee = (i.percentage*(i.variable) )/100  //old
  //i.balance_fee=i.variable  
  //i.total_balance_fee=i.variable + i.platform_fee  
  //i.total=i.base + i.init_platform_fee + i.variable + i.platform_fee 
  //i.full_fee=i.base + i.variable 
  i.platform_fee = (i.percentage*(i.balance_amount) )/100  
  i.balance_fee=i.balance_amount
  i.tax = 0 
  i.total_balance_fee= i.balance_amount + i.platform_fee 
 // i.total_balance_fee= i.percentage

  i.total=i.base + i.init_platform_fee + i.balance_amount + i.platform_fee 
  i.full_fee=i.base + i.balance_amount 

  // display
  i.init_platform_fee_=(i.init_platform_fee+0).toFixed(2)
  i.platform_fee_=(i.platform_fee+0).toFixed(2)
  i.total_init_payment_=(i.total_init_payment+0).toFixed(2)
  i.total_=(i.total+0).toFixed(2)

  //console.log("process_collab", i)
  //console.log("process_collab percentage", i.percentage)
 // console.log("tresholds", tresholds )
  return i
}

const get_collab= async (props)=>{
  let {id, userType, business_id='', influencer_id=''}= props
  let out={}
  let query = supabase
  .from('collab')
  .select(`
  *,
  business(*),
  influencer2(
    *,
    influencer_treshold:treshold_id(*),
    treshold:treshold_id(*)
  ),
  product(*),
  performance:performance_id(*),
  collab_performance:performance_id(*)
  `)
  .eq('id', id)
  // business_id, product_id, id, name, image_id, treshold_id
  if(userType=='business' && business_id!=''){
    query=query.eq('business_id', business_id)
  }else if(userType=='influencer' && influencer_id!=''){
    query=query.eq('influencer_id', influencer_id)
  }

  let {data, error} = await query
  
  //.eq('business_id', business_id)
  out=data ? data[0] :{}
  //console.log("out", out)
  if(out && out.id){

    let goal_types = await get_option({key:'variable'})    
    out = get_variable_from_item(out, goal_types)    
    out = await process_collab(out)
    out = remove_protected(out)

    let res = await supabase
    .from('collab_short_url')
    .select(`*`) 
    .eq("collab_id", out.id)
    let su=res.data? res.data[0] :{}
    
    if(su && su.id){
      out.share_url=su
    }
    if(out.meta && out.meta.performance_video_id) out.meta.performance_video=await get_image({image_id:out.meta.performance_video_id})

    
  }
  //console.log("process_collab2", true)


 
  
  return out
}

const getOrderItemCollabs = async (items, influencer_id) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.product_id)
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)

  let its = await supabase
  .from('collab')
  .select()  
  .eq("influencer_id", influencer_id)   
  .filter('product_id', 'in', '('+ids_+')')
  .order('created_at', { ascending: false }) 

  list=its.data 
  return list
}


const getOrderItemsCollab = async({items, influencer_id})=>{
  let collabs=await getOrderItemCollabs(items, influencer_id)
  if(collabs){
    _.forEach(items, (v, k)=>{            
      let collabs_=_.filter(collabs, ['product_id', v.product_id])    
      items[k]['collab']= collabs_[0] ?  collabs_[0] : {}
    }) 
  }  
  return items
}

const getOrderItemCollabRequests = async (items, influencer_id) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.product_id)
  }) 
  let ids_=[...ids].join(',')
  //console.log("ids", ids)

  let its = await supabase
  .from('collab_request')
  .select()  
  .eq("influencer_id", influencer_id)   
  .filter('product_id', 'in', '('+ids_+')')
  .order('created_at', { ascending: false }) 

  list=its.data 
  return list
}
const getOrderItemsCollabRequest = async({items, influencer_id})=>{
  let collabs=await getOrderItemCollabRequests(items, influencer_id)
  if(collabs){
    _.forEach(items, (v, k)=>{            
      let collabs_=_.filter(collabs, ['product_id', v.product_id])    
      items[k]['collab_request']= collabs_[0] ?  collabs_[0] : {}
    }) 
  }  
  return items
}
export {
  process_collab,
  get_collab,
  getOrderItemsCollab,
  getOrderItemsCollabRequest,
}
