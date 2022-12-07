import React, { useState, useEffect } from 'react';
import Subscriptions from '../../../ui/lib/view/admin/subscriptions_au';
import getUser from '../../get/user';
import process from '../../process';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  
  const args = process()   
  if(args.user && args.user.userType!="admin")  return (<div></div>)
  const getData = async () => { 
    const res = await axios.post(process.env.API+'/api/admin/subscriptions', {action:'get'});
    console.log('res_data', res.data)   
    return res.data    
  }   
  const handler= async (i)=>{
    console.log('handler :' + i.action, i) 
    const res = await axios.post(process.env.API+'/api/admin/subscriptions', i);
    console.log('handler_data: ' + i.action, res.data)     
  }
  const updateHandler= async (i)=>{    
    handler({action:'update', key:"subscriptions", value:i});   
  }  

  return (
    <Subscriptions {...args}  getData={getData} updateHandler={updateHandler}></Subscriptions>
  )
}
export default com
