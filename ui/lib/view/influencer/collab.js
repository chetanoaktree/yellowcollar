import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import CollabRefresh from '../../blocks/com/collab_refresh';
import CollabStatus from '../../blocks/com/collab_status';
import CollabAction from '../../blocks/com/collab_action';
import CollabEvent from '../../blocks/com/collab_event';

import Performance from '../../blocks/com/performance';
import CollabDetails from '../../blocks/com/collab_details';
import Price from '../../blocks/com/price';
import Loading from '../../blocks/com/loading';

import {getTreshold}  from '../../get/influencer';
import {treshold_amount as a_treshold_amount, variable as a_variable} from '../admin/action';

import s from './collab.module.scss';
import Moment from 'moment';



const com = ({items, item, tresholds, handler, ikHandler, refreshHandler, messageHandler, acceptHandler, rejectHandler, breakdownHandler, performanceHandler, liveHandler, completedHandler, completedRequestHandler, ...props}) => {
  
 
  let top_=(<div></div>)
  let UserProfile=()=>(<div></div>)

  const {user} = useSelector((state) => state.pageData);

  const myRef = useRef(null)
  const eventsRef = useRef(null)
  const [isMessage, setMessage]= useState("")
  const [isPerformance, setPerformance]= useState(false)
  const [isCollabDetails, setCollabDetails]= useState(false)
  const [isPrice, setPrice]= useState(false)



  let collab_
  
  //console.log("ITEM", item)

  const keyPresshandler = async (event) =>{
    if(event.key === 'Enter' && event.target.value){
      //console.log('enter press here!')        
      item.events.push({type:"influencer_message", content:event.target.value})
      await messageHandler({action:'influencer_message', content:event.target.value, collab_id:item.id})
      refreshHandler({collab_id:item.id})      
      setMessage("")
      myRef.current.scrollTo(0, eventsRef.current.clientHeight) 
      //console.log("ref", eventsRef.current.clientHeight)     
    }    
  }

  const acceptHandler2 = async () =>{
    await acceptHandler({action:'influencer_accept', collab_id:item.id})   
    refreshHandler({collab_id:item.id})
  }
  const rejectHandler2 = async () =>{
    await rejectHandler({action:'influencer_reject', collab_id:item.id})  
    refreshHandler({collab_id:item.id}) 
  }
  const liveHandler2 = async () =>{
    await liveHandler({action:'live', collab_id:item.id})  
    refreshHandler({collab_id:item.id}) 
  }  
  const completedHandler2 = async () =>{
    await completedHandler({action:'completed', collab_id:item.id, meta:{isPaid:false, paid_on:''}})  
    refreshHandler({collab_id:item.id}) 
  }
  const completedRequestHandler2 = async () =>{
    console.log("Request", {action:'completed_request', collab_id:item.id, meta:{video_id:'sdfsfsdfsdf'}})
    await completedRequestHandler({action:'completed_request', collab_id:item.id, meta:{video_id:'sdfsfsdfsdf'}})      
    refreshHandler({collab_id:item.id}) 
  }
  const refreshHandler2 = async () =>{   
    refreshHandler({collab_id:item?.id}) 
  }
  
  const collabDetailsHandler2= async()=>{    
    //collabDetailsHandler({collab_id:item.id}) 
    //console.log("collabDetails")
    setCollabDetails(true)
  }  
  const performanceHandler2 = (i, item) => {
    //console.log("performance", i)
    setPerformance(true)
  }  

  const priceHandler2 = (i, item) => {
    //console.log("price", i)    
    setPrice(true)
  }
    
  useEffect(() => {    
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      console.log("Interval")
      refreshHandler2()  
    }, 20000)

    return () => clearInterval(intervalId); //This is important
  
  }, [])

  useEffect(() => {
    if (eventsRef.current) {
      myRef.current.scrollTo({
        behavior: "smooth",
        top: eventsRef.current.clientHeight
      });     
    }   
  }, [item?.events] );


  if(item){ 
    /*item.influencer=item?.influencer2
    item=getTreshold(item, tresholds)
    item.treshold_amount=a_treshold_amount(item)    
    item.variable=a_variable(item)
    item.total=item?.influencer?.init_fixed_fee + item.variable*/

    const events_=item.events?.map((i, index)=>{     
      return(
        <CollabEvent 
          userType={props.userType} key={index} index={index} i={i} item={item} 
          handler={handler} ikHandler={ikHandler} user={user}
          influencerAcceptHandler={acceptHandler2} influencerRejectHandler={rejectHandler2} breakdownHandler={breakdownHandler} 
          priceHandler={priceHandler2} performanceHandler={performanceHandler2}   
        ></CollabEvent>
      )
    }) 
    if(item.business){
      item.business.company_name= item.business.company_name ? item.business.company_name : item.business.name
      UserProfile=()=>{
        return(
          <div className={s.user_profile}>
            <div className={s.pic}><img className={s.image} src={"/db_images/"+item.business.profile_pic}/></div>
            <div className={s.name}>{item.business.company_name}</div>
          </div>
        )
      }
    }    
    top_=(
      <div className={s.top+' flex items-center  animate__animated animate__fadeIn animate__delay-1s'}> 
        <div className={' flex-grow flex items-center'}>           
          <UserProfile/>          
        </div>
        <div className={'flex items-center'}>    
          <div  className={""}><CollabStatus {...{item, userType:props.userType}}/></div>
          <div  className={"ml-4"}><CollabRefresh {...{item, userType:props.userType, refreshHandler:refreshHandler2}}/></div>          
        </div>
      </div>
    )
    collab_=(
      <div className={s.collab}>
        <div className={s.inner}>
          {top_}
          <div ref={myRef} className={s.middle}>
            <div ref={eventsRef} className={s.events}>
              {events_}
            </div>
            <Loading id="events"></Loading>
          </div>
          
          <div className={s.bottom}>
            <div className={s.bottom_1}>
              <CollabAction className={"mr-4 animate__animated animate__fadeIn animate__delay-2s"} 
                {...{item, userType:props.userType}}
                liveHandler={liveHandler2}
                completedHandler={completedHandler2}
                completedRequestHandler={completedRequestHandler2}
              />             
            </div>
            <div className={s.bottom_2}>            
              <div className={s.input_area}><input value={isMessage} onChange={(e)=>setMessage(e.target.value)} className={s.input} onKeyPress={keyPresshandler} placeholder="Message..."/></div>
            </div>            
          </div>
        </div>   
      </div>    
    )   
  }
    
  

  const collabs_=items?.map((i, index)=>{
    //console.log("i", i)    
    return (
      <Link key={index} href={"/app/collab/"+i.id}>
        <div className={s.item+' animate__animated animate__fadeIn'}>
          <div className={s.image_area}>
            <img className={s.image} src={"/db_images/"+i.business?.profile_pic}/>
          </div>
          <div>
            <div>{i.business?.name}</div>
            <div className={s.product} >{i.product?.title}</div>
          </div>
        </div>
      </Link> 
    )
  })

  

  //console.log('items', items)
  //const collabs_=123
  props.navArgs.translucent=false 
  props.navArgs.noborder=false 
  return (
    <Layout {...props} showShopNav={false}> 
      <div className={s.main}>
        <div className={s.collabs}>
          <div className={s.inner}>
            {collabs_}
          </div>  
        </div> 
        {collab_} 
      </div>
      {item && <Price item={item} isOpen={isPrice} setOpen={setPrice} />}
      {item && <Performance item={item} isOpen={isPerformance} setOpen={setPerformance}/>}
      {item && <CollabDetails item={item} isOpen={isCollabDetails} setOpen={setCollabDetails}/>}
    </Layout>    
  )
}
export default com
