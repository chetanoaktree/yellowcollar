import { supabase } from '../../util/supabaseClient'
import {get_commission_single} from '../get/commission';
import { getDiscountValue } from '../get/order'
import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, items, influencer_id}=props 
  console.log("cart ==============items", props)
  const exist = await checkExistingProduct(influencer_id)
  if(exist.length > 0){
    await updateProductToCart(influencer_id, props)
  }else{
    await addProductToCart(influencer_id, props)
  }
  
  let data={}
  let total=0
  let sub_total=0

  
  
  items=_.filter(items, 'id')
  
  let items2=[]
  items2=items  
  if(action=='delete_item'){ 
    _.forEach(items2, (value, key)=>{
      if(value==null) return 
      if(value.id==id) return      
      items2[key]=value 
    })
    console.log("items222222222222222222222", items2)
    // await removeProductFromCart(influencer_id)
  }else if(action=='update'){ 
    _.forEach(items2, (value, key)=>{
      value.available_units=12     
      items2[key]=value 
    }) 
  }
  
    
  _.forEach(items2, (value, key)=>{
    if(value==null) return       
    let discount=getDiscountValue(value.price, value.discount)       
    sub_total+=(value.price-discount) * value.qty
    value.final_price_after_discount=(value.price-discount) * value.qty
    value.price_after_discount=(value.price) * value.qty
    value.discount_value= discount  * value.qty
    //discount+=getDiscountValue(value.price, value.discount) 
    items2[key]=value       
  })    
 
  data.items=items  
  data.sub_total=sub_total  
    // console.log(data,"error==>>",error,"buy", {influencer_id, meta: props})
 
  return data
}

const checkExistingProduct = async(influencer_id) =>{
  const { data, error } = await supabase
      .from("influencer_checkout")
      .select()
      .match({ influencer_id: influencer_id });

    console.log("checkExistingProduct", data , "error", error)
    // if (error) {
    //   throw new Error(error.message);
    // }

    return data
}


const addProductToCart = async(influencer_id, props) =>{
  const { data, error } = await supabase
      .from("influencer_checkout")
      .insert([
        {influencer_id, meta: props}
      ]);

    // if (error) {
    //   throw new Error(error.message);
    // }
    console.log("addProductToCart", data , "error", error)

    return data
}


const updateProductToCart = async(influencer_id, props) =>{
  const { data, error } = await supabase
      .from("influencer_checkout")
      .update({ meta: props })
      .match({ influencer_id: influencer_id });

    // if (error) {
    //   throw new Error(error.message);
    // }
    console.log("updateProductToCart", data , "error", error)

    return data
}

const removeProductFromCart = async(influencer_id) => {

  const { data, error } = await supabase
      .from("influencer_checkout")
      .delete()
      .match({ influencer_id: influencer_id })
    // if (error) {
    //   throw new Error(error.message);
    // }
    console.log("removeProductFromCart", data , "error", error)

    return data
}