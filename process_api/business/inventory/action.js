import { supabase } from '../../../util/supabaseClient'
import fs from "fs";
import _ from 'lodash'

import { update_stats_product } from '../../_model/m_product'
import { update_product_units } from '../../get/inventory'
import { productImages, delete_image } from '../../get/image'
import { map_stats } from '../../get/product'
import admin_actions from '../../admin/dashboard/d_actions_ap'
import { get_product_defined } from '../../get/product_defined'

const UpdateCategories = async (id, categories) =>{
  let remove_categories_=[]
  let categories_=[]

   let cat = await supabase.from('product_cat')
    .select(`*`)
    .eq('product_id', id)

  _.forEach(categories, (v, index)=>{
    //console.log("v", v, index)
    let ind =_.find(cat.data, function(n) {
        console.log("find", n)
        if(n.cat_id==v.value) return true
    });
    //console.log("ind", v.value, ind)
    if(ind && ind.id){
      remove_categories_.push({cat_id:v.value})
    }else{
      categories_.push({product_id:id, cat_id:v.value})        
    }     
  })

  if(categories_.length){
    let cat_inserted = await supabase.from('product_cat')
    .insert(categories_) 
    //console.log("CAT_INSERTED", cat_inserted.data)
  }
  if(remove_categories_.length){
    let cat_deleted = await supabase.from('product_cat')
    .delete(remove_categories_) 
    //console.log("CAT_DELETED", cat_deleted.data)
  }
}



export default async function  process(props) {
  let {action, id, business_id, categories, product_id, parent_id, title, sku, price, discount, discountUnit, description, img, image_id, meta={}, stats={}, campaign, extra} =props
  let status   
  let data={} 
  let items=[]
  let product={}
  let p_campaign={}
  let p_extra={}
  let p_stats={}
  let result={}
  if(discountUnit && discountUnit.value=="%"){
    discount=discount.replace("%", "").trim(); 
    discount=discount+'%'
  }
  /*console.log("action", action)
  console.log("business_id", business_id)
  console.log("id", id)
  console.log("sku", sku)
  console.log("description", description) 
  console.log("discount", discount)
  console.log("discountUnit", discountUnit) 
  console.log("img", img) */
  console.log("props", props)
  if(action=='save_data'){  
    let {available_units}=stats ? stats : {available_units:0}
    product = await supabase
    .from('product')
    .update([
      {business_id,  title, sku, description, price, discount, categories, meta},
    ])
    .eq('id', id) 
    .eq('business_id', business_id)

    data= product.data ? product.data[0] : {}
    let for_admin_action=data

    //Update Categories
    UpdateCategories(id, categories)

    p_campaign = await supabase
    .from('product__campaign')
    .select(`*`) 
    .eq('product_id', id)  

    if(p_campaign.data[0]){
      p_campaign = await supabase
      .from('product__campaign')
      .update([
        {meta:campaign},
      ]) 
      .eq('product_id', id)  
    }else{
      p_campaign = await supabase
      .from('product__campaign')
      .insert([
        {product_id:id, meta:campaign},
      ])      
    }

    await update_stats_product({product_id:id, stats:{available_units}})

    if(parent_id!='' && parent_id!=null){
      let variation = await supabase
      .from('product')
      .select(`
        *,
        stats:product_stats(*),
        attributes:product_attribute(*)
      `)
      .eq('id', id)  
      data=variation.data ? variation.data[0] : {}
      data=map_stats(data)        
    }else{
      data=await get_product_defined({id, business_id}) 
    }
    

    p_extra = await supabase
    .from('product__extra')
    .select(`*`) 
    .eq('product_id', id)  

    if(p_extra.data[0]){
      p_extra = await supabase
      .from('product__extra')
      .update([
        {...extra},
      ]) 
      .eq('product_id', id)  
    }else{
      p_extra = await supabase
      .from('product__extra')
      .insert([
        {product_id:id, ...extra},
      ])      
    }
    //data=p_campaign.data[0]  
    if(id)   await admin_actions({admin_action:'add_action', type:'product', action:'Update', type_id:id, meta:for_admin_action}) 

  }else if(action=='new_data'){    
    product = await supabase
    .from('product')
    .insert([
      {business_id, title, sku, description, price, discount, categories, meta},
    ])  
    data= product.data ? product.data[0] : {}
    UpdateCategories(data.id, categories)   
    
    //console.log("product", product)
  }else if(action=='delete_data'){ 
    result = await supabase
    .from('product_cat')
    .delete()  
    .eq('product_id', id) 

    result = await supabase
    .from('product__extra')
    .delete()  
    .eq('product_id', id) 

    result = await supabase
    .from('product__campaign')
    .delete()  
    .eq('product_id', id)   
    
    result = await supabase
    .from('product')
    .delete()  
    .eq('id', id)   

    result = await supabase
    .from('temp_product')
    .update([
      {product_id:null},
    ]) 
    .eq('product_id', id)  
    console.log("result", result)

  }else if(action=='get_images'){    
    items = await supabase
    .from('product_image')
    .select() 
    .eq('product_id', product_id) 

    items.data=await productImages(items.data)

  }else if(action=='get_categories'){    
    items = await supabase
    .from('category')
    .select()  
    .eq('status', 'published')   

  }else if(action=='delete_image'){    

    delete_image({image_id})

    result = await supabase
    .from('product_image')
    .delete() 
    .eq('id', id)     
    console.log("result", result)
    fs.unlink("./public/products/"+img, ()=>console.log("file_deleted"))

  }else if(action=='product_influencers'){    
    result = await supabase
    .from('product_influencer')
    .select() 
    .eq('product_id', id) 
  }
  
  if(items.data) {
    data=items.data
  }else if(result.data) {
    data=result.data
  }
  console.log("data", data)
  return data
}
