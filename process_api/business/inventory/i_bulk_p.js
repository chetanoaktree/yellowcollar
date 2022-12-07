import { supabase } from '../../../util/supabaseClient'
import fs from "fs";
import _ from 'lodash'

import {range} from '../../get/pagination'
import {upload_url_file} from '../../get/ik_upload'
import {for_upsert} from '../../get/query'

const google_drive_to_image = ({image_url}) => {  
  //image_url='https://drive.google.com/file/d/1pE_1iMTzTEbtOgg-5bxfxTZ3Gaj1G7CT/view?usp=sharing'
  //image_url='https://drive.google.com/u/0/uc?id=1pE_1iMTzTEbtOgg-5bxfxTZ3Gaj1G7CT&export=download'

  const personList2 = `https://drive.google.com/file/d/pE_1iMTzTEbtOgg-5bxfxTZ3Gaj1G7CT/, Last_Name: Doe First_Name: Jane, Last_Name: Smith`;
  const regexpNames2 =  /https:\/\/drive.google.com\/file\/d\/([a-zA-Z0-9-_]*)\//mg;
  //https://drive.google.com/file/d/1pE_1iMTzTEbtOgg-5bxfxTZ3Gaj1G7CT/view?usp=sharing
  //const m=personList2.matchAll(regexpNames2)
  let m=[]
  for (const match of image_url.matchAll(regexpNames2)) {
    if(match[1]) m.push(match[1])
    console.log(`Captured Image ${match[0]} ${match[1]}`);
  }
  console.log('Captured Image', m);
  let image_id=(m && m[0]) ? m[0] : ''
  if(image_id!='') image_url=`https://drive.google.com/u/0/uc?id=${image_id}&export=download`
  return image_url
}


var XLSX = require("xlsx");
const get_product = (business_id, row) => {
  let {sku, parent_sku, title, desc, price, image_url, discount, available_units, categories, attr1name, attr1value, attr2name, attr2value, industry, age_group, gender, industry_w, age_group_w, gender_w} = row
  let meta={
    industry,
    age_group,
    gender,
    industry_w,
    age_group_w,
    gender_w
  }
  //const categories_ = categories.split(",");
  return({
    business_id,
    sku,
    parent_sku,
    title,
    desc,
    price,
    discount,
    image_url,
    available_units,
    categories,
    attr1name,
    attr1value,
    attr2name,
    attr2value,
    status:'new',
    meta
  });
}
const get_products = ({products, business_id}) => {
  if(!products) return false 
  if(!products.length) return false
  const rows = products.map(row => {    
    return get_product(business_id, row)
  })
  console.log("rows", rows)
  return rows
}

const get_inv_skus = (items) =>{  
  let ids=_.map(items, function square(n) {
    let o = n    
    return o.sku ? o.sku : false;
  })
  ids=_.filter(ids, function square(n) {
    return n ? true : false;
  })
  ids='"'+[...ids].join('","')+'"'   
  console.log("skus", ids)
  return ids
}
const getProducts = async (items) =>{ 
  let ids=get_inv_skus(items)    
  let res = await supabase
  .from('product')
  .select()     
  .filter('sku', 'in', '('+ids+')') 
  //console.log("products", res)
  let list=res.data ? res.data : []
  return list
}
const getTempProducts = async (items) =>{ 
  let ids=get_inv_skus(items)    
  let res = await supabase
  .from('temp_product')
  .select()     
  .filter('sku', 'in', '('+ids+')') 
  //console.log("products", res)
  let list=res.data ? res.data : []
  return list
}

const get_query = (props) =>{
  let {action, business_id} = props
  let switch_=props.switch ? props.switch : false
  let query = supabase
  .from('temp_product')
  .select(`
    *
  `, { count: 'exact' })
  .eq('business_id',business_id)  
  .filter("parent_sku","is", null);
  

  if(switch_ && switch_.value) {
    if(switch_.value=='not_added'){
      query=query.neq('status', 'added')
    }else{
      query=query.eq('status', switch_.value)
    }    
  }
  query=query.order('created_at', { ascending: false })
  //console.log("QUERY", query)
  return query
}
const getVariations = async (items, business_id) =>{
  let ids=get_inv_skus(items) 
   
  console.log("Variation Products ids", ids)
  
  let res = await supabase
  .from('temp_product')
  .select(`
    *
  `)
  .eq('business_id', business_id)       
  .filter('parent_sku', 'in', '('+ids+')') 
  let list = res.data  ? res.data : []
  if(list){
    _.forEach(items, (v, k)=>{
      let variations=_.filter(list, ['parent_sku', v.sku])
      variations = variations ?  variations : [] 
      v.variations=variations 
    }) 
  }
  return items
}

