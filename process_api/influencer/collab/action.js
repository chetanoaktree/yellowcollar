import { supabase } from '../../../util/supabaseClient'
import NotificationAction from '../../com/notification/action'
import {match_score, collab_match_percent} from '../../get/match'
import admin_actions from '../../admin/dashboard/d_actions_ap'


export default async function  process(props) { 
  let {action, influencer_id, business_id, product_id, collab_id, event_id, content, meta, inData} = props
  let status 
  let data={} 
  let collab={}
  let collab_meta={}

  console.log("props", props)
  
  
  if(collab_id){
    let collab_ = await supabase
    .from('collab')
    .select()
    .eq('id', collab_id)
    console.log("collab_", collab_id)
    collab=collab_.data ? collab_.data[0] : {meta:{}}
    collab_meta=collab.meta
  }
  
  if(action=='invite'){    
    /*let { data, error } = await supabase
    .from('collab')
    .insert([
      {status:'requested', influencer_id, business_id, product_id },
    ])
    //console.log("collab DATA", data)
    let collab_id=data[0].id
    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"request" },
    ]) */
    //let match=await match_score({influencer_id, business_id, product_id})
    let note=await collab_match_percent({influencer_id, product_id, info:true})
    let match=note.weights ? note.weights.output_2 : 0
    let request = await supabase
    .from('collab_request')
    .insert([
      {status:"pending", product_id, influencer_id,  business_id, match, note},
    ])
    console.log("action", product_id)
    let r_data=request.data ? request.data[0] : false
    if(r_data.id)   await admin_actions({admin_action:'add_action', type:'collab', action:'Request', type_id:r_data.id, meta:r_data})
    //NotificationAction({action:'insert_data', type:'collab', event:'requested', influencer_id, business_id, product_id, meta:{collab_id}})

  }else if(action=='influencer_accept'){    
    let { data, error } = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"influencer_accept" },
      {collab_id, type:"init_payment"},
    ])

    status="init_payment"       
    
  }else if(action=='influencer_reject'){ 
    let { data, error } = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"influencer_reject"},     
    ])    

    status="influencer_rejected"    
    
  }else if(action=='influencer_message'){    
    let { data, error } = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"influencer_message", content },
    ])
  }else if(action=='live'){ 
    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"live"},
      {collab_id, type:"performance_video"},
    ])
    status="live"

  }else if(action=='upload_performance_video'){
    
    let {performance_video_id, performance_video_path_} = inData
    let m = {performance_video_id}

    collab_meta={...collab_meta, performance_video_id, performance_video_path_} 

    let c = await supabase
    .from('collab')
    .update([{meta:collab_meta}])
    .eq("id", collab_id)    

    let e = await supabase
    .from('collab_event')
    .update([{meta:m}])
    .eq("id", event_id)
    data= e.data ? e.data[0] : {}

    if(collab_id) {
     // let event = await supabase
      //.from('admin_action')
      //.insert([{type:"collab", type_id:collab_id,  action:'Performance Video', meta:collab_meta}])   
      await admin_actions({admin_action:'add_action', type:"collab", type_id:collab_id,  action:'Performance Video', meta:collab_meta})
    }

  }else if(action=='completed_request'){ 
    let event = await supabase
    .from('admin_action')
    .insert([{type:"collab", type_id:collab_id,  action:'Promotion Complete', meta}])    
    status="completed_request"

  }else if(action=='completed'){ 
    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"completed"},
      {collab_id, type:"payment_details", meta},
    ])
    
    status="completed"

  }else if(action=='amount'){ 
    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"amount", meta, content},
    ])
    
    status="amount"
  }

  if(status!=''){
    let update = await supabase
    .from('collab')
    .update({ status, meta:collab_meta })
    .eq('id', collab_id)
  }
 
  let data2={
    ...data,   
  }
  console.log("response "+ action, data2)
  return data2
}
