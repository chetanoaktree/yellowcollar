import { supabase } from '../../../util/supabaseClient'
import { new_commission_single } from '../../get/commission'


export default async function  process({action, influencer_id, business_id, product_id, collab_id, amount, content, meta, ...props}) { 
 
  let data={}   

  console.log("props", props)
  console.log("collab_id", collab_id)
  console.log("influencer_id", influencer_id)
  console.log("business_id", business_id)
  
  if(action=='init_payment'){    
    /*let { data, error } = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"business_accept" },
    ]) */      
    data={init_payment:123}
  }
  
  return data
}
