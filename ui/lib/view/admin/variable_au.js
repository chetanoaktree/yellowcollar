import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input'; 
import TabSwitch from '../../tab_switch';
import User from '../../blocks/com/user';


import s from './variable_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {get_input, get_select} from '../_blocks/input_ui';
import {tag, ApproveReject, Refresh} from '../_blocks/ui';
import {Tabs, Card, Expand, DataGrid} from '../_blocks/data_ui';
import {LocalUI} from '../_blocks/local_ui';

import InfluencersUI from './variable/v_influencers_au';
import CollabsUI from './variable/v_collabs_au';
import GoalUI from './variable/v_goal_au';


const com = (props) => { 
  let { handler } = props 

  const [isFilter, setFilter] = useState({switch:{value:'collabs'}})

  
  let content_=(<div>Loading ... </div>)

  let goal_=(<GoalUI {...{
    handler: async(i)=>{
      i.type='goal' 
      //console.log("goal handler", i)   
      let data= await handler(i)
      return data
    },
  }} />)
  let influencers_=(<InfluencersUI {...{
    handler: async(i)=>{      
      i.type='influencers' 
      //console.log("influencer handler", i)
      let data= await handler(i)
      return data
    },
  }}/>)
  let collabs_=(<CollabsUI {...{
    handler: async(i)=>{
      i.type='collabs'
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
      {name:'goal', label:'Goal Types', content:goal_},      
      {name:'influencers', label:'Influencers', content:influencers_},  
      {name:'collabs', label:'Collaborations', content:collabs_ }, 
    ],  
    header:{
      title:(<h3>Variable</h3>)
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
