import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { APP_SET} from "/store/types";

import Link from 'next/link'
import Title from '../../title';
import Button from '../../button';
import TabSwitch from '../../tab_switch'; 
import Pagination from '../../blocks/com/pagination';
import ProductGridSearch from './search/productgrid_search'
import getStatus from '../../get/status';
import {get_image_src} from '../../get/product';
import {ThumbImage} from '../../blocks/ui/image_u';
import {get_id, Refresh} from '../_blocks/ui';


import s from './products_ui.module.scss';
import Moment from 'moment';

const Details = (props) => { 
  let { items, flow='col', header={}}=props     
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
    let {label, value}=i    
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
    <div className={s.details+' w-full'}>  
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
  let {id, content, action='', expand}=props  
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
          <div className={'flex-grow '}>{content}</div>
          {action!='' && <div className={'ml-4'}>{action}</div>}
          <div className={'ml-4'}>{icon}</div>
        </div>
      </div>
      {isE == true && <div className={s.exp+' ml-24'}>
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
const PGItem = (j) => {
  let {content, index}=j
  return(
    <div>{content}</div>
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
  let {switch_opt=false, items, header={}, search, handler, setData}=props    
  
  const [isPagiConfig, setPagiConfig] = props.setFilter ? [props.isPagiConfig, props.setPagiConfig] : useState({total:0, result:0, limit:10})
  const [isFilter, setFilter] = props.setFilter ? [props.isFilter, props.setFilter] : useState({switch:{value:''}, start:1, end:10})
  //const [isFilter, setFilter] = useState({switch:{value:''}, start, end})
  //const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit})

  const dispatch = useDispatch();  
  const {app} = useSelector((state) => state.pageData);
  
  useEffect(async () => { 
     let d=app.products ? app.products : {} 
     if(!d.data) {        
        await refreshHandler()
     }else{
        setFilter(d.filter ? d.filter : {} )   
        setPagiConfig(d.pagination ? d.pagination : {} )   
        setData(d.data)   
        setPagiConfig(prev=>({...prev, total:d.total ? d.total : 0})) 
     }    
     console.log('d',d) 
  }, []); 
  
  const test =()=>{
    console.log("TEST")
  }
  let items_
  if(items.length){
    items_ = items.map((i, index)=>{    
      return <div key={index}  className={s.item+" w-6/12 lg:w-3/12  px-2 pb-20"} ><PGItem content={i}/></div>
    })
  }

  let updateHandler = (sq) => {
    console.log("Search", sq)
  }
  let product_status_options=[]

  const updateCache=(d_)=>{
    let d=app.products ? app.products : {}    
    d={...d, ...d_}
    dispatch({
      type: APP_SET,
      payload: {products:d},
    });  
  }
  const refreshHandler=async()=>{    
    await pagiHandler(isFilter)
    await pagGetTotal(isFilter)     
  }
  const searchHandler = async (i) => {
    console.log("search", i)     
    let data = await handler({action:'get', ...i}) 
    console.log("Search Data", data) 
    setData(data)     
  }   
  const pagiHandler = async (i) => {
    //console.log("pagination", i)       
    let data = await handler({action:'get', ...i}) 
    console.log("Pagi Data", data) 
    setData(data) 
    updateCache({data, filter:i})        
    return data  
  } 
  const pagGetTotal = async (i) => {
    //console.log("pagination total", i)     
    let data = await handler({action:'get_total', ...i}) 
    setPagiConfig(prev=>({...prev, total:data})) 
    updateCache({total:data, pagination:isPagiConfig})    
    return data
  }
 
  const switch_opt2={    
    active:(isFilter.switch && isFilter.switch.value) ? isFilter.switch.value : '',
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
    let {placeholder, categories_options}=search ? search : {}    
    return (<ProductGridSearch {...{placeholder, categories_options,  updateHandler:searchHandler}}/>)
  }
  return (
    <div className={s.data_grid+" "}>
      {header.action && <Header/>}
      <div className={s.top_1+' flex mb-8'}>
        {(!header.action && header.title) && <div className={'mr-4'}>
          {header.title}
        </div>}
        <div className={'flex-grow '}>
          <Search/>          
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
      <div className={s.center+' flex flex-wrap'}>
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
