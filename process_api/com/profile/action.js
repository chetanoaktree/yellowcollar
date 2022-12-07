import { supabase } from '../../../util/supabaseClient'
import admin_actions from '../../admin/dashboard/d_actions_ap'

import { get_product_prices, productImages} from '../../get/product'
import { get_image} from '../../get/image'

import { update_meta_influencer} from '../../_model/m_influencer'


import axios from 'axios';

const check_fixed_fee_change = async (props)=>{
  let {inFixed, data, influencer_id} =props
  let {meta} =data
  let change=false
  let newMeta={...inFixed}
  if(!meta.fixed_fee_story || meta.fixed_fee_story=='') return inFixed
  if(inFixed.fixed_fee_story != meta.fixed_fee_story) {
    change=true
    delete inFixed.fixed_fee_story
  }
  if(inFixed.fixed_fee_reel != meta.fixed_fee_reel) {
    change=true
    delete inFixed.fixed_fee_reel
  }
  if(inFixed.fixed_fee_video != meta.fixed_fee_video) {
    change=true
    delete inFixed.fixed_fee_video
  }
  if(inFixed.fixed_fee_post != meta.fixed_fee_post) {
    change=true
    delete inFixed.fixed_fee_post
  }
  if(change==true) await admin_actions({admin_action:'add_action', type:'influencer', action:'update_fee', type_id:influencer_id, meta:{newMeta, oldMeta:meta}})
  return inFixed
}
    
const get_influencer = async(props) =>{
  let {influencer_id} = props
  let ret
  let user = await supabase
  .from('influencer2')
  .select(`
  *,
  details:details_id(*),
  influencer2_details:details_id(*)
  `) 
  .eq("id", influencer_id)
  ret=user.data ? user.data[0] : {}
  if(ret.id){
      ret.admin_action = await admin_actions({admin_action:'get_action', type:'influencer', action:'update_fee', type_id:influencer_id})
  }
  ret.image=await get_image(ret)
  return ret
}

export default async function  process(props) {  
  let {action, name, company_name, influencer_id, business_id, data, inFixed, meta, image_id, details, details_id, inData} = props
  let data2={} 

  console.log("Props ", props)

   

  if(action=='update_meta'){  
    let user = await supabase
    .from('influencer2')
    .update([{meta:meta}]) 
    .eq("id", influencer_id)
    data2=user.data[0]
    //console.log("User", user)

  }else if(action=='get_influencer'){  
    
    data2=await get_influencer(props)
   
    //console.log("User", user)

  }else if(action=='get_collabs'){  
    let collab = await supabase
    .from('collab')
    .select(`
    *,
    business(*)
    `) 
    .eq("influencer_id", influencer_id)
    data2=collab.data
    console.log("collab", collab)

  }else if(action=='get_business'){  
    let user = await supabase
    .from('business')
    .select(`
    *,
    details:details_id (*)
    `) 
    .eq("id", business_id)
    data2=user.data[0]
    data2.image=await get_image(data2)
    console.log("User", user)

  }else if(action=='get_business_products'){  
    let products = await supabase
    .from('product')
    .select(`
    *
    `) 
    .eq("business_id", business_id)
    data2=products.data
    data2=get_product_prices(data2)
    data2 =await productImages(data2)
    //console.log("products", data2)

  } else if(action=='get_business_collabs'){  
    let collab = await supabase
    .from('collab')
    .select(`
    *,
    influencer2(*)
    `) 
    .eq("business_id", business_id)
    data2=collab.data
    console.log("collab", collab)

  }else if(action=='update_influencer'){ 
    let {name, image_id, profession, description} =data
    if(data.meta.accessToken){
      const fb2 = await axios({       
        url: "https://graph.facebook.com/v14.0/me/accounts?access_token=" + data.meta.accessToken,
        //url: "https://graph.facebook.com/v14.0/oauth/client_code?client_id=1194804817999553&client_secret=cd8e036889b13ccc7013f7de5b37f215&access_token=" + data.meta.accessToken,
        
        method: "get",
      });

      if(fb2.data) data.meta.long_accessToken=fb2.data.data[0].access_token
      //console.log("fb2",  fb2.data.data[0].access_token)
    }  
    inFixed=await check_fixed_fee_change(props)   
    data.meta={...data.meta, ...inFixed}
    if(data.admin_action) delete data.admin_action
    let toData={name, image_id, profession, description, meta:data.meta}
    let update = await supabase
    .from('influencer2')
    .update([toData]) 
    .eq("id", influencer_id)
    //data2=update.data
    console.log("update", update)

    if(details && details.id ){ 
      let {address1, address2, city, country, postcode, desc }=details
      let update2 = await supabase
      .from('influencer2_details')
      .update([{address1, address2, city, country, postcode,desc}]) 
      .eq("id", details.id)
      //data2=update.data
      console.log("details", update2)   
    } 

    ////data2=await get_influencer({influencer_id})
    
    
    /*
    const fb3 = await axios({       
      //url: "https://graph.facebook.com/v14.0/me/accounts?access_token=" + data.meta.accessToken,
      url: "https://graph.facebook.com/v14.0/oauth/client_code?client_id=1194804817999553&client_secret=cd8e036889b13ccc7013f7de5b37f215&access_token=" + fb2.data.data[0].access_token,
      
      method: "get",
    });
    console.log("fb3", fb3.data)*/

  } else if(action=='update_business'){ 
   
    let update = await supabase
    .from('business')
    .update([{name, company_name, image_id, meta}]) 
    .eq("id", business_id)
    //data2=update.data
    console.log("update", update)

    data2=update.data[0]

    if(details && details.id ){ 
      let {desc} = details    
      let update2 = await supabase
      .from('business_details')
      .update({desc}) 
      .eq("id", details.id)
      //data2=update.data
      console.log("details", update2)      
    }
   

    
    
    
    /*
    const fb3 = await axios({       
      //url: "https://graph.facebook.com/v14.0/me/accounts?access_token=" + data.meta.accessToken,
      url: "https://graph.facebook.com/v14.0/oauth/client_code?client_id=1194804817999553&client_secret=cd8e036889b13ccc7013f7de5b37f215&access_token=" + fb2.data.data[0].access_token,
      
      method: "get",
    });
    console.log("fb3", fb3.data)*/

  } else if(action=="upload_insights_video"){
    let {insights_video_id, insights_video_path_} = inData
    data2 = await update_meta_influencer({id:influencer_id, meta:{insights_video_id, insights_video_path_}})
  }

  console.log("data "+action, data2)  
  return data2
}
