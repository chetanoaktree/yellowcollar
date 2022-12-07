import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input'; 
import User from '../../blocks/com/user';
import { usePage } from "../../hooks/usePage";

import EditInfluencer from '../../blocks/admin/edit_influencer';
import Performance from '../../blocks/admin/performance';
import EditPerformance from '../../blocks/admin/edit_performance';
import EditInfluencerDemographic from './popups/edit_influencer_demographic';

import {variable, performance} from './action';
import s from './index_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


const com = ({collabs, tresholds, matchHandler, handler, getHandler, ...props}) => {  
  //console.log("items", items) 
  const [isEditInfluencerDemographic, setEditInfluencerDemographic]= useState(false)
  const [isEditInfluencer, setEditInfluencer]= useState(false)
  const [isPerformance, setPerformance]= useState(false)
  const [isEditPerformance, setEditPerformance]= useState(false)
  
  const [isPerformanceItem, setPerformanceItem]= useState({})

  const [isItem, setItem]= useState({})

   const page=usePage()
 
   console.log("page2", page)

  console.log("tresholds", tresholds) 
  let out_


  
  
  const Total=(item)=>{ 
    let base=item.influencer.init_fixed_fee
    let variable_=variable(item)
    let total=base+variable_
    return(
      <div className={'flex flex-col'}>
        <div>Base : {base}</div>  
        <div>Variable : {variable_}</div>  
        <div>Total : {total}</div>      
      </div>  
    )
  }
  const Percentage=(item)=>{     
    let out=performance(item) 
    return(
      <div>{out}%</div>  
    )
  }
  
  const matchHandler2= async (item, match)=>{
    await matchHandler({action:'update_match', collab_id:item.id, match})
  }

  
  const editInfluencerHandler= async (item)=>{
    setItem(item)
    setEditInfluencer(true)
  }
  const editInfluencerDemographicHandler= async (item)=>{
    setItem(item)
    setEditInfluencerDemographic(true)
  }

  const performanceHandler= async (item)=>{
    console.log("p", item)
    setPerformanceItem(item)
    setPerformance(true)
  }
  const editPerformanceHandler= async (item)=>{
    console.log("p", item)
    setPerformanceItem(item)
    setEditPerformance(true)
  }

  const updatePerformanceHandler = async (i)=>{    
    await handler({...i, action:"update_performance"})     
  }
  const updateInfluencerHandler = async (i)=>{
    console.log("update_influencer", i)
    handler({...i, action:"update_influencer"})
  }  

  const Item=({item})=>{   
    let treshold=_.filter(tresholds, ['id', item.influencer_id]) 
    item.influencer=item.influencer2
    item.treshold=treshold[0] ? treshold[0] : {}

    //console.log("item", item)
    //console.log("tresholds", tresholds)
    
    return(
      <div className={s.item}>
        <div className={s.order_a+" flex items-center"}>
          <div className={s.orderId+' font-able'}><span>{item.id}</span></div>
        </div>
        <div className={s.business_a+" flex flex-col justify-center items-center"}>
          <User {...item.business} size="sm"/>
          <h6>{item.business.name}</h6>
        </div>
        <div className={s.user_a+" flex items-center"}>
          <User {...item.influencer} size="md"/>
          <div className="ml-4">
            <h5>{item.influencer.name}</h5>
            <h6>{item.product.title}</h6>
            <div className={"flex items-center"}>
              <Button className="mt-4 mr-2" type="action2" size="sm" color="white" clickHandler={()=>editInfluencerHandler(item)}>Treshold</Button>
              <Button className="mt-4" type="action2" size="sm" color="white" clickHandler={()=>editInfluencerDemographicHandler(item)}>Demographic</Button>
            </div>
          </div>
        </div>        
        <div className={s.match_a+" flex items-center"}>
          <Input value={item.match} changeHandler={(v)=>matchHandler2(item, v)}/>
        </div>
        <div className={s.performance_a+" flex flex-col justify-center items-center"}>
          <Button className="mt-4" type="link" clickHandler={()=>performanceHandler(item)}><Percentage {...item}/></Button>
          <div className="mt-4 flex items-center">
            <Button className="mt-4 mr-2" type="action2" size="sm" color="white"  clickHandler={()=>editPerformanceHandler(item)}>Performance</Button>
            {/*<Button className="mt-4" type="action2" size="sm" color="white"  clickHandler={()=>performanceHandler(item)}>View</Button>*/}
          </div>
        </div>
        <div className={s.total_a+" flex flex-col justify-center items-center"}>
          <Total {...item}/>          
        </div>
        <div className={s.action_a+" flex items-center"}>
          <Button type="action2" color="blue" clickHandler={()=>{}}>Edit</Button>
        </div>
      </div>  
    )
  }
  if(collabs){    
    let items_=collabs.map((i, index)=>{
      //console.log("item", i)
      return(
        <Item key={index} item={i}></Item>
      )
    }) 
    let headings_=(
      <div className={s.headings+' flex items-center'}>
        <div className={s.order_a}>ID</div>
        <div className={s.business_a}>Business</div>
        <div className={s.user_a}>Influencer</div> 
        <div className={s.match_a}>Match</div> 
        <div className={s.performance_a}>Performance</div> 
        <div className={s.total_a}>Total</div> 
        <div className={s.action_a}>Action</div>        
      </div>
    ) 
    out_=(
      <div>
        {headings_}
        {items_}
        <EditInfluencer isOpen={isEditInfluencer} setOpen={setEditInfluencer} item={isItem} updateInfluencerHandler={updateInfluencerHandler} />
        <Performance isOpen={isPerformance} setOpen={setPerformance} item={isPerformanceItem}/>
        <EditPerformance isOpen={isEditPerformance} setOpen={setEditPerformance} item={isPerformanceItem} updatePerformanceHandler={updatePerformanceHandler}/>
        <EditInfluencerDemographic isOpen={isEditInfluencerDemographic} setOpen={setEditInfluencerDemographic} item={isItem} getHandler={getHandler} />  
      </div>
    ) 
  }
  return (
    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main}>        
        {out_}
      </div>            
    </Layout>    
  )
}
export default com
