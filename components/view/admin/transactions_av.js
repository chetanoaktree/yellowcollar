import React, { useState, useEffect } from 'react';
import Transactions from '../../../ui/lib/view/admin/transactions_au';
import getUser from '../../get/user';
import process from '../../process';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  
  const args = process()   
  if(args.user && args.user.userType!="admin")  return (<div></div>) 
  
  const handler= async (i)=>{
    console.log('handler :' + i.action, i) 
    const res = await axios.post(process.env.API+'/api/admin/transactions', i);
    console.log('handler_data: ' + i.action, res.data) 
    return res.data   
  } 

  return (
    <Transactions {...args}  handler={handler}></Transactions>
  )
}
export default com
