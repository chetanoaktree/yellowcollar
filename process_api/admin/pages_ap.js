import { supabase } from '../../util/supabaseClient'
import {match_score} from '../get/match'
import NotificationAction from '../com/notification/action'
import _ from 'lodash'

import { typeImages, get_image} from '../get/image'

export default async function  process(props) { 
  let {action, id, type, title, name, desc, meta, slug, content, status, image, banner_image, page_name}=props
  let data={}
  let query
  let get
  let view
  let update

  console.log("props", props) 

  if(action=='update'){     
    let history = await supabase
    .from('option_history')
    .insert([{key, value}]) 
    data=history.data 

  }else if(action=='get'){
    if(type=="info" || type=="home"){       
      query = supabase
        .from('page')
        .select(`*`)
        .eq("type", type)
      get = await query
    }else if(type=="category"){       
      query = supabase
        .from('category')
        .select(`*`)   
        .order('name', { ascending: true })
      get = await query     
    }
    //.eq("type", "collab_payment")   
    /*
    //if (order_id)  { query = query.eq('order_id', order_id) }
    if (collab_status && collab_status.value)  { query = query.ilike('status', `%${collab_status.value}%`) }  
    if (influencer_name)  { query = query.ilike('influencer.name', `%${influencer_name}%`) }  
    if (influencer_id)  { query = query.eq('influencer.id', influencer_id) }    
    if (product_name)  { query = query.ilike('product.title', `%${product_name}%`) }  
    if (product_id)  { query = query.eq('product.id', product_id) } */ 
    if(get.data) {
      data=get.data   
    } 

  }else if(action=='view'){
    if(type=="info" || type=="home"){       
      query = supabase
        .from('page')
        .select(`*`)
        .eq("id", id)        
      view = await query
    }else if(type=="category"){       
      query = supabase
        .from('category')
        .select(`*`) 
        .eq("id", id)  
      view = await query     
    } 
    if(view.data) {
      data=view.data[0]  
    } 

  }else if(action=='update_view'){
    let {banner_image}=props
    if(type=="info" || type=="home"){       
      query = supabase
        .from('page')
        .update([{title, name, desc, content, meta}])
        .eq("id", id)
      update = await query
    }else if(type=="category"){       
      query = supabase
        .from('category')
        .update([{name, slug, desc, image, banner_image, meta}])
        .eq("id", id)  
      update = await query     
    } 
    if(update.data) {
      data=update.data[0]       
    } 
  }
  if(data.meta){
    console.log("Pages "+action, data.meta)
    if(data.meta.banner_image) data.meta.banner_image.image=await get_image(data.meta.banner_image)
    if(data.meta.banners) data.meta.banners=await typeImages(data.meta.banners)
    if(data.meta.brands) data.meta.brands=await typeImages(data.meta.brands) 
  }
    
  
  console.log("Pages "+action, data)
  return data
}
