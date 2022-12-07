const com = (status) => {   
  const data={
    failed:'Failed',
    pending:'Pending',
    awaiting_processing:'Awaiting Processing',
    paid:'Paid',
    delivered:'Delivered',
  }
  
  return data[status] ? data[status] : status
}
export default com
