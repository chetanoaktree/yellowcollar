import axios from 'axios';
const ikHandler = async (i) => {
  console.log("ik", i)
  const result = await axios.post(process.env.API+'/api/com/image_upload/ik_action', i);
  console.log('ik_data: ', result.data) 
  return result.data 
} 

export{
  ikHandler
}

