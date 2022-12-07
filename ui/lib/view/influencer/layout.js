import React, { useState, useEffect } from "react";
import Guest from '../guest';
import Title from '../../title';
import Payment from '../../blocks/com/payment/index';
import s from './layout.module.scss';

let a=1
const com = ({cat, children,  ...props} ) => {
  //console.log("props", props)
  //console.log("#### 4 LAYOUT "+a, props)
  a+=1
  return (
    <Guest {...props}>   
      <div className={s.main}>   
        {children}
      </div>
      <Payment/>
    </Guest>    
  )
}
export default com
