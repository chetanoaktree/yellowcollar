import { supabase } from '../../util/supabaseClient'
import getInfluencer from '../get/influencer'
import getBusiness from '../get/business'
import getProduct from '../get/product'



import {send_order_status_change} from '../com/email_admin'
import {saleActivity, sale_received_amounts} from '../get/sale'


const get_query =(props)=>{
 let {action, influencer_id, business_id, order_id, product_id, order_status, payment_status, product_name, business_name, influencer_name} = props 
  let query = supabase
  .from('order_item_join')
  .select(`
  *,
  order!inner(
    *,
    details:order_details(*),
    payment:order_payment!inner(*)
  ),  
  order_item!inner(*),
  influencer2(id, name, profile_pic),
  influencer:influencer_id!inner(*),
  business(id, name, profile_pic),  
  product!inner(*)
  `, { count: 'exact' })
  .eq('business_id', business_id) 
  .order('item_id', { ascending: false })
  
  //.eq('order.payment.status', 'pending')  

  if (order_id)  { query = query.eq('order_id', order_id) }
  if (order_status && order_status.value)  { query = query.ilike('order_item.status', `%${order_status.value}%`) }
  if (payment_status && payment_status.value)  { query = query.ilike('order.payment.status', `%${payment_status.value}%`) } 
    
  if (product_id)  { query = query.eq('product.id', product_id) }  
  if (influencer_id)  { query = query.eq('influencer.id', influencer_id) }    

  if (product_name)  { query = query.ilike('product.title', `%${product_name}%`) }    
  if (influencer_name)  { query = query.ilike('influencer.name', `%${influencer_name}%`) }  

  //query = query.order('created_at', { ascending: false })

  return query
}

const get_order_item = async (props)=>{
  let { order_item_id } = props 
  let res = await supabase
  .from('order_item_join')
  .select(`
  *,
  order!inner(
    *,
    details:order_details(*),
    payment:order_payment!inner(*)
  ),  
  order_item!inner(*),
  influencer2(id, name, profile_pic),
  influencer:influencer_id!inner(*),
  business(id, name, profile_pic),  
  product!inner(*)
  `)
  .eq('item_id', order_item_id) 
  let data = res.data[0] ?  res.data[0] : {}
  return data
}



export default async function  process(props) { 
  let {action, id, order_item_id, meta, status, start, end} = props 
  let data={}

  /*const avatarFile = 'https://images.pexels.com/photos/13229014/pexels-photo-13229014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  const upload = await supabase.storage
  .from('avatars')
  .upload('public/next.png', avatarFile)

  console.log("upload", upload)*/
  console.log("props", props)

  

  if(action=='get'){  
    let query =get_query(props)
    if( start && end ) { query = query.range(start-1, end-1) }  
    let sales = await query
    data=sales.data
    data=await saleActivity(data) 
    data=sale_received_amounts(data)  

  }else if(action=='get_total'){    
    let query=get_query(props)
    let sales = await query
    data=sales.count

  }else if(action=='update_activity'){
    let res = await supabase
    .from('order_item')
    .update({status, meta}) 
    .eq('id', order_item_id)

    let res2 = await supabase
    .from('order_item_activity')
    .insert({order_item_id, status, meta})      
    data=res2.data[0] 

    let order_item=await get_order_item({order_item_id})
    let send=send_order_status_change(order_item)  
    console.log("send", send)
  }

  console.log("sales Requests "+action, data)
  return data
}


/*
  let sales = await supabase
  .from('order')
  .select(`
    *,    
    influencer2(*),
    business(*),
    order_details(*),
    order_payment(*)
  `)
  .eq('business_id', business_id)
  //.neq('status', 'rejected')
  .order('created_at', { ascending: true })
*/