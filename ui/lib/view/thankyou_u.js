import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART_RESET, PAGE_PAYMENT_SET, PAGE_PROCESS_SET, PAGE_PAYMENT_RESET} from "/store/types";
import Validator from 'simple-react-validator';
import Guest from './guest';
import Title from '../title';
import Button from '../button';
import Input from '../input2';
import Select from '../select';

import { useRouter } from 'next/router';
import axios from 'axios';
import s from './thankyou_u.module.scss';

const com = (props) => {    

  const router=useRouter()
  const dispatch = useDispatch(); 

  const {mode, type, id}=router.query

  const {data} = useSelector((state) => state.pageData); 

  const login = () =>{
    router.push('/auth');   
  }
  const order = () =>{    
    router.push('/app/order/'+id);   
  }
  const collab = () =>{    
    router.push('/app/collab/'+id);   
  }

  //console.log("props", props)

  const order_success = () =>{    
    dispatch({
      type: CART_RESET,
      payload: {change:false},
    });
    return (
      <div>
        <Title>Order Created Successfully</Title>
        <div className="mt-4">Click below button to view your order. </div>              
        <div className="mt-12" >
          <Button type="action" clickHandler={order}>View Order</Button> 
        </div>         
      </div>
    )
  }
  const collab_success = () =>{    
    dispatch({
      type: CART_RESET,
      payload: {change:false},
    });
    return (
      <div>
        <Title>Collaboration Payment Done Successfully</Title>
        <div className="mt-4">Click below button to view your collaboration. </div>              
        <div className="mt-12" >
          <Button type="action" clickHandler={collab}>View Collaboration</Button> 
        </div>         
      </div>
    )
  }
  const sub_success = () =>{ 
    useEffect(()=>{
       setTimeout(()=>{
        props.removeLocalHandler() 
      }, 300)
    }, [])
   
    
    return (
      <div>
        <Title>Subscription Payment Done Successfully</Title>
        <div className="mt-4">Click below login button to load your account.  </div>                 
        <div className="mt-12" >
          <Button type="action" clickHandler={login}>Login</Button> 
        </div>         
      </div>
    )
  }
  const influencer_success = () =>{    
    return (
      <div>
        <Title>Account Created Successfully</Title>
        <div className="mt-4">Click below login button to load your profile.  </div>              
        <div className="mt-12" >
          <Button type="action" clickHandler={login}>Login</Button> 
        </div>         
      </div>
    )
  }
  const business_success = () =>{    
    return (
      <div>
        <Title>Account Created Successfully</Title>                   
        <div className="mt-4">Click below login button to load your profile.</div>              
        <div className="mt-12" >
          <Button type="action" clickHandler={login}>Login</Button> 
        </div>  
      </div>
    )
  }
  return (
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        <div className={s.inner}>
          <div className={s.card+' text-center'}>         
            {(mode=='a' && type=="influencer") && influencer_success()} 
            {(mode=='a' && type=="business") && business_success()} 
            {(mode=='p' && type=="order") && order_success()}  
            {(mode=='p' && type=="collab") && collab_success()}  
            {(mode=='p' && type=="sub") && sub_success()}         
            
          </div>
        </div>
      </div>
    </Guest>    
  )
}
export default com
