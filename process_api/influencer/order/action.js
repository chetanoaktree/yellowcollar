import { supabase } from '../../../util/supabaseClient'
import _ from 'lodash'
import shortid from 'shortid'
import { get_discount, get_total, get_subtotal } from '/ui/lib/get/order'
import { new_commission, get_commission_single } from '../../get/commission'
import { update_product_units } from '../../get/inventory'
import pw_action from '../../com/pw/action'
//import NotificationAction from '../../com/notification/action'
import collab_action from '../collab/action'
import { get_image, productImages } from '../../get/image'
import { getOrderItemsCollab, getOrderItemsCollabRequest} from '../../get/collab'
import { update_product_meta} from '../../get/product'


const get_transactions=(order_payment_id, items)=>{ 
  let data=[]
  _.forEach(items, function(i, key) {
    if(i==null) return
    //console.log("item", i, key)    
    let meta={item_id:i.id, total:i.price, discount:i.discount, ...i}
    data.push({type:'order_payment', type_id:order_payment_id, meta});
  });
  return data  
}


const get_items=async (order_id, items)=>{ 
  let get_items_=[]
  const get_item = async(i) => {
    if(i==null) return 
    let {id, title, price, final_price_after_discount, price_after_discount, discount_value, discount, qty,  variation, business_id} =i 
    let business_pf=await get_commission_single(business_id, 'platform_fee_sale', 'business')     
    //let business_pf=12
    let  d={order_id, product_id:id, title, price, final_price_after_discount, price_after_discount, discount_value, discount, qty,  variation, business_id,  platform_fee:{business:business_pf}}
    //get_items_.push( d);
    return d
  }
  await Promise.all( items.map(async (file, index) => {
    const contents = await get_item(file)
    get_items_.push( contents);
    //console.log(contents)
  }));
  //_.forEach(items, await get_item);
  //console.log(" get_items_",  get_items_)  
  return get_items_  
}
const get_item_join=  (order_id, influencer_id, items)=>{ 
  let data=[]
  _.forEach(items, function(i, key) {
    if(i==null) return    
    data.push({order_id, item_id:i.id, influencer_id, product_id:i.product_id, business_id:i.business_id});
  });
  return data  
}

const get_order =async (props) =>{
  let {influencer_id, order_id} =props
  let data={}
  let order = await supabase
    .from('order')
    .select(`
    *,
    influencer2:influencer_id(*),
    items:order_item(
      *,
      product:product_id(*)      
    ),
    payment:order_payment(*),
    shipping_:order_shipping(*),
    details:order_details(*)
    `)  
    .eq("influencer_id", influencer_id)
    .eq("id", order_id)

  data=order.data ? order.data[0] : {}
  if(data.items) {
    data.items=await productImages(data.items)
    data.items=await getOrderItemsCollab({items:data.items, influencer_id})
    data.items=await getOrderItemsCollabRequest({items:data.items, influencer_id})
  }

  return data
}
export default async function  process(props) { 
  let {action, order_id, influencer_id, product_id, items, shipping_method, payment_method, platform_fee, discount, sub_total, subtotal, total, shipping, tax, first_name, last_name, address, city, state, country, pincode, content,  meta}=props
  let status 
  let data={} 
  let order={}  

  if(subtotal) sub_total=subtotal
  items = _.filter(items, 'id');

  console.log("props", props)

  let inData={influencer_id, product_id, items, shipping_method, payment_method,  platform_fee, discount, sub_total, subtotal, total, shipping, tax, first_name, last_name, address, city, state, country, pincode, content, meta}
  
  if(action=="create_temp_order"){ 
    let unique_id=shortid.generate()
    //inData.discount=get_discount(items)
    //inData.subtotal=get_subtotal(items)
    //inData.total=get_total(inData) 

    let pw = await pw_action({order_id:unique_id, amount:inData.total, type:'order'})

    const tempOrder = await supabase
      .from('temp')
      .insert([
        { shortid: unique_id, status:'pending', type:'order', meta:inData},
      ]) 
    data=tempOrder.data[0]
    data.total=inData.total
    data.currency='INR'
    data.token=pw.txnToken
    data.pw=pw

  }else if(action=="get_temp_order"){ 
    if(props.shortid){
      const tempOrder = await supabase
        .from('temp')
        .select()
        .eq("shortid", props.shortid) 
      data=tempOrder.data[0]     
    }

  }else if(action=='create_order'){  
    //let discount=get_discount(items)
    //let subtotal=get_subtotal(items)
    //let total=get_total({discount, subtotal}) 
    
    let shortid_=props.shortid
    if(props.shortid){      
      const tempOrder = await supabase
        .from('temp')
        .update([{status:'completed'}])
        .eq("shortid", shortid_)        
    }

    order = await supabase
      .from('order')
      .insert([
        {status:'awaiting_processing', influencer_id, discount, subtotal:sub_total, total, shipping, tax , platform_fee, meta, shortid:shortid_},
      ])     
    let order_id=order.data[0].id
    
    let order_details = await supabase
      .from('order_details')
      .insert([
        {order_id, s_first_name:first_name, s_last_name:last_name, s_address1:address, s_city:city, s_state:state, s_country:country, s_postcode:pincode },
      ])

    let shipping2 = await supabase
      .from('order_shipping')
      .insert([
        {order_id, status:'paid', method:shipping_method, tracking_code:'xsd123fd' },
      ]) 
    
    let payment = await supabase
      .from('order_payment')
      .insert([
        {order_id, status:'paid', mode:payment_method, transaction_id:'xsd123fd', meta:props, platform_fee:{influencer:platform_fee}},
      ]) 


    let available_units = await update_product_units(items)

    let items_=await get_items(order_id, items)
    let order_item = await supabase
      .from('order_item')
      .insert(items_) 
    //console.log("order_item", items)
    //console.log("order_item_", items_)
    //console.log("payment", payment)
    if(order_item.data.length && payment.data.length){
      let getTransactions=get_transactions(payment.data[0].id, order_item.data)
      let transaction = await supabase
        .from('transaction')
        .insert(getTransactions) 
      console.log("transaction", transaction)  
      //await new_commission(transaction.data, 'platform_fee_sale', 'business')     

      let item_join_data=get_item_join(order_id, influencer_id, order_item.data)
      let item_join = await supabase
        .from('order_item_join')
        .insert(item_join_data) 
    }    
    
    let join = await supabase
    .from('order_join')
    .insert([{order_id, influencer_id}])  
       
    //NotificationAction({action:'insert_data', type:'collab', event:'requested', influencer_id, business_id, product_id, meta:{collab_id}})
    data=order.data[0]

  }else if(action=='get_order'){
    data=await get_order(props)
   
  }else if(action=='collab_invite'){
    await collab_action({action:'invite', influencer_id, product_id})
    data=await get_order(props)
    
    //data=order.data[0]
  }
 console.log("data "+action, data)
  return data
}
