import product1 from '../../data/products/product1'
import product2 from '../../data/products/product2'
import product3 from '../../data/products/product3'
import product4 from '../../data/products/product4'
import product5 from '../../data/products/product5'
import desc1 from '../../data/products/desc1'

import { supabase } from '../../util/supabaseClient'

import getBusiness from '../get/business'
import getPurchased from '../get/purchased'
import getCollaborated from '../get/collaborated'

export default async function  process({cat, influencer_id}) { 
  /*
  product1.cat=cat
  let data={
    cat:cat,  
    items:[
      product1,
      product2,
      product3,
      product4,
      product5,
      product1,
      product2,
      product3,
      product4,
      product5
    ],    
  }*/   

  let products = await supabase
  .from('product')
  .select(`
  *,
  business:business_id(*)
  `)

  console.log("products", products)

  const callAsynchronousOperation = async (item) =>{    
    //item=await getBusiness(item)
    item=await getPurchased(item, influencer_id)
    item=await getCollaborated(item, influencer_id)
    //console.log("product", item)
    return item
  }
  var results = await Promise.all(products.data.map(async (item) => {
      await callAsynchronousOperation(item);
      return item;
  }));

  //let data2=collabs.data
 // let data2=collabs2
  let data={
    cat:cat,
    items:results
  }
  let data2={sd:12}
  return data
}
