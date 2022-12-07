import React, { useState, useEffect } from 'react';
import Pages from '../../../ui/lib/view/admin/pages_au';
import getUser from '../../get/user';
import process from '../../process';
import axios from 'axios';
import { useRouter } from 'next/router';

import {ikHandler} from '../../get/image_v';

const com = ({id, ...props}) => {  
  const args = process()   
  if(args.user && args.user.userType!="admin")  return (<div></div>)
  const handler= async (i)=>{
    console.log('handler :' + i.action, i) 
    const res = await axios.post(process.env.API+'/api/admin/pages', i);
    console.log('handler_data: ' + i.action, res.data)   
    return res.data  
  } 


  const imageHandler = async (i) => {
    console.log("i", i)
    const result = await axios.post(process.env.API+'/api/com/image_upload/action', i);
    console.log('image_data: ', result.data)  
    return result.data
  } 

  return (
    <Pages {...args}  handler={handler} ikHandler={ikHandler} imageHandler={imageHandler}></Pages>
  )
}
export default com
