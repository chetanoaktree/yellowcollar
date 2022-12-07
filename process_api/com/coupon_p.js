import { supabase } from '../../util/supabaseClient'
import axios from 'axios';

const get_coupon = async ({inData}) => {
  let {code}=inData
  let res = await supabase
  .from('coupon')
  .select(`*`) 
  .eq("code", code)    
  .eq("status", 'active')   
  let data=res.data ? res.data[0] : {code:''} 
  return data    
}
export default async function  process(props) {  
  let {action, inData} = props
  let data={}  
   
  if(action=='apply'){  
    let coupon = await get_coupon(props)
    let {code, _limit, usage, unit, value} = coupon ? coupon : {}
    if(code){
      if(usage < _limit){
        data={status:'active', code, unit, value}     
      }else{
        data={status:'expired'}   
      }
    }else{
      data={status:'invalid'}   
    }    
  }else if(action=='use_coupon'){  
    let coupon = await get_coupon(props)
    if(coupon && coupon.id){
      let { user_id, user_type, user_name, price, final_price} = inData
      let {id, usage} = coupon ? coupon : {}
      usage=parseInt(usage)+1

      let res = await supabase
      .from('coupon')
      .update([{usage}]) 
      .eq("id", id)         
      data=res.data ? res.data[0] : {code:''} 

      let discount =parseInt(price) - parseInt(final_price)
      let user = await supabase
      .from('coupon_user')
      .insert([{coupon_id:id,  user_id, user_type, user_name, price, final_price, discount}])  
    }
  }

  console.log("data "+action, data)  
  return data
}
