import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import {collabTresholds} from '../get/tresholds'
import {collabEvents, collabPayments} from '../get/collaboration'
import {influencerOrders, influencerCollabs} from '../get/influencer'
import _ from 'lodash'

const get_query =(props)=>{
  let {action, id, match, product_id, business_id, influencer_id, status, product_name, influencer_name, business_name, start, end}=props
  let query = supabase
    .from('influencer2')
    .select(`
      *,
      influencer_meta(*),
      details:details_id(*)     
    `, { count: 'exact' })   

    /*.select(`
      *,
      influencer:influencer_id!inner(
        *,
        influencer_meta(*)
      ),
      business:business_id!inner(*),
      product:product_id!inner(*),
      performance:performance_id(*)
    `, { count: 'exact' }) */  

    //if (order_id)  { query = query.eq('order_id', order_id) }
    if (status && status.value)  { query = query.ilike('status', `%${status.value}%`) } 
    //if (business_name)  { query = query.ilike('business.name', `%${business_name}%`) }   
    if (influencer_name)  { query = query.ilike('name', `%${influencer_name}%`) }  
    if (influencer_id)  { query = query.eq('id', influencer_id) }    
    //if (product_name)  { query = query.ilike('product.title', `%${product_name}%`) }  
    //if (product_id)  { query = query.eq('product.id', product_id) }  
    //if (business_id)  { query = query.eq('business.id', business_id) }   
    return query
}
export default async function  process(props) { 
  let {action, id, match, product_id, business_id, influencer_id, status, product_name, influencer_name, business_name, start, end, inData}=props
  let data={}

  console.log("props", props)

  /*if(action=='update'){     
    let history = await supabase
    .from('option_history')
    .insert([{key, value}]) 
    data=history.data 
         
  }else if(action=='approve'){  
    let option = await supabase
    .from('collab_request')
    .delete() 
    .eq("id", id)   
    //data=option.data[0] 

    let collab = await supabase
    .from('collab')
    .insert([
      {status:'requested', influencer_id, business_id, product_id, match },
    ])  
    let collab_id=collab.data[0].id
    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"request" },
    ])     
    NotificationAction({action:'insert_data', type:'collab', event:'requested', influencer_id, business_id, product_id, meta:{collab_id}})

  }else if(action=='decline'){  
    let option = await supabase
    .from('collab_request')
    .update([{status:'declined'}]) 
    .eq("id", id)   
    data=option.data[0]  

  }else */if(action=='get'){      
    let query=get_query(props)
    if( start && end ) { query = query.range(start-1, end-1) }  
    let res = await query
    data=res.data      
    data=await influencerOrders(data, {limit:3})
    data=await influencerCollabs(data, {limit:3})
    //data=await collabTresholds(data)  
    //data=await collabEvents(data)
    //data=await collabPayments(data)    

  }else if(action=='get_total'){    
    let query=get_query(props)
    let res = await query
    data=res.count

  }else if(action=='update_fee_approve'){
    /*let res = await supabase
    .from('influencer2')
    .select() 
    .eq('id', influencer_id)
    let inf = res.data ? res.data[0] : {}

    console.log("inf", res)

    if(inf.id){
      let {oldMeta, newMeta}=props      
      let {fixed_fee_story=0, fixed_fee_reel=0, fixed_fee_video=0, fixed_fee_post=0} = newMeta ? newMeta :{}
      let meta_={...inf.meta}
      if(fixed_fee_story!=0) meta_.fixed_fee_story=fixed_fee_story
      if(fixed_fee_reel!=0) meta_.fixed_fee_reel=fixed_fee_reel
      if(fixed_fee_video!=0) meta_.fixed_fee_video=fixed_fee_video
      if(fixed_fee_post!=0) meta_.fixed_fee_post=fixed_fee_post

      console.log("inData", inData)
      res = await supabase
      .from('influencer2')
      .update([{meta:meta_}]) 
      .eq('id', influencer_id)
      data = res.data ? res.data[0] : {}
    }*/
    
    
  }else if(action=='get_influencer_demographic'){     
    let demographic = await supabase
    .from('influencer_demographic')
    .select() 
    .eq('influencer_id', influencer_id)
    data = demographic.data[0] 
    
  }else if(action=='update_influencer_demographic'){  
    inData={age_group:[], gender:[], region:[], industry:[], meta:{}, ...inData}
    let {age_group, gender, region, industry, meta}=inData 
    
    console.log("inData:", inData)
    let check = await supabase
    .from('influencer_demographic')
    .select() 
    .eq('influencer_id', influencer_id)

    if(check.data && check.data[0]){
      let demographic_u = await supabase
      .from('influencer_demographic')
      .update([
        {age_group, gender, region, industry, meta}
      ]) 
      .eq('influencer_id', influencer_id)
      data = demographic_u.data[0] 
    }else{
      let demographic_u = await supabase
      .from('influencer_demographic')
      .insert([
        {influencer_id, age_group, gender, region, industry, meta}
      ])      
      data = demographic_u.data[0] 
    }    
    //console.log("inData", inData)    
  }
    
  console.log("Influencer Requests "+action, data)
  return data
}
