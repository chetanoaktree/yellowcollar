import React, { useState, useEffect } from 'react';
import axios from 'axios';

const handlers = ({router, getData}) => {  
  
  const rejectHandler = async (i)=>{   
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('reject_data', collab.data)
    getData(i.collab_id)  
  }
  const acceptHandler = async (i)=>{    
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('accept_data', collab.data)
    getData(i.collab_id)  
  }
  const performanceHandler = async (i)=>{   
    //const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
    //console.log('accept_data', collab.data)
    //getData(i.collab_id) 
  }
  const collabAgainHandler = async (i)=>{   
    const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('collabAgain_data', collab.data)
    //getData(i.collab_id)  
    router.push({
        pathname: '/app/collab/'+collab.data.id,         
    });
  }

  return {acceptHandler, rejectHandler, performanceHandler, collabAgainHandler}  
}
export default handlers
