import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UI from '../../../ui/lib/view/business/settings_u';
import process from '../../process';
import axios from 'axios';
import { useRouter } from 'next/router';
import {getCategoriesOptions} from '../../get/g_product_v';
import {ikHandler} from '../../get/image_v';


const com = ({id, ...props}) => {   

  const router = useRouter(); 

  const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true 
  args.showfooter=false 

  const {user} = useSelector((state) => state.pageData);

  const handler = async (i) => {
    const res = await axios.post(process.env.API+'/api/com/profile/action', {...i, business_id:user.id});
    console.log('res_data', res.data)  
    return  res.data
  } 

  
  return (
    <UI {...args} {...{handler, ikHandler, getCategoriesOptions, }}></UI>
  )
}
export default com
