import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input'; 
import TabSwitch from '../../tab_switch';
import User from '../../blocks/com/user';


import s from './transactions_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {get_input, get_select} from '../_blocks/input_ui';
import {tag, ApproveReject, Refresh} from '../_blocks/ui';
import {Tabs, Card, Expand, DataGrid} from '../_blocks/data_ui';
import {LocalUI} from '../_blocks/local_ui';


import CollabsUI from './transactions/t_collabs_au';
import OrdersUI from './transactions/t_orders_au';
import MembershipsUI from './transactions/t_memberships_au';


const com = (props) => { 
  let { handler } = props 

  const [isFilter, setFilter] = useState({switch:{value:'collabs'}})

  
  let content_=(<div>Loading ... </div>)

  let collabs_=(<CollabsUI {...{
    handler: async(i)=>{
      i.type='collabs' 
      //console.log("goal handler", i)   
      let data= await handler(i)
      return data
    },
  }} />)
  let orders_=(<OrdersUI {...{
    handler: async(i)=>{      
      i.type='orders' 
      //console.log("influencer handler", i)
      let data= await handler(i)
      return data
    },
  }}/>)
  let memberships_=(<MembershipsUI {...{
    handler: async(i)=>{
      i.type='memberships'
     // console.log("collabs handler", i)
      let data= await handler(i)
      return data
    },
  }}/>)
  
  let tabs_args={
    active:'goal',
    isF:isFilter, 
    setF:setFilter,
    items:[
      {name:'collabs', label:'Collabs', content:collabs_},      
      {name:'orders', label:'Orders', content:orders_},  
      {name:'memberships', label:'Memberships', content:memberships_ }, 
    ],  
    header:{
      title:(<h3>Transactions</h3>)
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
