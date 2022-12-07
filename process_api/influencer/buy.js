//import collab from '../../data/influencer/collaboration'
import { supabase } from '../../util/supabaseClient'

export default async function  process(i) {   

  const {product_id, influencer_id, business_id, total}=i 

  //let s_address1="711-2880 Nulla St."
  //let s_address2="Mankato"
  //let s_city="Mississippi"
  //let s_postcode="96522"

  let user_details = await supabase
  .from('influencer_details')
  .select()
  .eq("influencer_id", influencer_id) 

  let {address1, address2, city, postcode}=user_details?.data[0]

  let { data, error } = await supabase
  .from('order')
  .insert([
    {status:'delivered', product_id, influencer_id, business_id, total},
  ])
  console.log("buy", i)

  let details = await supabase
  .from('order_details')
  .insert([
    {order_id: data[0].id, s_address1:address1, s_address2:address2, s_city:city, s_postcode:postcode},
  ])
 

  /*let event = await supabase
  .from('collab_event')
  .select()
  .eq('collab_id', 1)
  .order('created_at', { ascending: true })


  console.log("collab", event)

  let business = await supabase
  .from('business')
  .select()
  .eq("id", data[0].business_id)
  data[0].business=business.data[0]

  let influencer = await supabase
  .from('influencer')
  .select()
  .eq("id", data[0].influencer_id)
  data[0].influencer=influencer.data[0]

  let data2={
    ...data[0],
    events:event.data
  }*/
  let data2=data
  return data2
}
