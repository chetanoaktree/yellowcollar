import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import s from './popup.module.scss';

const com = ({isOpen=false, size="", setOpen, top="top", middle="middle", bottom='', ...props}) => { 
  
  let c_=''
  if(isOpen===true){
    c_+=' '+s.active
  }
  if(size=='full'){
    c_+=' '+s.full
  }
  if(isOpen===true){
    document.body.classList.add('fixed2');    
  }
  const close=()=>{
    document.body.classList.remove('fixed2');   
    setOpen(false)
  }
  return(
    <div className={s.main+' '+c_}>
      <div className={s.overlay} onClick={close}></div>
      <Button className={s.close} clickHandler={close}><img src="/images/Close_square.svg"/></Button>
      <div className={s.holder} >
        <div className={s.top} >
          {top}
        </div> 

        <div className={s.middle}>
          {middle}
        </div>

        <div className={s.bottom}>
          {bottom}
        </div>       
      </div>
    </div>
  )
}
const remove_fixed =()=>{
  document.body.classList.remove('fixed2');   
}
export {
  remove_fixed
}
export default com