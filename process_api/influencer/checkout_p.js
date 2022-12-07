import { supabase } from '../../util/supabaseClient'
import {get_commission_single} from '../get/commission';
import { getDiscountValue } from '../get/order'
import _ from 'lodash'

export default async function  process(props) { 
  const {action, influencer_id, product_id, items, shipping_method, payment_method, first_name, last_name, address, city, state, country, pincode, content, meta}=props
  let status 
  let data={}   
  let sub_total=0
  let shipping=0
  let isShipping=false
  let tax=0
  let platform_fee=0
  let percent=0
  let discount=0
  
  console.log('props', props)


  if(items){
    _.forEach(items, (value, key)=>{
      if(value==null) return 
      let dis=  getDiscountValue(value.price, value.discount) 
      sub_total+=(value.price-dis ) * value.qty
      discount+=dis  * value.qty    
      console.log("value",value)
    })
  }

  
  if(shipping_method.value) {
    isShipping=true   
  }
  if(shipping_method.value=='fedex') {
    shipping=30      
  }
  
  if(action=='process_shipping'){ 

    percent=await get_commission_single(influencer_id, 'platform_fee_order', 'influencer') 
    //tax=Math.round((sub_total*18)/100)
    tax=0
    platform_fee=Math.round((percent*sub_total)/100)    
    data.processed=true 
    data.shipping_porcessed=true 
    data.meta={
      platform_fee_order:percent 
    }  
    data.percent=percent  
    data.platform_fee=platform_fee
    data.sub_total=sub_total 
    data.tax=tax
    data.discount=discount 
    data.shipping=shipping   
    
    data.total=sub_total + shipping 

    //if(data.platform_fee) data.total+= data.platform_fee 
    if(data.tax) data.total+= data.tax 
    
    data.isShipping=isShipping 
  }
 
  return data
}
