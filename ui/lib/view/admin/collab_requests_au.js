import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import User from '../../blocks/com/user';
import TabSwitch from '../../tab_switch'; 
import CollabRequestSearch from './search/collab_request_search'
import {extract_items} from '../../../../components/get/search';
import { usePage } from "../../hooks/usePage";

import s from './collab_requests_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


const com = ({handler, getData,  ...props}) => { 

  const dispatch = useDispatch();  
  const {data} = useSelector((state) => state.pageData); 

  useEffect(async () => { 
     let data = await getData() 
     setData((prev)=>data)  
     return(()=>{
       setType(false);
     })   
  }, []); 
  
  
  //STATES 
  
  const [isData, setData]= useState([]) 
  const [isType, setType] = useState(true)
  const [isProcess, setProcess] = useState('')

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
  const Headings=()=>{    
    return(
      <div className={s.headings}>
        <div className={s.business_a}>Business</div> 
        <div className={s.product_a}>Product</div> 
        <div className={s.name_a}>Influencer</div>        
        <div className={s.match_a}>Match</div> 
        <div className={s.action_a}></div>   
      </div>
    )
  }
  const Item=(i)=>{
    const {influencer, business, product, match}=i
    return(
      <div className={s.item}>
        <div className={s.business_a}>
          <User {...business} size="sm" />          
        </div> 
        <h6 className={s.product_a}>{product.title}</h6> 
        <div className={s.name_a}>
          <User {...influencer} size="sm" className={"mr-2"}/>
          <h6 className={s.name}>{influencer.name}</h6>
        </div>               
        <div className={s.match_a}>{match}%</div> 
        <div  className={s.action_a}>
          <Button isProcessing={processing("reject"+i.id)} className={"mr-2"} type="action2" color="red" clickHandler={()=>decline(i)}>Decline</Button>
          <Button isProcessing={processing("approve"+i.id)} type="action2" color="blue" clickHandler={()=>approve(i)}>Approve</Button> 
        </div>      
      </div>
    )
  }
  const items_=isData.map((i, index)=>{
    return(
      <Item key={index} {...i}/>
    )
  })

  const updateHandler = async (i) => {    
    i=extract_items(i, [
      {find:'collab_status', get:'collab_status', get_type:'object'},
      {find:'influencer', get:'influencer_name', get_type:'string'},
      {find:'influencer_id', get:'influencer_id', get_type:'string'},
      {find:'product', get:'product_name', get_type:'string'},
      {find:'product_id', get:'product_id', get_type:'string'}
    ]) 
    console.log("i", i)
    let data = await getData(i) 
    setData((prev)=>data)  
  }  
  const collab_status_options=[
    {label:'All', value:''},    
    {label:'Pending', value:'pending'},  
    {label:'Declined', value:'declined'}, 
    {label:'Approved', value:'approved'},   
  ]
  return (
    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main}>        
        <h3 className={"mb-4"}>Collab Requests</h3>
        <CollabRequestSearch {...{collab_status_options, updateHandler}}/>
        <div className={s.content}>
          <Headings/>
          {items_}
        </div>  
      </div>            
    </Layout>    
  )
}
export default com
