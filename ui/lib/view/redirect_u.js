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
import s from './redirect_u.module.scss';

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

  //console.log("router.query", router.query)

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
  const product_not_exists = () =>{    
    return (
      <div>
        <Title>Product Not Exists</Title>
        <div className="mt-4">Click below button to explore other products.  </div>              
        <div className="mt-12" >
          <Button type="action" to={"/app/products/"}>View Products</Button> 
        </div>         
      </div>
    )
  }
  return (
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        <div className={s.inner}>
          <div className={s.card+' text-center'}>         
            {(mode=='p' && type=="not_exists") && product_not_exists()}             
          </div>
        </div>
      </div>
    </Guest>    
  )
}
export default com
