import React, { useState } from "react";
import _ from "lodash"
import Link from 'next/link'
import Title from '../../title';
import Button from '../../button';
import s from './collab_refresh.module.scss';
import Moment from 'moment';

const com = ({className, userType, item, refreshHandler}) => { 
  return(
    <div className={s.refresh} >
      <Button clickHandler={()=>refreshHandler()}><img src="/images/Refresh_light.svg"/></Button>
    </div>
  )
}
export default com