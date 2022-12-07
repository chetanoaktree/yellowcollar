import {get_id, dot as dot2, dot_gradient, tag, percentage_tag, order_status_tag, get_order_status, order_main_status_tag} from './ui';
import s from './sale.module.scss';
import Moment from 'moment';

const CONSTANTS={  
  order:1,
  awaiting_processing:2,
  processing:3,
  payment_received:4,
  cancelled:6,
  shipped:7,  
  delivered:10, 
  completed:10,
}

const levels={
  order:CONSTANTS.order,
  awaiting_processing:CONSTANTS.awaiting_processing,
  processing:CONSTANTS.processing,
  payment_received:CONSTANTS.payment_received,   
  shipped:CONSTANTS.shipped, 
  cancelled:CONSTANTS.cancelled, 
  delivered:CONSTANTS.delivered,
  completed:CONSTANTS.completed
}

const order_status_options=[
  {label:'Select', value:''},    
  //{label:'Pending', value:'pending'},
  {label:'Awaiting Processing', value:'awaiting_processing' },
  {label:'Processing', value:'processing'},  
  //{label:'Awaiting Payment', value:'awaiting_payment' },
  //{label:'Partially Shipped', value:'partially_shipped' },
  {label:'Shipped', value:'shipped' },
  {label:'Cancelled', value:'cancelled' },
  {label:'Refunded', value:'refunded' },
  {label:'Delivered', value:'Delivered' },
  {label:'Completed', value:'completed'},  
 // {label:'Disputed', value:'disputed' },
  //{label:'Partially Refunded', value:'partially_refunded' }
]
const payment_status_options=[
  {label:'Select', value:''},    
  {label:'Pending', value:'pending'},
  {label:'Failed', value:'failed'},
  {label:'Paid', value:'paid'},  
  {label:'Refunded', value:'refunded' },
  {label:'Disputed', value:'disputed' },
  {label:'Partially Refunded', value:'partially_refunded' }
]

const dot = ({level, status, size}) =>{
    return dot2({level, status, levels, size})
}
const gradient = ({status}) => {  
  return dot_gradient({status, levels})
}
const getID=(i)=>{
  return get_id(i)
}
const get_track=(i)=>{
  let {status, size='md'}=i
  let gradient_=gradient({status})  
  return(
    <div className={s.track+' '+s[size]} style={{backgroundImage:'linear-gradient('+gradient_+')'}}>
      {dot({level:CONSTANTS.order, status, size})}
      {dot({level:CONSTANTS.awaiting_processing, status, size})}
      {dot({level:CONSTANTS.processing, status, size})}
      {dot({level:CONSTANTS.payment_received, status, size})}
      {dot({level:CONSTANTS.shipped, status, size})}
      {dot({level:CONSTANTS.completed, status, size})}
    </div>
  )
}
const status_tag = ({content, status, size})=>{  
  return order_status_tag({content, status, size})
}


const order_address = (order) => {
  let details  = order.details[0]
  let {s_address1, s_address2, s_city, s_postcode}  = details
 
  let out = (<div>
    {s_address1}, {s_address2} <br/> {s_city} {s_postcode}<br/>(257) 563-7401 
  </div>)
  return out              
}
const get_message = (order_item) => {
  let out
  let {status, meta}=order_item
  if(!meta) meta={expected_delivery_date:'', courier_service:'', delivered_to:'', cancelled_reason:''}
  if(status=="delivered"){
    out="Delivered To: "+meta.delivered_to
  }else if(status=="cancelled"){
    out="Cancelled reason: "+meta.cancelled_reason
  }else if(status=="processing"){
    out="Expected Delivery Date: "+meta.expected_delivery_date
  }else if(status=="shipped"){
    out="Courier Serivce: "+meta.courier_service
  }
 
  return out              
}
  
export {
  CONSTANTS, 
  levels, 
  tag,
  percentage_tag,  
  dot,
  gradient,
  getID,
  get_track,
  status_tag,
  get_order_status,
  get_message,
 
  order_main_status_tag,
  order_status_options,
  payment_status_options,
  order_address
}
