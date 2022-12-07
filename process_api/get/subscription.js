import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

const meta_list = () => {
  let meta=[
    {for:'influencer', label:"Promotional requests", name:'promotional_requests', type:''},
    {for:'influencer', label:"Platform Fee", name:'platform_fee_order', type:'%'},
    {for:'influencer', label:"Success Fee (on total amount)", name:'platform_fee_collab', type:'%'},
    {for:'business', label:"Partnership fee", name:'platform_fee_collab', type:'%'},
    {for:'business', label:"Sales commission", name:'platform_fee_sale', type:'%'},   
  ]
  return meta
}

export {
  meta_list
}