import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'


const getActivity = async (items) =>{ 
  let list=[] 
  let ids = new Set([])  
  _.forEach(items, (v, k)=>{        
    ids.add(v.item_id)
  }) 
  let ids_=[...ids].join(',')
  console.log("ids_", ids_)
  let res = await supabase
  .from('order_item_activity')
  .select()     
  .filter('order_item_id', 'in', '('+ids_+')')
  .order('created_at', { ascending: true }) 

  list=res.data 
  return list
}

const saleActivity = async (items) => {
  let list=await getActivity(items)
  //console.log("list", list)
  if(list){
    _.forEach(items, (v, k)=>{            
      let res_=_.filter(list, ['order_item_id', v.item_id])    
      items[k]['activity']= res_[0] ?  res_ : []
    }) 
  }
  return items
}

const sale_received_amount=(i)=>{  
  let {price_after_discount, final_price_after_discount, platform_fee={}}=i
  
  let fp= final_price_after_discount? final_price_after_discount : price_after_discount
  let percent= platform_fee.business ? platform_fee.business : 10
  i.final_price_after_discount=fp
  i.received_amount=fp-(percent/100)*fp
  return i
}
const sale_received_amounts=(items)=>{  
  _.forEach(items, (v, k)=>{            
      if(v.order_item) v.order_item=sale_received_amount(v.order_item)  
  }) 
  return items
}

export {
  saleActivity,
  sale_received_amount,
  sale_received_amounts
}
