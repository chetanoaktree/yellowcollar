import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CART_ADD_ITEM} from "/store/types";
import UI from '../../../ui/lib/view/influencer/products_u';
import {usePage} from '/ui/lib/hooks/usePage';
import process from '../../process';
import axios from 'axios';

const com = ({id, ...props}) => {  
  
  const args = process()
  //args.navArgs.home="/app/shop/"
  args.showFooter=true  

  if(args.user && args.user.userType!="influencer")  return (<div></div>)
  
  const dispatch = useDispatch(); 
  const page=usePage()  

  const {user} = useSelector((state) => state.pageData);

  const handler = async (i) => { 
    //page.showLoading("guest")
    const res = await axios.post(process.env.API+'/api/influencer/products', {influencer_id:user.id, ...i});
    const data = res.data;   
    //page.hideLoading()
    return  data;
  } 

  const add2cartHandler = async (i)=>{    
    dispatch({
      type: CART_ADD_ITEM,
      payload: i,
    });
    router.push("/app/checkout/?step=information")  
  }
  
  return (
    <UI {...args}  handler={handler} add2cartHandler={add2cartHandler}></UI>
  )
}
export default com
