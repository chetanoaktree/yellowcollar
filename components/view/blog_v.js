import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UI from '../../ui/lib/view/blog_u';
import axios from 'axios';

import process2 from '../process';


const com = (props) => {  
  let {slug=''}=props

  const args = process2();  
  args.noTopGap=false;
  args.showFooter=true 
  args.showShopNav=false 
/*
  args.handler = async (i) => { 
    //page.showLoading("guest")
    const res = await axios.post(process.env.API+'/api/blog', {slug});
    const data = res.data;   
    //page.hideLoading()
    console.log("data", data)
    return  data;
  } 
*/

  return (
    <UI {...props} {...args} ></UI>
  )
}
export default com
