import { supabase } from '../../util/supabaseClient'
import {match_score} from '../get/match'
import NotificationAction from '../com/notification/action'
import { getDiscountedPrice } from '../get/order'
import influencerProductStats from '../get/influencer_product_stats'

import { productImages, typeImages } from '../get/image'

import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, type, title, name, desc, meta, slug, content, status, image, page_name, influencer_id}=props
  let data={}
  let query
  let get
  let view
  let update

  console.log("props", props) 

  if(action=='update'){     
    /*let history = await supabase
    .from('option_history')
    .insert([{key, value}]) 
    data=history.data */

  }else if(action=='get'){
    query = supabase
      .from('page')
      .select(`*`)
      .eq("name", 'shop-home')
    get = await query
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
  }else if(action=='view_full'){
    query = supabase
      .from('page')
      .select(`*`) 
      .eq("name", 'shop-home')  
    view = await query 
    data=view.data[0] 

    let banners=data.meta.banners
    
    
    await Promise.all(banners.map(async (banner, key)=>{     
      let product_= await supabase
      .from('product')
      .select(`
      *,
      business:business_id(*)
      `) 
      .eq("id", banner.product)
      let product=product_.data[0]
      product.final_price=getDiscountedPrice(product.price, product.discount)    

      //console.log("product "+key, product.data[0])
      banner.product_details=product      
      banners[key]=banner 
      //console.log("banner "+key, banner)     
    }));
    //console.log("banners ", banners)    
    data.meta.banners=banners
    data.meta.banners=await typeImages(data.meta.banners)
    data.meta.brands=await typeImages(data.meta.brands)
   
  }else if(action=='popular_products'){
    query = supabase
      .from('product')
      .select(`
      *,      
      business:business_id(*)
      `)       
      .limit(8) 
    view = await query 
    data=view.data    
    data.map(async (p, key)=>{
      p.final_price=getDiscountedPrice(p.price, p.discount)    
      return p   
    })

    data=await influencerProductStats({influencer_id, products:data })

  }else if(action=='popular_products2'){
    query = supabase
      .from('product_stats')
      .select(`
        *,
        product!inner(
          *,
          business:business_id!inner(*)
        )
      `) 
      .eq('product.status', 'published')
      .neq('product.business.from', 'dev')
      .order("views", {ascending:false})      
      .limit(8) 
    view = await query 
    data=view.data    
    data.map(async (p, key)=>{
      p.product.final_price=getDiscountedPrice(p.product.price, p.product.discount)    
      return p   
    })
    data=await influencerProductStats({influencer_id, products:data })
    data=await productImages(data)
    /*data.map(async (p, key)=>{
      p.final_price=getDiscountedPrice(p.price, p.discount)    
      return p   
    })*/

  }else if(action=='view'){
    /*if(type=="info" || type=="home"){       
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
    } */

  }else if(action=='update_view'){
    /*let {banner_image}=props
    if(type=="info" || type=="home"){       
      query = supabase
        .from('page')
        .update([{title, name, desc, content, meta}])
        .eq("id", id)
      update = await query
    }else if(type=="category"){       
      query = supabase
        .from('category')
        .update([{name, slug, desc, meta}])
        .eq("id", id)  
      update = await query     
    } 
    if(update.data) {
      data=update.data[0]  
    } */
  }
  
  
  //console.log("Pages "+action, data)
  return data
}
