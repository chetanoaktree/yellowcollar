import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input'; 
import User from '../../blocks/com/user';


import s from './dashboard_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'

import Actions from './dashboard/d_actions_au';


const com = (props) => { 
  let { actions_handler } = props 

  //const [isData, setData]= useState({})

  //console.log("isData", isData)
  
  return (    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main+' h-full'}>  
        <div className={"flex h-full flex-wrap"}> 
          <div className={"w-full lg:w-2/12 order-1 lg:order-0 "}>
            
          </div>     
          <div className={"w-full lg:w-8/12 order-0 lg:order-1 "}>
            <Actions {...props}/>
          </div>
          <div className={"w-full lg:w-2/12 order-2 lg:order-2 "}>
            
          </div>
        </div>
      </div>            
    </Layout>    
  )
}
export default com
