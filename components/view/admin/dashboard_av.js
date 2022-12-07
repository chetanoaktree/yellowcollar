import React, { useState, useEffect } from 'react';
import Dashboard from '../../../ui/lib/view/admin/dashboard_au';
import process from '../../process';
//import {rejectHandler, acceptHandler, performanceHandler, collabAgainHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  
  const args = process()   
  if(args.user && args.user.userType!="admin")  return (<div></div>)

  const actions_handler= async (i)=>{
    console.log('handler', i) 
    const res = await axios.post(process.env.API+'/api/admin/dashboard/actions', i);
    console.log('handler_data', res.data) 
    return res.data
  }
  
  return (
    <Dashboard {...args}  actions_handler={actions_handler}></Dashboard>
  )
}
export default com