const get_temp_fields = (inData) =>{ 
  let {id, sku, parent_sku, title, desc, price, image_url, discount, available_units, business_id, 
    new_changes, rejected_changes, product_id, attr1name, attr1value, attr2name, attr2value  } = inData   
  let ret={id, sku, parent_sku, title, desc, price, image_url, discount, available_units, business_id, 
    new_changes, rejected_changes, product_id, attr1name, attr1value, attr2name, attr2value  }
  return ret
}
const get_fields = (inData) =>{ 
  let {parent_id, sku, parent_sku, title, desc, price, image_id, discount, available_units, business_id} = inData 
  let meta = {available_units}   
  let ret={parent_id, sku, parent_sku, title, price, image_id, description:desc, discount, business_id, meta}
  return ret
}
const get_attributes = (inData, data) =>{ 
  let {attr1name, attr1value, attr2name, attr2value} = inData 
  let {id} = data 
  let ret=[]
  if(attr1name!='' && attr1name!=null) ret.push({product_id:id, attribute:attr1name, value:attr1value})
  if(attr2name!=''&& attr2name!=null) ret.push({product_id:id, attribute:attr2name, value:attr2value})
  return ret
}

const getinv = async (inData) =>{ 
  let {sku, product_id, business_id} = inData   
  let res = await supabase
  .from('product')
  .select(`*`) 
  .eq('id', product_id)
  .eq('business_id', business_id)
  let data=res.data ? res.data[0] : {} 
  console.log("product G", data)
  return data
}
const getTemp = async (inData) =>{ 
  let {id, business_id} = inData   
  let res = await supabase
  .from('temp_product')
  .select() 
  .eq('id', id)
  .eq('business_id', business_id)  
  let data=res.data ? res.data[0] : {} 
  console.log("product T", res)
  return data
}
const add2inv = async (inData) =>{ 
  let fields = get_fields(inData)  
  let res = await supabase
  .from('product')
  .insert([fields]) 
  let data=res.data ? res.data[0] : {} 

  let attributes = get_attributes(inData, data) 
  console.log("attributes", attributes)    
  
  let attr = await supabase
  .from('product_attribute')
  .insert(attributes)   
  console.log("attr", attr)   

  console.log("product N", res)
  return data
}
const update2inv = async (inData) =>{ 
  let {product_id, business_id} = inData   
  let fields = get_fields(inData)    
  let res = await supabase
  .from('product')
  .update([fields]) 
  .eq('id', product_id)
  .eq('business_id', business_id)
  let data=res.data ? res.data[0] : {} 

  let attributes = get_attributes(inData, data)  
  console.log("attributes", attributes)  

  let fors = await supabase
  .from('product_attribute')
  .select()
  .eq('product_id', product_id)
  let fors_=fors.data ? fors.data : []
  console.log("fors_", fors_)  

  let {forU, forI} = for_upsert({items:attributes, data:fors_, id_key:'id', compare_key:'attribute'}) 

  let foru = await supabase
  .from('product_attribute')
  .upsert(forU)
  let foru_=foru.data ? foru.data : []
  console.log("foru_", foru_)  

  let fori = await supabase
  .from('product_attribute')
  .upsert(forI)
  let fori_=fori.data ? fori.data : []
  console.log("fori_", fori_) 


  /*let attr = await supabase
  .from('product_attribute')
  .insert(attributes)   
  console.log("attr", attr) */  

  console.log("product U", res, fields)
  return data
}
const updateItem = async ({id, inData, business_id}) => {
  let res = await supabase
  .from('temp_product')
  .select(`*`)
  .eq('id',id)
  .eq('business_id',business_id)
  let rd=res.data ? res.data[0] : {}

  let temp_fields = get_temp_fields(inData)

  if(rd.image_url!=temp_fields.image_url){
    temp_fields.image_id=''
    temp_fields.image_path_=''
  }
  
  res = await supabase
  .from('temp_product')
  .update([{...temp_fields, status:'updated'}])
  .eq('id',id)
  .eq('business_id',business_id)
  let data=res.data ? res.data[0] : {}  
  return data
}

