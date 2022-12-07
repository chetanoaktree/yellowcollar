import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

import {
  insert_invoices
} from './m_invoice'

const generate_invoice = async({order})=>{
  let {id, influencer_id, items, details, created_at} = order
  let {s_address1, s_address2, s_city, s_country, s_state, s_postcode} = details ? details[0] : {}
  let invoices=[]    
  _.forEach(items, (v, k)=>{
    let inv=_.filter(invoices, function square(n) {
      return n.business_id==v.business_id? true : false;
    })
    let item={
      desc : v.title,
      product_id : v.product_id,
      price : v.price,
      discount : v.price - v.final_price_after_discount,
      f_price : v.final_price_after_discount,
      qty  : v.qty,
      sub_total : v.final_price_after_discount * v.qty        
    }
    if(inv && inv[0]){      
      inv[0].total = item.sub_total,
      inv[0].sub_total = item.sub_total,
      inv[0].items.push(item)
    }else{
      let invoice={
        type:'order',
        type_id:id,
        type_date:created_at,
        order_id:id,
        status:'paid',
        total:item.sub_total,
        sub_total:item.sub_total,
        business_id:v.business_id,
        influencer_id:influencer_id,
        details:{
          to_address:s_address1+', '+s_address2+', '+s_city+' - '+s_postcode+', '+s_state+', '+s_country.value,
          by_address:s_address1+', '+s_address2+', '+s_city+' - '+s_postcode+', '+s_state+', '+s_country.value,
        },
        items:[item],
      }
      invoices.push(invoice)
    }      
  })      
  let data=await insert_invoices(invoices)
  console.log("Order Items ", order)
  console.log("invoices ", invoices[0])
  return data
}

export{
  generate_invoice
}