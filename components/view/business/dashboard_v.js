import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UI from '../../../ui/lib/view/business/dashboard_u';
import process from '../../process';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  

  const {user} = useSelector((state) => state.pageData);

  const args = process() 
  args.showfooter=false 

  const handler = async (i) => {  
    console.log('req', i)
    const res = await axios.post(process.env.API+'/api/business/dashboard', {business_id:user.id, ...i});
    console.log('res_data', res.data)   
    return  res.data
  } 
  

  return (
    <UI {...args}  {...{handler}}></UI>
  )
}
export default com
