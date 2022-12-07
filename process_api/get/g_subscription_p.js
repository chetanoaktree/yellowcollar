import _ from 'lodash'
import Moment from 'moment'

let get_meta = ({meta, user_type='influencer'}) =>{

  const {
    promotional_requests,
    platform_fee_order,
    platform_fee_collab,    
    platform_fee_sale
  } = meta  ? meta : {}

  let ret=[]
  if(user_type=="influencer"){
    ret.push({label:'Promotional requests', value:promotional_requests, type:''})
    ret.push({label:'Platform Fee', value:platform_fee_order, type:'%'})
    ret.push({label:'Success Fee (on total amount)', value:platform_fee_collab, type:'%'})
  }else if(user_type=="business"){
    ret.push({label:'Partnership fee', value:platform_fee_collab, type:'%'})
    ret.push({label:'Sales commission', value:platform_fee_sale, type:'%'})
  }
  return ret
}
export {
  get_meta
}
