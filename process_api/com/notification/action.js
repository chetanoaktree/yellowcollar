import { supabase } from '../../../util/supabaseClient'
import business_action from '../../business/collab/action'
import fs from "fs";

export default async function  process(props) { 
  const {action, id, type, event, business_id, influencer_id, product_id, collab_id, meta} = props
  let data={} 
  let result={}
 
  console.log("action", action)
  console.log("id", id)
  console.log("business_id", business_id)
  console.log("influencer_id", influencer_id)
  console.log("product_id", product_id)
  console.log("meta", meta)
  
  
  if(action=='update_data'){    
    result = await supabase
    .from('notification')
    .update([
      {meta},
    ])
    .eq('id', id) 
    //console.log("product", product)
  }else if(action=='insert_data'){    
    result = await supabase
    .from('notification')
    .insert([
      { type, event, business_id, influencer_id, product_id, meta},
    ])    
    //console.log("product", product)
  }else if(type=='collab'){   
    result = await supabase
    .from('notification')
    .delete()
    .eq('id', id) 

    if(action=='business_accept' || action=='business_reject'){        
      business_action({action, collab_id})
    }  
    //console.log("product", product)
  }

  if(result.data && result.data[0]) {
    data=result.data[0]
  }else if(result.data) {
    data=result.data
  }
  console.log("data", data)
  return data
}
