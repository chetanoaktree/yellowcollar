import React, { useState , useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_PAYMENT_SET, PAGE_PAYMENT_RESET } from "/store/types";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import s from './index.module.scss';




const com = ({viewType}) => { 
  const dispatch = useDispatch();  
  const pageData = useSelector((state) => state.pageData);
  const { payment, isProcess} = pageData;  
  const [isActive, setActive]=useState(false)
  
  //console.log("payment pageData", pageData)
  let c_=''

  /*useEffect(()=>{
    //document.body.classList.add('fixed');
    //setActive(true)
  }, [])*/
  if(payment.active==true){
    document.body.classList.add('fixed2');
    //setActive(true)
    c_+=' '+s.active
  }

  const callback=()=>{
    document.body.classList.remove('fixed2');
   
    dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:false, status:'payment_completed', method:{label:'UPI', value:'upi'}, result:'success'},
    });
  }
  const closeHandler=()=>{
    dispatch({
      type: PAGE_PAYMENT_RESET,
      payload: {},
    });
  }
    
  const Dummy=()=>{
    return(
      <div className={s.dummy}>
        <div className={s.top}></div>
        <div className={s.middle}>
          Payment {payment.amount}
        </div>
        <div className={s.bottom}>
          <Button type="action2" clickHandler={callback}>Paynow</Button>
        </div>
      </div>
    )
  }
  return (
    <div className={s.main+' '+c_}>
      <div className={s.overlay} onClick={closeHandler}></div>
      <div className={s.inner}>
        <Dummy/>
      </div>
    </div>    
  )
}


export default com