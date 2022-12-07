import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Guest from './guest';
import Title from '../title';
import Button from '../button';
import TestUser from '../blocks/com/test_user';

import { useDispatch, useSelector } from "react-redux";

import _ from 'lodash'

import {get_meta} from '../blocks/com/test_user';

import GuestContent from './home_guest_u';
import UserContent from './home_user_u';


import s from './home_u.module.scss';
const com = (props ) => { 
  let {cat, handler, children}=props
  const router=useRouter()
  const {dev}=router.query
  const {user, membership} = useSelector((state) => state.pageData);
  console.log("USER2", user)
  let content=''
  if(!user.userType){
    content=(<GuestContent  {...props}/>)
  }else{
    content=(<UserContent  {...props}/>)
  }
  return (    
    <Guest {...props} viewType="guest">   
      {content}
    </Guest>      
  )
}
export default com
