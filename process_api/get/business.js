import { supabase } from '../../util/supabaseClient'

export default async function process(data) { 
  let business = await supabase
  .from('business')
  .select()
  .eq("id", data.business_id)
  data.business=business.data ? business.data[0] : {name:'', profile_pic:''}
  //console.log(business)
  return data
}
