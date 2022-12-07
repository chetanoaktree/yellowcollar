import React, { useState, useEffect, useRef } from 'react';
import s from './sale.module.scss';
import Moment from 'moment';

import getStatus from '../get/status';

const ComponentToPrint = React.forwardRef((i, ref) => { 
  console.log("print", i) 
  let ps_
  let pc_
  if(i.order_payment){
    pc_=i.order_payment.status
    ps_=i.order_payment.status
  }else{
    ps_='pending'
    pc_='pending'
  }
  let content=(<div>123</div>)
  if(i.status){
    content=(
      <div className={s.main}>
        <div className={s.top}>
          <h4 className={s.id}>#{i.id}</h4>
          <div className={s.date+' font-abhaya'}>{Moment(i.created_at).format('MMMM Do YYYY, h:mm a')}</div>
          <h4 className={s.total}>Rs. {i.total}</h4>        
        </div> 
        <div className={s.middle}>
          <div className={s.status_area}>
            <div className={s.payment +' '+ps_}>{getStatus(pc_)}</div>
            <div className={s.status +' '+i.status+' font-able'}>{getStatus(i.status)}</div>
          </div>
          <div className={s.influencer}>
            <div className={s.name}>{i.influencer.name}</div><div className={s.email}>{i.influencer.email}</div>      
          </div>
          <div className={s.shipping+' font-abhaya'}>
            {i.details[0].s_address1}<br/>
            {i.details[0].s_address2} {i.details[0].s_city} {i.details[0].s_postcode}<br/>
            (257) 563-7401          
          </div>
          <div className={s.products}>
            <div className={s.product}>
              <h6 className={s.name}>{i.product.title}</h6>
              <div className={s.qty}>x {i.order_item.qty}</div>
            </div>        
          </div>          
        </div> 
      </div>
    )
  }

  return (
    <div ref={ref}>
      {content}
    </div>
  );
});

export default ComponentToPrint
