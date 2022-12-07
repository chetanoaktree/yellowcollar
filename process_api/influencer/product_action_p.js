import { supabase } from '../../util/supabaseClient'

import { getDiscountedPrice } from '../get/order'


import _ from 'lodash'

export default async function  process(props) {  
  let {action, influencer_id, inData} =props
  let data={}
  console.log("props product"+action, props)
  if(action=='process'){
    inData.final_price=getDiscountedPrice(inData.price, inData.discount)
    data=inData   
  }    
  return data
}
