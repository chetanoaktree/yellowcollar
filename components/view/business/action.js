import axios from 'axios';
const collaborateHandler = async (i)=>{   
  const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
  console.log('collaborate_data', collab.data) 
  return collab.data
}
const rejectHandler = async (i)=>{   
  const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
  console.log('reject_data', collab.data) 
  return collab.data
}
const acceptHandler = async (i)=>{    
  const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
  console.log('accept_data', collab.data) 
  return collab.data 
}
const collabAgainHandler = async (i)=>{   
  const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
  console.log('collabAgain_data', collab.data)
  return collab.data   
}
const messageHandler = async (i)=>{
  console.log("message", i)
  const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
  console.log('message_data', collab.data)
  return collab.data     
}
const initPaymentPaidHandler = async (i)=>{
  console.log("initPaymentPaid", i)
  const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
  console.log('initPaymentPaid_data', collab.data)
  return collab.data     
}
const paidHandler = async (i)=>{
  console.log("paid", i)
  const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
  console.log('paid_data', collab.data)
  return collab.data     
}

export{
  collaborateHandler,
  rejectHandler,
  acceptHandler,
  collabAgainHandler,
  messageHandler,
  initPaymentPaidHandler,
  paidHandler
}