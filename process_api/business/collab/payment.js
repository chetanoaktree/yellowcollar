import { supabase } from '../../../util/supabaseClient'
import { new_commission_single } from '../../get/commission'
import shortid from 'shortid'
import pw_action from '../../com/pw/action'


export default async function  process(props) { 
  let {action, action_2, influencer_id, business_id, product_id, collab_id, amount, content, meta, platform_fee={}}=props
  let status   
  let data={} 
  let collab={}
  let collab_meta={}
  let result={}

  console.log("props", props)

  
  if(action_2=="create_temp_collab"){ 
    //console.log("action", "temp", action)
    let unique_id=shortid.generate()   
    
    let pw = await pw_action({order_id:unique_id, amount:amount, type:'collab'})
    let inData={...props}
    const tempCollab = await supabase
      .from('temp')
      .insert([
        { shortid: unique_id, status:'pending', type:'collab', meta:inData},
      ]) 
    data=tempCollab.data[0]
    data.total=amount
    data.currency='INR'
    data.token=pw.txnToken
    data.pw=pw

    console.log("create_temp_collab", data)
    return data

  }else if(action_2=="get_temp_collab"){ 
    if(props.shortid){
      const tempCollab = await supabase
        .from('temp')
        .select()
        .eq("shortid", props.shortid) 
      data=tempCollab.data[0]    
      console.log("get_temp_collab", data) 
    }
    return data
    
  }
  return data
}