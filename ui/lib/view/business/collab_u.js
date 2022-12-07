import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import CollabRefresh from '../../blocks/com/collab_refresh';
import CollabStatus from '../../blocks/com/collab_status';
import CollabAction from '../../blocks/com/collab_action';

import CollabEvent from '../../blocks/com/collab_event';
import Performance from '../../blocks/com/performance';
import Price from '../../blocks/com/price';
import CollabDetails from '../../blocks/com/collab_details';
import Loading from '../../blocks/com/loading';
import {getTreshold}  from '../../get/influencer';
import {treshold_amount as a_treshold_amount, variable as a_variable} from '../admin/action';

import Checkout from '../_blocks/checkout';


import s from './collab_u.module.scss';
import Moment from 'moment';



const com = ({items, isPW, item, tresholds, handler, ikHandler, collaborateHandler, refreshHandler,  messageHandler, acceptHandler, initPaymentPaidHandler, paidHandler, breakdownHandler, performanceHandler, ...props}) => {
  
  let top_=(<div></div>)
  let UserProfile=()=>(<div></div>)

  const {user} = useSelector((state) => state.pageData);

  const myRef = useRef(null)
  const eventsRef = useRef(null)
  const [isMessage, setMessage]= useState("")
  const [isPerformance, setPerformance]= useState(false)
  const [isCollabDetails, setCollabDetails]= useState(false)
  const [isPrice, setPrice]= useState(false)
  const [isPriceItem, setPriceItem]= useState({})
  

  console.log("item", item)
  
  let collabs_
  let collab_
  let accept_
 
  const keyPresshandler = async (event) =>{
    if(event.key === 'Enter'  && event.target.value){
     //console.log('enter press here!')   
      item.events.push({type:"business_message", content:event.target.value})   
      await messageHandler({action:'business_message', content:event.target.value, collab_id:item.id})
      refreshHandler({collab_id:item.id})
      setMessage("")
      myRef.current.scrollTo(0, eventsRef.current.clientHeight) 
    }    
  }

  const acceptHandler2 = async () => {
    await acceptHandler({action:'business_accept', collab_id:item.id})
    refreshHandler({collab_id:item.id})
  }  
  
  const refreshHandler2= async()=>{    
    await refreshHandler({collab_id:item.id}) 
  }

  const collaborateHandler2 = async (i) => {
    await collaborateHandler({action:'collaborate', collab_id:item.id, meta:i})
    refreshHandler({collab_id:item.id}) 
  }

  //popups
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
    setPriceItem(i)
    setPrice(true)
  }

  
  useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      console.log("Interval")
      refreshHandler2()  
    }, 30000)

    return () => clearInterval(intervalId); //This is important
  
  }, [])

  useEffect(() => {
    if (eventsRef.current) {
      myRef.current.scrollTo({
        behavior: "smooth",
        top: eventsRef.current.clientHeight
      });
      //myRef.current.scrollTo(0, eventsRef.current.clientHeight) 
    }   
  }, [item.events] );
    
  
  if(item){    
    /*item.influencer=item.influencer2
    item=getTreshold(item, tresholds)
    item.treshold_amount=a_treshold_amount(item)    
    item.variable=a_variable(item)
    item.total=item?.influencer?.init_fixed_fee + item.variable*/
    //console.log("item", item)

    const initPaymentPaidHandler2= async ()=>{      
      await initPaymentPaidHandler({action:'init_payment_paid', collab_id:item.id, business_id:item.business_id, influencer_id:item.influencer_id, amount:item.total_init_payment, sub_total:item.base, tax:item.init_tax, platform_fee:item.init_platform_fee})
      refreshHandler({collab_id:item.id}) 
    }
    const paidHandler2= async ()=>{
      await paidHandler({action:'paid', collab_id:item.id, business_id:item.business_id, influencer_id:item.influencer_id, amount:item.total_balance_fee, sub_total:item.balance_fee, tax:item.tax, platform_fee:item.platform_fee})
      refreshHandler({collab_id:item.id})  
    }

    if(item.influencer){
      UserProfile=()=>{
        let image =item.influencer.profile_pic ? "/db_images/users/"+item.influencer.profile_pic : '/images/User_light.svg'
        return(
          <div className={s.user_profile}>
            <div className={s.pic}><img className={s.image} src={image}/></div>
            <div className={s.name}>{item.influencer.name}</div>
          </div>
        )
      }
    }
    const events_=item?.events?.map((i, index)=>{     
      return(
        <CollabEvent 
          userType={props.userType} key={index} index={index} i={i} item={item} 
          handler={handler} ikHandler={ikHandler} user={user}
          initPaymentPaidHandler={initPaymentPaidHandler2} paidHandler={paidHandler2} breakdownHandler={breakdownHandler} 
          priceHandler={priceHandler2} performanceHandler={performanceHandler2}          
        >
        </CollabEvent>
      )
    })  
   
    
      
    accept_=item.status=="requested" ? (<div className={s.action_area}><img onClick={acceptHandler2} className={s.accept} src="/images/image 41.svg"/></div>) : ''  
    
    //let fixed_fee=item.influencer?.init_fixed_fee
    top_=(
      <div className={s.top+' flex items-center  animate__animated animate__fadeIn animate__delay-1s'}> 
        <div className={' flex-grow flex items-center'}>           
          <UserProfile/>
          <div  className={s.fixed_fee}>Fixed fee : Rs {item.base} </div>
          <div  className={s.upto}>Can go upto : Rs {item.capped ? item.capped : 0}</div>
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
              <CollabAction className={"mr-4 animate__animated animate__fadeIn animate__delay-2s"} {...{item, userType:props.userType}}
                paidHandler={paidHandler2}
                initPaymentPaidHandler={initPaymentPaidHandler2} 
                collabDetailsHandler={collabDetailsHandler2}
              />              
            </div>
            <div className={s.bottom_2}>
              {accept_}
              <div className={s.input_area}><input value={isMessage} onChange={(e)=>setMessage(e.target.value)} className={s.input} onKeyPress={keyPresshandler} placeholder="Message..."/></div>
            </div>
          </div>
        </div>   
      </div>        
    ) 
    
    //console.log(eventsRef.current.clientHeight)
    //myRef.current ? myRef.current.scrollTo(0, eventsRef.current.clientHeight) : false 
    //myRef.current.scrollTo(0, eventsRef.current.clientHeight+5000) 
    setTimeout(() => {  //assign interval to a variable to clear it.
      //console.log(eventsRef.current.clientHeight)
      //myRef.current ? myRef.current.scrollTo(0, eventsRef.current.clientHeight) : false 
     // myRef.current.scrollTo(0, eventsRef.current.clientHeight) 
     //myRef.current.scrollTo(0, 1000000000000) 
    },5000)
  }  
  

  collabs_=items.map((i, index)=>{
    i.influencer=i.influencer2
    i=getTreshold(i, tresholds)
    //console.log("i", i)
    if(i.status=="rejected") return(<></>)
    //console.log("indicator", i)
    let image = i.influencer.profile_pic ? "/db_images/users/"+i.influencer.profile_pic : '/images/User_light.svg'
    let _c=item.id==i.id ? s.active : ''
    return (
      <Link key={index} href={"/app/collab/"+i.id}>
        <div className={s.item+' animate__animated animate__fadeIn '+ _c}> 
          <div className={s.image_area}>
            <img className={s.image} src={image}/>
            {i.status == "requested" && <div className={s.indicator}></div>}
          </div>
          <div>
            <div>{i.influencer?.name}</div>
            <div className={s.product} >{i.product?.title}</div>
          </div>
        </div>
      </Link> 
    )
  })
 
 
  return (
    <Layout {...props} showShopNav={false} viewType="business_app"> 
      <div className={s.main}>
        <div className={s.collabs} >
          <div className={s.inner}>
            {collabs_}                    
          </div>  
        </div>
        {collab_} 
      </div>
      
      {item && <Price item={item} isOpen={isPrice} setOpen={setPrice} />}
      {item && <Performance item={item} isOpen={isPerformance} setOpen={setPerformance}/>}
      {item && <CollabDetails item={item} isOpen={isCollabDetails} setOpen={setCollabDetails} collaborateHandler={collaborateHandler2}/>}
      <Checkout isPW={isPW}/>  
    </Layout>    
  )
}
export default com
