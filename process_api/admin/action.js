import { supabase } from '../../util/supabaseClient'
import getTresholds from '../get/tresholds'
import _ from 'lodash'

export default async function  process(props) { 
  let {action, match, id, influencer_id, business_id, product_id, performance_id, collab_id, content, meta, inData}=props
  let status     
  let collab_meta={}  
  let tresholds=[]
  let items=[]
  let out
  let treshold_ids = new Set([])
  let insert=false 
  let insertD={}  
  console.log("inData", inData)

  if(action=='get_collabs'){     
    let collabs = await supabase
    .from('collab')
    .select(`
    *,
    influencer2(*),    
    business(*),
    product(*),
    collab_performance:performance_id(*)
    `) 
    .order('created_at', { ascending: true })

    items=collabs.data    
    tresholds=await getTresholds(items)
    console.log("tresholds", tresholds)
    out={items, tresholds}
    
  }else if(action=='get_influencer_demographic'){     
    let demographic = await supabase
    .from('influencer_demographic')
    .select() 
    .eq('influencer_id', influencer_id)
    out = demographic.data[0] 
    
  }else if(action=='update_influencer_demographic'){   
    let {age_group, gender, region, industry, influencer_id}=inData  
    let demographic_u = await supabase
    .from('influencer_demographic')
    .update([
      {age_group, gender, region, industry}
    ]) 
    .eq('influencer_id', influencer_id)
    out = demographic_u.data[0] 
    
  }else if(action=='update_match'){ 
    let collabs = await supabase
    .from('collab')
    .update({ 'match': match })
    .eq('id', collab_id) 
    out = collabs.data 
    
  }else if(action=='update_performance'){ 
    console.log("props", props)
    let {click_through, conversions, engagement, impressions, followers}=props
    if(performance_id){
      let performance = await supabase
      .from('collab_performance')
      .update({ click_through, conversions, engagement, impressions, followers})
      .eq('id', performance_id)
      out = performance.data[0]       
    }else{
      let {data, error} = await supabase
      .from('collab_performance')
      .insert({ click_through, conversions, engagement, impressions, followers}) 
      out = data
      insertD=data[0]
      insert=true   
      console.log("collab_performance", data)  
    }
    
    if(insert && insertD){
      let collab = await supabase
      .from('collab')
      .update({ performance_id: insertD.id })
      .eq('id', collab_id) 
     
    }

  }else if(action=='update_influencer'){ 
    console.log("props", props)
    let {click_through, conversions, engagement, impressions, followers}=props
    if(id){
      let performance = await supabase
      .from('influencer_treshold')
      .update({ click_through, conversions, engagement, impressions, followers})
      .eq('id', id)       
    }else{
      let {data, error} = await supabase
      .from('influencer_treshold')
      .insert({ click_through, conversions, engagement, impressions, followers}) 
      out = data
      insertD=data[0]
      insert=true   
      console.log("collab_performance", data)  
    }   
    if(insert && insertD){
      let collab = await supabase
      .from('influencer2')
      .update({ treshold_id: insertD.id })
      .eq('id', influencer_id) 
    }

  }else if(action=='update_weights'){    
   
  }else if(action=='share_link'){      

  }
  /*
  if(status!=''){
    let update = await supabase
    .from('collab')
    .update({ status, meta:collab_meta})
    .eq('id', collab_id)
  }
  */    
  //console.log("out", out)
  return out
}
