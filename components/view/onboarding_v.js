import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {PAGE_SET, PAGE_MEMBERSHIP_SET} from "/store/types";
import {set_user} from '../get/user';
import OnBoarding from '../../ui/lib/view/onboarding_u';
import navArgs from '../args/nav';
import axios from 'axios';
import { useRouter } from 'next/router';

import process2 from '../process';


const com = (props) => {  

  const args = process2();  
  args.noTopGap=true;
  args.showFooter=true 
  args.showShopNav=false 
  
  
  const router = useRouter();  
  const dispatch = useDispatch();  

  const {user, user_refresh_state} = useSelector((state) => state.pageData);
  console.log("user", user)

  if(user.userType!='new_user'){
    //router.push('/');   
  }    

  const handler2 = async (i) => {     
    console.log("onboarding data", i)  
    const res = await axios.post(process.env.API+'/api/user/action', i);
    const data = res.data;     
    console.log("onboarding response", res.data)
    if(data.userType && data.userType!='new_user'){
      set_user(data)
      let page_data={isLogged:true, user:data, user_refresh_state:user_refresh_state+1}

      dispatch({
        type: PAGE_SET,
        payload: page_data,
      });

      if(data.membership){
        dispatch({
          type: PAGE_MEMBERSHIP_SET,
          payload: data.membership,
        }); 
      }
      //router.push('/');   
    }     
    return data
  } 
  const handler = async (i) => {     
    console.log("req", i)  
    const res = await axios.post(process.env.API+'/api/onboarding', {id:user.id, ...i});
    const data = res.data;     
    console.log("response", res.data)   
    return data
  }

  const industryOptions = [
    { value: '', label: 'Select Industry' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'sports', label: 'Sports' }
  ] 

  useEffect(() => {     
    if(user.userType!="new_user" ) {  
      if(router.query &&  !router.query.edit) {    
        router.push("/")     
      } 
    }     
    return () => { 
    //setCount(0)
    }
  }, []); 

  args.handler=handler 
  args.industryOptions=industryOptions 

  return (
    <OnBoarding {...args} ></OnBoarding>
  )
}
export default com
