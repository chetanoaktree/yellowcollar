import { supabase } from '../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import _ from 'lodash'
const range = (query, props)=> {
  let {start, end}=props  
  if( start && end ) { query = query.range(start-1, end-1) }  
  //console.log("range", start, end)
  return query
}
const get_switch = (props)=> {
  let out=(props.switch && props.switch.value) ? props.switch.value : false  
  return out
}
const extract_com = ({query, parent='', props}) => {
  let {influencer_name}=props  
  query=extract_influencer({query, parent, props})
  query=extract_business({query, parent, props})
  query=extract_product({query, parent, props})  
  return query
}
const extract_influencer = ({query, parent='', props}) => {
  let {influencer_name}=props  
  if(influencer_name) {
    if(parent=='influencer'){
      query=query.ilike('name', `%${influencer_name}%`) 
    }else{
      query=query.ilike('influencer.name', `%${influencer_name}%`) 
    }    
  }  
  return query
}
const extract_business = ({query, parent='', props}) => {
  let {business_name}=props  
  if(business_name) {
    if(parent=='business'){
      query=query.ilike('name', `%${business_name}%`) 
    }else{
      query=query.ilike('business.name', `%${business_name}%`) 
    }    
  } 
  return query
}
const extract_product = ({query, parent='', props}) => {
  let {product_name}=props  
  if(product_name) {
    if(parent=='product'){
      query=query.ilike('title', `%${product_name}%`) 
    }else{
      query=query.ilike('product.title', `%${product_name}%`) 
    }    
  }   
  return query
}

const for_upsert = ({items, data, id_key, compare_key}) => {
  let forU=[]
  let forI=[]

  _.forEach(items, (v, k)=>{
    let attr=_.filter(data, (vs)=>{
      return v[compare_key] == vs[compare_key] ? true : false
    })  
    if(attr && attr[0]){
      v.id=attr[0][id_key]
      forU.push(v)
    }else{
      forI.push(v)
    }
  })
  console.log("forU", forU)  
  console.log("forI", forI) 
  return {
    forU,
    forI
  }
}

export {
  range,
  get_switch,
  extract_com,
  extract_influencer,
  extract_business,
  extract_product,
  for_upsert
}