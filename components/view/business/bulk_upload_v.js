import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UI from '../../../ui/lib/view/business/bulk_upload_u';

import process from '../../process';
import axios from 'axios';

const com = (props) => {  
  let {id}=props
   
  const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true 
  //args.showfooter=false 
  const {user} = useSelector((state) => state.pageData);

  const handler = async(i) => {         
    console.log('req', i)
    const res = await axios.post(process.env.API+'/api/business/inventory/bulk', {business_id:user.id, ...i});
    console.log('res_data', res.data)
    return res.data
  } 
  const upload_handler = async (i) => {         
    console.log('req', i)
    const res = await axios.post(process.env.API+'/api/business/inventory/bulk', i);
    console.log('res_data', res.data)
    return res.data
  } 

  return (
    <UI {...props} {...args} handler={handler} upload_handler={upload_handler}></UI>
  )
}
export default com
