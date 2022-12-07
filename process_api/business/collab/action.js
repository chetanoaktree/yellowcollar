import { supabase } from '../../../util/supabaseClient'
import { new_commission_single } from '../../get/commission'
import { earningsStats } from '../../get/influencer_stats'

import shortid from 'shortid'




export default async function  process(props) { 
  let {action, influencer_id, business_id, product_id, collab_id, amount, content, meta={}, platform_fee={}, inData}=props
  let status=''   
  let data={} 
  let collab={}
  let collab_meta={}
  let result={}

  console.log("props", props)
  //console.log("influencer_id", influencer_id)
  
  if(action=='paid' || action=='init_payment_paid' ){
    if(props.shortid){
      let shortid_=props.shortid
      const tempOrder = await supabase
        .from('temp')
        .update([{status:'completed'}])
        .eq("shortid", shortid_)        
    }
  }

  if(collab_id!=''){
    let collab = await supabase
    .from('collab')
    .select()
    .eq('id', collab_id)
    console.log("collab", collab)
    collab=collab.data ? collab.data[0] : {meta:{}}
    collab_meta=collab.meta
  }

 if(action=='business_accept'){    
    let { data, error } = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"business_accept" },
    ])

    status="business_accepted"    
    
  }else if(action=='reject' || action=='business_reject'){ 
   
    status="business_rejected"    
    
  }else if(action=='collab_again'){  
    let collab = await supabase
    .from('collab')
    .insert([
      {status:'business_accepted', influencer_id, business_id, product_id },
    ])

    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id:collab.data[0].id, type:"business_accept" },
    ])
    data=collab.data[0]
    //console.log("collaby", collab)
    
  }else if(action=='collaborate'){    
    let { data, error } = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"collaborate", meta:meta },
    ])
    collab_meta={...collab_meta, ...meta}
    status="collaborate"    
    
  }else if(action=='init_payment_paid'){ 
    
    let short_code='3vnRIoY'
    collab_meta={...collab_meta, short_code}  
   

    let payment = await supabase
      .from('collab_payment')
      .insert([
        {collab_id, status:'pending', amount, mode:props.method, transaction_id:'xsd123fd', meta, platform_fee },
      ]) 

    
    let pdata= payment.data ? payment.data[0] : {}
    if(pdata && pdata.id){     
      let transaction = await supabase
        .from('transaction')
        .insert([{type:'collab_payment', type_id:pdata.id,  meta}]) 
      
     // await new_commission_single(transaction.data[0], 'platform_fee_collab', 'influencer') 
     // let business_transaction={...transaction.data[0], user_id:business_id, user_type:'business'}    
     // await new_commission_single(business_transaction, 'platform_fee_collab', 'business')
      //console.log("business_transaction", business_transaction)  
      console.log("status", transaction)      
    }
    
    let { data, error } = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"init_payment_paid"},
      {collab_id, type:"share_link", content:short_code, meta:{short_code}}
    ])
    status="init_payment_paid"  
    console.log("status", status, payment) 
    
    let es=await earningsStats({influencer_id, amount}) 
    console.log("es", {influencer_id, amount}, es)     

  }else if(action=='update_short_url'){
    let {product_url} = inData
    let short_code=shortid.generate()   
    let res = await supabase
      .from('collab_short_url')
      .select(`id`) 
      .eq("collab_id", collab_id)
    let short_url_data=res.data ? res.data[0] : {}
    //console.log("short_url_data", short_url_data)
    if(short_url_data && short_url_data.id){
      let res = await supabase
      .from('collab_short_url')
      .update([
        {collab_id, short_code, product_url, clicks:0},
      ]) 
      .eq('id', short_url_data.id)
      data=res.data ? res.data[0] : {}
      //console.log("short_url_ res", res)
    }else{
      let res = await supabase
      .from('collab_short_url')
      .insert([
        {collab_id, short_code, product_url, clicks:0},
      ]) 
      data=res.data ? res.data[0] : {}
    }    
    //status="short_url"       

  }else if(action=='business_message'){    
    let { data, error } = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"business_message", content },
    ])
  }else if(action=='share_link'){  
    let short_code='3vnRIoY'
    let { data, error } = await supabase
    .from('short_url')
    .insert([
      {short_code, url:'http://localhost:3000/app/product/3' },
    ])

    let event = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"share_link", content:short_code },
    ])

    status="share_link"    

  }else if(action=='paid'){ 
    /*let event = await supabase
    .from('collab_event')
    .select("*")
    .eq('collab_id', collab_id)
    .eq('type', 'amount')*/

    


    var date = new Date().toDateString();
    let event_id=false

    /*let event = await supabase
    .from('collab_event')
    .select()
    .eq('collab_id', collab_id)
    .eq('type', 'payment_details')

    if(event.data) {
      console.log("event", event.data)
      //event_id=event.data[0].id 
    }   */

    let payment = await supabase
      .from('collab_payment')
      .insert([
        {collab_id, status:'paid', amount, mode:props.method, transaction_id:'xsd123fd', meta, platform_fee },
      ]) 
    let event2 = await supabase
    .from('collab_event')
    .insert([
      {collab_id, type:"paid"},
    ])

    await earningsStats({influencer_id, amount}) 

    let pdata= payment.data ? payment.data[0] : {}
    if(pdata && pdata.id){   
      let transaction = await supabase
        .from('transaction')
        .insert([{type:'collab_payment', type_id:pdata.id, user_id:influencer_id, meta}]) 

      //await new_commission_single(transaction.data[0], 'platform_fee_collab',  user_id:influencer_id, 'influencer') 
      //let business_transaction={...transaction.data[0], user_id:business_id, user_type:'business'}    
     // await new_commission_single(business_transaction, 'platform_fee_collab',  user_id:business_id, 'business')
     // console.log("business_transaction", business_transaction)  
    } 
    /*if(event_id!=false){
      let meta_=event.data[0].meta
      meta_.isPaid=true    
      meta_.paid_on=date

      let collab_event = await supabase
      .from('collab_event')
      .update([
        {meta:meta_},
      ])
      .eq('id', event_id)
    }*/
    
    
    status="paid"
  }

  console.log("status_final", status)
  if(status!=''){
    console.log("status", status)
    let update = await supabase
    .from('collab')
    .update({ status, meta:collab_meta})
    .eq('id', collab_id)
    data=update.data[0]
  }
  

  let data2={
    ...data,  
    test:12,
  }
  console.log("COllab DATA", data2)
  return data2
}
