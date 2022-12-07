import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input'; 
import TabSwitch from '../../tab_switch';
import User from '../../blocks/com/user';


import s from './orders_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {get_input, get_select} from '../_blocks/input_ui';
import {tag, ApproveReject, Refresh} from '../_blocks/ui';
import {Tabs, Card, Expand, DataGrid} from '../_blocks/data_ui';
import {LocalUI} from '../_blocks/local_ui';

import OrdersUI from './orders/p_orders_au';
import CampaignsUI from './orders/p_campaigns_au';


const com = (props) => { 
  let { handler } = props 

  const [isFilter, setFilter] = useState({switch:{value:'orders'}})

  
  let content_=(<div>Loading ... </div>)

  
  let orders_=(<OrdersUI {...{
    handler: async(i)=>{      
      i.type='orders' 
      //console.log("influencer handler", i)
      let data= await handler(i)
      return data
    },
  }}/>)
  let campaigns_=(<CampaignsUI {...{
    handler: async(i)=>{
      i.type='campaigns'
     // console.log("collabs handler", i)
      let data= await handler(i)
      return data
    },
  }}/>)
  
  let tabs_args={
    active:'orders',
    isF:isFilter, 
    setF:setFilter,
    items:[     
      {name:'orders', label:'Orders', content:orders_},  
      {name:'campaigns', label:'Coming Soon..', content:campaigns_ }, 
    ],  
    header:{
      title:(<h3>Orders</h3>)
    } 
  }
  
  content_=(<Tabs {...tabs_args}/>)

  return (    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main+' h-full'}>  
        <div className={s.inner+" "}>           
          {content_}
        </div>
      </div>            
    </Layout>    
  )
}
export default com
