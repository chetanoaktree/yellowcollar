import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import User from '../../blocks/com/user';
import Pagination from '../../blocks/com/pagination';
import TabSwitch from '../../tab_switch'; 
import CollaborationsSearch from './search/collaborations_search'

import {variable, performance} from './action';
import { usePage } from "../../hooks/usePage";

import {CONSTANTS, collab_status_options, itemLayout, getID, getEventDate, getPaymentDetails, tag, status_tag, collab_main_status_tag,  percentage_tag,  act_item,  act_arrow,  dot, gradient} from '../_blocks/collaboration';

import s from './collaborations_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'



const com = ({handler, ...props}) => { 

  const dispatch = useDispatch();  
  const {data} = useSelector((state) => state.pageData); 

  const levels={
    requested:1,
    business_accepted:2,
    influencer_accepted:3,
    collaborate:3,
    init_payment:3,
    init_payment_paid:5,
    share_link:6,
    live:7,
    completed:8,
    paid:9,
  }
  
  //STATES   
  const [isData, setData]= useState([])  
  const [isFilter, setFilter] = useState({collab_status:{value:''}, start:1, end:3})
  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:3})
  const [isProcess, setProcess] = useState('')  

  useEffect(async () => { 
     let data = await handler({action:'get', ...isFilter}) 
     setData((prev)=>data)  
     return(()=>{
       setType(false);
     })   
  }, []); 

  useEffect(async () => { 
     let data = await handler({action:'get_total', ...isFilter}) 
     setPagiConfig(prev=>({...prev, total:data}))       
  }, []); 

  const approve= async(i)=>{
    setProcess("approve"+i.id)
    await handler({action:"approve", ...i})
    let data = await getData() 
    setData((prev)=>data)  
    setProcess("")
  }
  const decline= async(i)=>{
    setProcess("reject"+i.id)
    await handler({action:"decline", ...i})
    let data = await getData() 
    setData((prev)=>data)  
    setProcess("")
  }

 

  const processing=(action)=>{
    return action==isProcess ? true : false
  }
  // HANDLERS
  const updateHandler2=()=>{
    approveHandler(isTestData)
  }
  const Item=(i)=>{
    
    const {influencer, business, product, match}=i

    let performance_percent=performance(i)
    let gradient_=gradient({status:i.status})  
    let created_at=Moment(i.created_at).format('MMMM Do YYYY')

    let completed_at
    
    if(i.status=='paid') completed_at=getEventDate({type:'paid', i})
    let {total_amount, to_platform, to_business} = getPaymentDetails({i})
  
    //let total_amount='Rs. 1600'
    //let to_platform='Rs. 24'
    //let to_business='Rs. 1400'

    const status_=collab_main_status_tag(i)
    
    const id_=(
      <div className={''}>
          <div className={' mb-2'}>{status_} </div> 
          {getID(i)} 
      </div>
    )
    business.company_name = business.company_name ? business.company_name : business.name
    const profiles_=(
      <div className={s.profile}>
        <div className={s.business_a+' flex items-center mb-2'}>
          <User {...business} size="sm" className={"mr-4"}/>
          <div className={s.name}>{business.company_name}</div>          
        </div> 
        <div className={s.name_a+' flex  items-center'}>
          <User {...influencer} size="sm" className={"mr-4"}/>
          <div className={s.name}>{influencer.name}</div>
        </div> 
        <div className={s.sep+' my-4'}></div> 
        <div className={s.data}>
          <div className={s.label}>Influencer Match : </div>
          <div className={s.value}> {percentage_tag(i.match)}</div>
        </div> 
        <div className={s.data}>
          <div className={s.label}>Product : </div>
          <div className={s.value}>{product.title}</div>
        </div>      
      </div>
    )
    const activity_=(
      <div className={s.activity+' flex flex-col'}>
        <div className={s.top2+' flex'}>          
          <div className={'mr-2'}>{tag({label:'Started on '+created_at, size:'sm'})}</div>
          {i.status=='paid' && <div>{tag({label:'Completed on '+completed_at, size:'sm', color:'green'})}</div>}
        </div>
        <div className={s.bottom2+' py-8 px-4 flex flex-wrap justify-center items-center'}>
          <div>{act_item({label:'Requested', date:'2nd june', level:0, status:i.status, i})}</div>
            <div>{act_arrow({level:CONSTANTS.business_accepted, status:i.status})}</div>         
          <div>{act_item({label:'Business Accepted', date:'2nd june', level:CONSTANTS.business_accepted, status:i.status, i})}</div>
            <div>{act_arrow({level:CONSTANTS.influencer_accepted, status:i.status})}</div>
          <div>{act_item({label:'Influencer Accepted', date:'2nd june', level:CONSTANTS.influencer_accepted, status:i.status, i})}</div>
            <div>{act_arrow({level:CONSTANTS.init_payment_paid, status:i.status})}</div>
          <div>{act_item({label:'Init Payment', date:'2nd june', level:CONSTANTS.init_payment_paid, status:i.status, i})}</div>
            <div>{act_arrow({level:CONSTANTS.live, status:i.status})}</div>         
          <div>{act_item({label:'Promotion Live', date:'2nd june', level:CONSTANTS.live, status:i.status, i})}</div>
            <div>{act_arrow({level:CONSTANTS.completed, status:i.status})}</div>
          <div>{act_item({label:'Promotion Completed', date:'2nd june', level:CONSTANTS.completed, status:i.status, i})}</div>
            <div>{act_arrow({level:CONSTANTS.paid, status:i.status})}</div>
          <div>{act_item({label:'Paid', date:'2nd june', level:CONSTANTS.paid, status:i.status, i})}</div>            
        </div>   
      </div>
    )
    const details_=(
      <div className={s.details}>
        <div className={s.data}>
          {status_tag(i.status)}         
        </div> 
        
        {total_amount >0 && 
        <div>
          <div className={s.data}>
            <div className={s.label}>Total Amount : </div>
            <div className={s.value+' '+s.total_amount}> Rs. {total_amount}</div>
          </div> 
          <div className={s.data}>
            <div className={s.label}>To Platform : </div>
            <div className={s.value}> Rs. {to_platform}</div>
          </div> 
          <div className={s.data}>
            <div className={s.label}>To Business : </div>
            <div className={s.value}> Rs. {to_business}</div>
          </div> 
        </div>
        }
        <div className={s.sep+' my-4'}></div> 
        <div className={s.data}>
          <div className={s.label}>Created : </div>
          <div className={s.value}> {created_at}</div>
        </div> 
        <div className={s.data}>
          <div className={s.label}>Performance : </div>
          <div className={s.value}> {percentage_tag(performance_percent)}</div>
        </div>         
      </div>
    )
    const track_=(
      <div className={s.track} style={{backgroundImage:'linear-gradient('+gradient_+')'}}>
        {dot({level:CONSTANTS.requested, status:i.status})}
        {dot({level:CONSTANTS.business_accepted, status:i.status})}
        {dot({level:CONSTANTS.influencer_accepted, status:i.status})}
        {dot({level:CONSTANTS.collaborate, status:i.status})}
        {dot({level:CONSTANTS.init_payment_paid, status:i.status})}
        {dot({level:CONSTANTS.live, status:i.status})}
        {dot({level:CONSTANTS.completed, status:i.status})}
        {dot({level:CONSTANTS.paid, status:i.status})}   
      </div>
    )
    const empty_=(
      <div className={s.empty}>
        <div className={s.product_a}>{i.match_test}</div> 
      </div>
    )
    return itemLayout({id:id_, profiles:profiles_, activity:activity_, details:details_, track:track_, empty:empty_})
    /*return(
      <div className={s.item+' flex flex-col px-4 py-4 mb-4'}>
        <div className={s.top+ ' flex mb-2'}>
          <div className={s.id_a+' flex flex-col mr-2'}>
            <div className={' mb-2'}>{status_} </div> 
            {getID(i)} 
          </div>
          <div className={s.profiles_a+' mr-2'}>
            {profiles_}   
          </div>
          <div className={s.activity_a+' flex-grow mr-2'}>
            {activity_}   
          </div>
          <div className={s.details_a+' mr-2'}>
            {details_}   
          </div> 
          
        </div>  
        <div className={s.bottom+' flex items-center'}>  
          <div className={s.track_a+' mr-2'}>{track_}</div>
          <div className={s.empty_a+' flex-grow'}>{empty_}</div>
        </div> 
      </div>
    )*/
  }  
  let items_

  if(isData && isData.length){
    items_=isData.map((i, index)=>{
      return(
        <Item key={index} {...i}/>
      )
    })
  }
  const updateHandler = async (i) => {    
    console.log("i", i)   
    let data = await handler({action:'get', ...i}) 
    setData((prev)=>data)  
  }  
  /*const collab_status_options=[
    {label:'All', value:''},    
    {label:'Business Accepted', value:'business_accepted'},  
    {label:'Influencer Accepted', value:'influencer_accepted'}, 
    {label:'Init Payment Paid', value:'init_payment_paid'},    
    {label:'Promotion Live', value:'live'}, 
    {label:'Promotion Completed', value:'completed'},  
    {label:'Paid', value:'paid'}, 
  ]*/
  let collab_status=isFilter.collab_status? isFilter.collab_status.value : '' 
  const status_opt={    
    active:collab_status,
    items:[
      {label:'All', name:''},      
      {label:'Business Accepted', name:'business_accepted'},
      {label:'Influencer Accepted', name:'influencer_accepted'},
      {label:'Init Payment Paid', name:'init_payment_paid'},      
      {label:'Promotion Live', name:'live'},    
      {label:'Promotion Completed', name:'completed'},      
      {label:'Final Payment Paid', name:'paid'}
    ],   
    handler: async(i) =>{
      let next={...isFilter, start:1, collab_status:{value:i.name}}      
      setFilter(next)
      let data = await pagiHandler(next)
      let total_data = await pagGetTotal(next) 
      setPagiConfig(prev=>({...prev, total:total_data}))   
    },   
    size:'md'
  }  

  const pagiHandler = async (i) => {
    console.log("pagination", i)     
    let data = await handler({action:'get', ...i}) 
    setData(data) 
  }
  const pagGetTotal = async (i) => {
    console.log("pagination", i)     
    let data = await handler({action:'get_total', ...i}) 
    return data
  }
  return (
    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main}>   
        <div className={s.container}>     
          <h3 className={"mb-4"}>Collaborations</h3>          
          <CollaborationsSearch {...{collab_status_options, updateHandler}}/>          
          <div className={"flex items-center mb-4"}><TabSwitch {...status_opt}/></div> 
          <div className={"flex items-center mb-4"}>
            <div className="flex-grow"></div>
            <Pagination {...{isConfig:isPagiConfig, isFilter, setFilter, updateHandler:pagiHandler}} />
          </div>
          <div className={s.content}>            
            {items_}
          </div>
        </div>  
      </div>            
    </Layout>    
  )
}
export default com
