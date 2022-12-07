import React, { useState, useEffect } from 'react';
import UI from '../../../ui/lib/view/admin/businesses_au';
import process from '../../process';
import axios from 'axios';

const com = ({id, ...props}) => {  
  const args = process()   
  if(args.user && args.user.userType!="admin")  return (<div></div>)

  const handler= async (i)=>{
    console.log('handler :' + i.action, i) 
    const res = await axios.post(process.env.API+'/api/admin/businesses', i);
    console.log('handler_data: ' + i.action, res.data)    
    return   res.data
  } 

  return (
    <UI {...args} handler={handler}></UI>
  )
}
export default com
