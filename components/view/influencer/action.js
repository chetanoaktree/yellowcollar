import axios from 'axios';
const messageHandler = async (i)=>{
    console.log("message", i)
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('message_data', collab.data)
    return  collab.data   
}
const acceptHandler = async (i)=>{
    console.log("acceptHandler", i)
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('accept_data', collab.data)
    return  collab.data   
}
const rejectHandler = async (i)=>{
    console.log("rejectHandler", i)
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('reject_data', collab.data)
    return  collab.data   
}
const liveHandler = async (i)=>{
    console.log("liveHandler", i)
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('live_data', collab.data)
    return  collab.data   
}
const completedHandler = async (i)=>{
    console.log("completedHandler", i)
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('completed_data', collab.data)
    return  collab.data   
}
const completedRequestHandler = async (i)=>{
    console.log("completedRequestHandler", i)
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('completed_request_data', collab.data)
    return  collab.data   
}
export{
  messageHandler,
  acceptHandler,
  rejectHandler,
  liveHandler,
  completedHandler,
  completedRequestHandler
}