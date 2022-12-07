import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

const get_invoice_map = (v) =>{
 let details=v.details[0] ? v.details[0] : {} 
  delete details.id  
  v={...v, ...details}   
  delete v.details
  return v
}

const get_invoice = async ({id, select=''}) => {
  let data={}
  if(!id) return data
  select = select!='' ? select : `
    *,
    items:invoice_item(
      *,
      product:product_id(title, image_id)
    ),
    details:invoice_details(*),
    influencer:influencer_id(name, image_id, email),
    business:business_id(name, company_name, image_id, email)   
  `
  let inv = await supabase
  .from('invoice')
  .select(select) 
  .eq("id", id)  
  data=inv.data ? inv.data[0] : {} 
  data=get_invoice_map(data)
  console.log("get inv", data) 
  return data
}
const insert_invoice_items = async ({invoice_id, items}) => { 
  _.forEach(items,  (v, k)=>{
    v.invoice_id=invoice_id
  })
  let data=[]
  let res = await supabase
  .from('invoice_item')
  .insert(items)   
  data=res.data ? res.data : []
  console.log("insert inv Items", data) 
  return data
}
const insert_invoice_details = async ({invoice_id, details}) => { 
  details.invoice_id=invoice_id
  let data=[]
  let res = await supabase
  .from('invoice_details')
  .insert(details)   
  data=res.data ? res.data : []
  console.log("insert inv details", data) 
  return data
}
const insert_invoice = async (i) => {
  let {type, type_id, type_date, order_id, sub_total, tax, total, status, business_id, influencer_id, items=[], details={}} = i
  let data={}  
  let inv = await supabase
  .from('invoice')
  .insert({type, type_id, type_date, order_id, sub_total, tax, total, status, business_id, influencer_id})   
  data=inv.data ? inv.data[0] : {} 

  let inv_items = await insert_invoice_items({invoice_id:data.id, items})
  let inv_details = await insert_invoice_details({invoice_id:data.id, details})
  return data
}
const insert_invoices = async (items) => {
  await _.forEach(items, async(v, k)=>{
    await insert_invoice(v)
  })  
  let data={} 
  return data
}


export{
  get_invoice,
  insert_invoice,
  insert_invoices
}