import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import { useDispatch, useSelector } from "react-redux";


import Link from 'next/link'
import Title from '../../title';
import Button from '../../button';
import TabSwitch from '../../tab_switch'; 
import Pagination from '../../blocks/com/pagination';
import DataGridSearch from './search/datagrid_search'
import getStatus from '../../get/status';
import {get_image_src} from '../../get/product';
import {ThumbImage} from '../../blocks/ui/image_u';
import {ItemTimeStamp, general_status_tag, get_id, amount, Refresh} from '../_blocks/ui';


import s from './data_ui.module.scss';
import Moment from 'moment';

const Details = (props) => { 
  let { className, items, flow='col', header={}}=props     
  let items_, c_, ic_, ilc_, ivc_  
  if(flow=='row'){
    c_+=' flex-row '  
    ic_+=' mr-2 bg-black bg-opacity-5 px-3 py-1 rounded-lg '  
    ilc_+=' mr-2  '  
  }else{
    c_+=' flex-col '
    ilc_+=' w-6/12 mr-4  '
    ivc_+=' w-6/12  '
  }
  items_=items.map((i, index)=>{
    let {label, value, type=''}=i
    if(value==0) return false
    if(type=='amount') {
      value=amount({v:value})
      ivc_+=' text-right'
    }else if(type=='timestamp') {
      value=<ItemTimeStamp {...{created_at:value, isSingleLine:true}}/>  
    }

    
    return (
      <div key={index} className={'flex items-center '+ic_}>
        <div className={"opacity-50 "+ilc_}>{label}</div>
        <div className={s.ivc+" "+ivc_}>{value}</div>
      </div>
    )
  })
  const Header = () => {
    let { title }=header ? header : {} 
    return (
      <div className={'flex items-center opacity-25 '+ic_}>{title}</div>
    )
  }
  return (
    <div className={s.details+' w-full '+className}>  
      <Header/>    
      <div className={s.items+" flex w-full "+c_}>
        {items_}
      </div>       
    </div> 
  )
}

const Tabs = (props) => { 
  let {id, active, items, header={}, action, handler}=props  
  const [isF, setF] = props.setF ? [props.isF, props.setF] : useState({switch:{value:active}})
  header = {title:'', ...header}

   console.log("tabs : isF", isF)
  let switch_opt={
    active:isF.switch.value,
    items:items,
    handler: async(i) =>{
      let next={...isF, switch:{value:i.name}} 
      setF(next) 
     // let data = await pagiHandler(next)
      //let total = await pagGetTotal(next)       
      //handler(next)
      console.log("tabs : switch", next)
    },   
    size:'md'
  }
  let items_
  items_=items.map((i, index)=>{
    let {content, name}=i
    if(isF.switch.value!=name) return (<div key={index}></div>)
    return <div key={index}>{content}</div>
  })
  return (
    <div className={s.tabs+' '}>
      <div className={s.header+" flex items-center mb-8"}>
        {header.title && <div className={'mr-8'}>{header.title}</div>}
        <TabSwitch {...switch_opt}/>    
      </div>
      <div className={s.panels+" flex flex-col"}>
        {items_}
      </div>       
    </div> 
  )
}
const Expand = (props) => { 
  let {id, content, action='', action2='', info='', general_status, expand, created_at=''}=props  
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
  let general_status_
  if(general_status!='') general_status_=(<div className={'mt-4'}>{general_status_tag({status:general_status, size:'sm'})}</div>)

  let created_at_, info_
  if(created_at!='') created_at_=(<ItemTimeStamp {...{created_at}}/>)
  if(info!='' || action2!=''){
    info_=(
      <div className={s.info+' flex items-center mt-2 pt-2'}>
        <div className={'flex-grow'}>{info}</div>
        {action2!='' && <div className={s.action2+' flex items-center mx-4 px-4'}>{action2}</div>}
        <div>{icon}</div>        
      </div>
    )
  }
  return (
    <div className={s.expand+' '}>
      <div className={"flex items-center"}>
        <div className={"flex flex-col pr-2"}>
          {id_}   
          {general_status_}       
        </div>
        <div className={s.main+' flex-grow flex items-center'}>
          <div className={'flex-grow '}>{content}</div>
          {action!='' && <div className={'ml-4'}>{action}</div>}
          <div className={'ml-4 flex flex-col items-end'}>
            {created_at_}
            {(info=='' && action2=='') && icon}
          </div>
        </div>
      </div>
      {info_}
      {isE == true && <div className={s.exp+' flex flex-col items-end ml-24'}>        
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
  let {switch_opt=false,  switch2_opt=false, items, header={}, search, handler, setData}=props    
  
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
  let items_
  if(items.length){
    items_ = items.map((i, index)=>{    
      return <div key={index} ><DGItem content={i}/></div>
    })
  }

  let updateHandler = (sq) => {
    console.log("Search", sq)
  }


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
    //console.log("DATA", data) 
    setData(data)    
  } 
  const pagGetTotal = async (i) => {
    //console.log("pagination total", i)     
    let data = await handler({action:'get_total', ...i}) 
    data = parseInt(data) ? data : 0
    setPagiConfig(prev=>({...prev, total:data})) 
    return data
  }
 
  const switch_opt2={    
    active:isFilter.switch ? isFilter.switch.value : '',
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
      console.log("Filter", next)
      return true
    },   
    size:'md'
  } 
  let switch2_
  if(switch2_opt){
    switch2_=(
      <div className={'my-1 mx-2'}>
        <TabSwitch {...{    
          active:isFilter.switch2 ? isFilter.switch2.value : '',          
          items:switch2_opt.items,
          handler: async(i) =>{
            let next={...isFilter, start:1, switch2:{value:i.name}} 
            setFilter(next) 
            let data = await pagiHandler(next)
            let total = await pagGetTotal(next)       
            //switch_opt.handler(next)
            console.log("Filter", next)
            return true
          },   
          size:'sm'
        }}/>
      </div>
    )
  } 
  const Header = () =>{
    let {title, action}=header
    return(
      <div className={"flex items-center mb-8"}>
        <div className={'flex-grow'}>
          {title}
        </div>
        <div>
          {action}
        </div>
      </div>
    )
  }
  const Search = () =>{
    let {placeholder, status_options}=search ? search : {}
    return (<DataGridSearch {...{placeholder, status_options, updateHandler:searchHandler}}/>)
  }
  return (
    <div className={s.data_grid+" "}>
      {header.action && <Header/>}
      <div className={s.top_1+' flex items-start mb-8'}>
        {(!header.action && header.title) && <div className={'mr-4 '}>
          {header.title}
        </div>}
        <div className={'flex-grow '}>
          <Search/>          
        </div>
        <Refresh className={"ml-4 mt-1"} handler={refreshHandler}/>
      </div>
      <div className={s.top_2+' flex items-center mb-8'}>
        <div className={'flex-grow flex flex-wrap items-center'}>
          <div>{switch_opt!=false && <TabSwitch {...switch_opt2}/>}</div>
          {switch2_}
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
}
export { 
  Details,
  Tabs, 
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