export default async function  process(props) {
  let {action, id, business_id, start, end, inData} = props
  let data={}
  console.log("props", props)

  if(action=='get'){  
    let query =get_query(props)
    query = range(query, props)  
    let res = await query
    data=res.data ? res.data : [] 

    await getProducts(data) 
    data=await getVariations(data, business_id) 

    //console.log("get", props)

  }else if(action=='get_total'){      
    let query =get_query(props)    
    let res = await query
    data=res.count ? res.count : 0
    //console.log("get", props)

  }else if(action=='add2inv'){  
    let product=await add2inv(inData)
    let res = await supabase
    .from('temp_product')
    .update([{status:'added', product_id:product.id}])
    .eq('id',id)
    .eq('business_id',business_id)
    data=res.data ? res.data[0] : {}     

  }else if(action=='update2inv'){ 
    let prod
    let get_inv=await getinv(inData)
    if( get_inv && get_inv.id) {
      prod=await update2inv(inData)
      console.log("INV product u", prod)
    }else{
      prod=await add2inv(inData)
      console.log("INV product a", prod)
    }    
    if(prod){
      let res = await supabase
      .from('temp_product')
      .update([{status:'added', product_id:prod.id}])
      .eq('id',id)
      .eq('business_id',business_id)
      data=res.data ? res.data[0] : {}  
    }else{
      data=inData
    }

  }else if(action=='update_item'){      
    data=await updateItem ({id, inData, business_id})

  }else  if(action=='products_upload2'){    
    let product_=get_products(props)
    if(product_){
       let res = await supabase
      .from('temp_product')
      .insert(product_)     
      data=res.data ? res.data : []    
    }
  }else if(action=='products_upload'){    
    let product_=get_products(props)
    let ids=get_inv_skus(product_) 
    let temp_products=await getTempProducts(product_)
    let temp_skus=_.map(temp_products, function square(n) {      
      return n.sku
    })
    let new_products=_.filter(product_, function square(n) {
      let includes = _.some(temp_products, {sku:n.sku})       
      return !includes
    })
    let update_products=_.filter(product_, function square(n) {
      let includes = _.some(temp_products, {sku:n.sku})         
      return includes
    })
    let update_products_data=_.map(update_products, function square(n) {     
      let find = _.find(temp_products, {sku:n.sku})  
      console.log("find", find)     
      return {id:find.id, status:'new_changes', new_changes:n}
    })
    //console.log("product_", product_)   
    //console.log("temp_products", temp_products)   
    //console.log("temp_skus", temp_skus)  
    //console.log("new_products", new_products)     
    //console.log("update_products", update_products)
    console.log("update_products_data", update_products_data)
    let res = await supabase
    .from('temp_product')
    .upsert(update_products_data)     
    data=res.data ? res.data : []
    console.log("updated_products", data)

    if(new_products){
       let res = await supabase
      .from('temp_product')
      .insert(new_products)     
      data=res.data ? res.data : []
      
      //.not('sku', 'in', '('+ids+')') 
      //.filter('sku', 'in', '('+ids+')')  
    } 

  }else if(action=='download_image'){
    let {id, image_url}=inData    
    let res = await supabase
    .from('temp_product')
    .select(`id, image_id`) 
    .eq("id", id)    
    data=res.data ? res.data[0] : {}
    console.log("download_image r1 "+id, data)
    if(data && data.id && ( data.image_id=='' || data.image_id==null)){
      image_url=google_drive_to_image({image_url})
      let ik= await upload_url_file({file:image_url, folder:'temp_upload'})
      console.log("download_image IK "+id, ik)
      if(ik && ik.fileId)   {
        let res = await supabase
        .from('temp_product')
        .update({image_id:ik.fileId, image_path_:ik.url}) 
        .eq("id", id)    
        data=res.data ? res.data[0] : {}
        console.log("download_image res "+id, res)
      }
    }
    
  }else  if(action=='approve_new_changes'){ 
    console.log("new_changes", inData.new_changes)
    let temp_product = await getTemp(inData)
    //let change_product= get_product({business_id, ...inData.new_changes})
    let d={...temp_product, ...inData.new_changes}
    if(inData.new_changes.image_url!=temp_product.image_url){
      d.image_id=''
      d.image_path_=''
    }
    console.log("temp_product", temp_product)
    console.log("d", d)
    let res = await supabase
    .from('temp_product')
    .update([{...d, new_changes:{}, status:'updated'}])
    .eq('id', id)
    .eq('business_id',business_id)
    data=res.data ? res.data[0] : {} 
  }else  if(action=='reject_new_changes'){     
    let res = await supabase
    .from('temp_product')
    .update([{new_changes:{}, rejected_changes:inData.new_changes, status:'new'}])
    .eq('id', id)
    .eq('business_id',business_id)
    data=res.data ? res.data[0] : {} 
  }


  
  if(action=='products_upload_bk'){   

    var wb = XLSX.readFile(uploaded_file.server_path);
    var json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
    console.log("wb ", wb)

    let meta={
      json,
      uploaded_file
    }

    let res = await supabase
    .from('bulk_product_upload')
    .insert([{business_id, meta, status:'pending'}])
    data=res.data ? res.data[0] : {}
  }
  console.log("data "+action, data)
  return data
}


/*
let res = await supabase
.from('temp_product')
.upsert([{id: 122, new_changes:'new_change12'}, {id: 123, new_changes:'new_change12'}])  
*/
