import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import getStatus from '../../get/status';
import s from './orders_u.module.scss';
import Moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import PrintSale from '../../print/sale';

import {status_tag, get_message} from '../_blocks/sale';




const com = ({items, ...props}) => { 
  //if(!items) return(<div></div>)
  //console.log("randomstring", randomstring(7))
  //console.log("sales2", items)
  let items_
  const[isPrint, setPrint] = useState(false )  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
  });
  const doo = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(()=>{
    if(isPrint)  doo()
  }, [isPrint])

  const order_items = (its) => {
    let st = "completed", st_set=false
    let its_=its.map((i, index)=>{
      let stauts1= i.status ? i.status : 'awaiting_processing'
      let status1_= status_tag({status:stauts1, size:"sm"})
      if(!st_set && i.status!='delivered') {st_set=true; st='active'}
      let message_=get_message(i)
      return (
        <div key={index} className={"text-sm flex items-center mb-2"} >
          <div>{i.title} x {i.qty}</div> 
          <div className={"ml-2"}>{status1_}</div>
          <div>{message_}</div>
        </div>
      )
    })   
    return {content:its_, status:st}
  }
  const shipping_address=(i)=>{
    return i.s_address1+', '+i.s_city+', '+i.s_state+' '+i.s_postcode+'. '+i.s_country.label
  }

  items_=items?.map((i, index)=>{
    let active=false
    i.influencer=i.influencer2   
    let ot=order_items(i.items)
    return (
      <div key={index} className={s.item} >
        <div className={s.view_a}>
          <Link href={"/app/order/"+i.id}>
            <div className={s.view} ><img src="/images/Arrow_right_light.svg"/></div>
          </Link> 
        </div>   
        <div className={s.id_a}>
          #{i.id}
        </div>
        <div className={s.date_a}>          
          <div className={s.date}>{Moment(i.created_at).format('DD.MM.YYYY')}</div>
          <div className={s.time}>{Moment(i.created_at).format('h:mm a')}</div>
        </div>
        <div className={s.items_a}>
          {i.items.length && ot.content}
        </div>
        <div className={s.shipping_a}>
          <div className={s.shipping}>{shipping_address(i.details[0])}</div>
        </div>
        <div className={s.total_a}>
          {i.total} Rs.
        </div>
        <div className={s.status_a}>
          <div className={s.status+' '+s[i.status]}>{status_tag({status:ot.status})}</div>
        </div>           
      </div>
    )
  })

  const Heading=()=>{
    return(
      <div className={s.heading}>
        <div className={s.view_a}></div>
        <div className={s.id_a}>#ID</div>
        <div className={s.date_a}>Date</div>
        <div className={s.items_a}>Items</div>
        <div className={s.shipping_a}>Shipping address</div>
        <div className={s.total_a}>Total</div>
        <div className={s.status_a}>Status</div>
      </div>
    )
  }
  
  props.navArgs.translucent=false 
  props.navArgs.noborder=false 

  return (
    <Layout {...props} viewType="influencer_app" showFooter={true} showShopNav={false}> 
      <div className={s.main}>  
        <div className={s.inner}>  
          <h3 className={'mb-8'}>My Orders</h3>    
          <Heading/> 
          <div className={s.items}>                 
            {items_}
            <div style={{display:"none"}}><PrintSale ref={componentRef} {...isPrint}/></div>
          </div>
        </div>
      </div>
    </Layout>    
  )
}
export default com
