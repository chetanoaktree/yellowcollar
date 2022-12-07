import React, { useState } from "react";
import _ from "lodash"
import Link from 'next/link'
import Title from '../../title';
import Button from '../../button';
import s from './collab_status.module.scss';
import Moment from 'moment';

const com = ({className, userType, item, i}) => {
  //if(item.status!="init_payment") return(<></>)
  let out

  //console.log("collab action item", userType)
  // business  
  
  return(
    <div className={s.status+' '+className} >      
      {item.status} 
    </div>
  )
}
export default com