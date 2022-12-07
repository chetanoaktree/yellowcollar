import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { PAGE_PAYMENT_SET, PAGE_PAYMENT_RESET, PAGE_MEMBERSHIP_SET} from "/store/types";
import Feedback from '../../ui/lib/view/com/feedback_u';
import process from '../process';
import axios from 'axios';

const com = ({id, ...props}) => {   
  const args = process() 
  //args.noTopGap=true;
  args.showFooter=true 
  args.showShopNav=false   

  const [isImage, setImage] = useState({img:''})

  args.isImage=isImage
  args.handler = async (i)=>{  
    const res = await axios.post(process.env.API+'/api/com/feedback', i);
    console.log('handler res', res.data)
    return res.data
  }
  args.imageHandler = async (i) => {
    console.log('image', i) 
    const result = await axios.post(process.env.API+'/api/com/image_upload/action', i);
    console.log('image_data', result.data) 
    setImage(result.data)    
  }

  //const dispatch = useDispatch();  
  //const {payment, user, membership} = useSelector((state) => state.pageData);
  //const[isArgs, setArgs] = useState({})
  
  return (
    <Feedback {...args}></Feedback>
  )
}
export default com
