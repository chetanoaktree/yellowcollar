import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import { useDispatch, useSelector } from "react-redux";


import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import TabSwitch from '../../tab_switch'; 
import Pagination from '../../blocks/com/pagination';
import DataGridSearch from './search/datagrid_search'
import getStatus from '../../get/status';
import {get_image_src} from '../../get/product';
import {ThumbImage} from '../../blocks/ui/image_u';
import {get_id, Refresh} from '../_blocks/ui';


import s from './ui.module.scss';
import Moment from 'moment';

import {Expand, Card, DataGrid} from '../_blocks/data_ui';


/*
const Expand = (props) => { 
  let {id, content, action, expand}=props  
  const [isE, setE] = props.setE ? [props.isE, props.setE] : useState(false)
  let icon=(
    <div>
      <div>
        {isE==false && <Button type="default" clickHandler={()=>setE(prev => !prev)}><img src={"/images/Expand_down_light.svg"}/></Button>}
        {isE==true && <Button type="default" color="action_blue" clickHandler={()=>setE(prev => !prev)}><img src={"/images/Expand_up_light.svg"}/></Button>}
      </div>
    </div>
  )
  const id_=(
    <div className={s.id2}>{get_id({id})}</div>
  )
  return (
    <div className={s.expand+' '}>
      <div className={"flex items-center"}>
        <div className={"flex flex-col"}>
          {id_}          
        </div>
        <div className={s.main+' flex-grow flex items-center'}>
          <div className={'flex-grow'}>{content}</div>
          <div className={''}>{action}</div>
          <div className={'ml-4'}>{icon}</div>
        </div>
      </div>
      {isE && <div className={s.exp+' ml-24'}>
        {expand}
      </div>}
    </div> 
  )
}
const Card = (props) => {
  let {content}=props  
  return (    
    <div className={s.card}>
      <div className={s.inner}>
        {content}
      </div>
    </div>    
  )
}
const DGItem = (j) => {
  let {content, key}=j
  return(
    <div key={key} className={s.item+" flex"}>
      <div className={"mr-4 mt-4"}><CheckBox /></div>
      <div className={"flex-grow"}>{content}</div>
    </div>
  )
}
const CheckBox = (j) => {
  const [isChecked, seChecked] = useState(false)
  return (
    <span className={s.checkbox} onClick={()=>seChecked(prev=>!prev)}>
      <input type="checkbox" checked={isChecked} onChange={()=>{}}/>
      <span></span>
    </span>
  )
}


const DataGrid = (props) => { 
  let {switch_opt=false, items, handler, setData}=props    
  
  const [isPagiConfig, setPagiConfig] = props.setFilter ? [props.isPagiConfig, props.setPagiConfig] : useState({total:0, result:0, limit:10})
  const [isFilter, setFilter] = props.setFilter ? [props.isFilter, props.setFilter] : useState({switch:{value:''}, start:1, end:10})
  //const [isFilter, setFilter] = useState({switch:{value:''}, start, end})
  //const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit})
  
  useEffect(async () => { 
     await refreshHandler()  
  }, []); 
  
  const test =()=>{
    console.log("TEST")
  }
  let items_=items.map((i, index)=>{    
    return <div key={index} ><DGItem content={i}/></div>
  })

  let updateHandler = (sq) => {
    console.log("Search", sq)
  }
  let product_status_options=[]

  const refreshHandler=async()=>{
    await pagiHandler(isFilter)
    await pagGetTotal(isFilter)      
  }
  const searchHandler = async (i) => {
    //console.log("search", i)     
    let data = await handler({action:'get', ...i}) 
    setData(data)     
  } 
  const pagiHandler = async (i) => {
    //console.log("pagination", i)     
    let data = await handler({action:'get', ...i})  
    setData(data)    
  } 
  const pagGetTotal = async (i) => {
    //console.log("pagination total", i)     
    let data = await handler({action:'get_total', ...i}) 
    setPagiConfig(prev=>({...prev, total:data})) 
    return data
  }
 
  const switch_opt2={    
    active:isFilter.switch.value,
    items_bk:[
      {label:'All', name:''},      
      {label:'Awaiting Processing', name:'awaiting_processing' },           
    ],  
    items:switch_opt.items,
    handler: async(i) =>{
      let next={...isFilter, start:1, switch:{value:i.name}} 
      setFilter(next) 
      let data = await pagiHandler(next)
      let total = await pagGetTotal(next)       
      //switch_opt.handler(next)
    },   
    size:'md'
  } 

  return (
    <div className={s.data_grid+" "}>
      <div className={s.top_1+' flex mb-8'}>
        <div className={'flex-grow '}>
          <DataGridSearch {...{product_status_options, updateHandler:searchHandler}}/>          
        </div>
        <Refresh className={"ml-4 mt-2"} handler={refreshHandler}/>
      </div>
      <div className={s.top_2+' flex items-center mb-8'}>
        <div className={'flex-grow flex'}>
          <div>{switch_opt!=false && <TabSwitch {...switch_opt2}/>}</div>
        </div>
        <div className={''}>
          <Pagination {...{isConfig:isPagiConfig, isFilter, setFilter, updateHandler:pagiHandler}} />
        </div>
      </div>
      <div className={s.center}>
        {items_}
      </div>      
    </div> 
  )
}*/
export {  
  Card,
  Expand,
  DataGrid
}
/*
let Card_args={
  content:(<Expand {...Expand_args}/>)
}

let Expand_args={
  id,      
  content:content_,
  action:action_,
  expand:expand_,
  isE, setE,      
}
*/


/*
const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:10})
const [isFilter, setFilter] = useState({switch:{value:''}, start:1, end:10})
const [isData, setData] = useState([])  

let DG_args={    
  isFilter, setFilter,  
  isPagiConfig, setPagiConfig,
  setData,    
  items,     
  search_extract:{
    product:true,
    influencer:true,
    business:true,
  },
  switch_opt:{
    items:[
      {label:'All', name:''},      
      {label:'New', name:'new' },
      {label:'New Changes', name:'new_changes'},
      {label:'Not Added', name:'not_added'},
      {label:'Added', name:'added'}
    ],
    active:'awaiting_processing',
    handler:async(i)=>{
      console.log("BL_switch habdler", i)
    }        
  }
}
*/
