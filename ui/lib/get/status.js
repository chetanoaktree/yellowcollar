
const order_status_options = [
  {label:'All', name:'', color:''},
  {label:'Awaiting Processing', name:'awaiting_processing', color:'blue'},
  {label:'Processing', name:'processing', color:'blue'},
  {label:'Payment Received', name:'payment_received', color:'blue'},
  {label:'Shipped', name:'shipped', color:'purple'},
  {label:'Cancelled', name:'cancelled', color:'red'},
  {label:'Completed', name:'completed', color:'green'},
  {label:'Delivered', name:'delivered', color:'green'}
]

export{
  order_status_options
}

const com = (status) => {   
  const data={
    failed:'Failed',
    pending:'Pending',
    awaiting_processing:'Awaiting Processing',
    delivered:'Delivered',
    paid:'Paid',
  }
  
  return data[status] ? data[status] : status
}
export default com
