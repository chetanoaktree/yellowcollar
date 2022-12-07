import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import s from './product_status.module.scss';


const com = (product) => {
  //console.log("status", product) 
  let {align, isOfferSent, isPreviouslyCollaborated, isActiveCollaboration, isPreviouslyPurchased, isPreviouslyPurchasedNotDelivered}=product

  let influencer_stats=''
  let isc=''
  if(isOfferSent==true) {
    influencer_stats="Offer Sent"
    isc=s['offer_sent']
  }else if(isPreviouslyCollaborated==true) {
    influencer_stats="Previously Collaborated"
    isc=s['previously_collaborated']
  }else if(isActiveCollaboration==true) {
    influencer_stats="Active Collaboration"
    isc=s['active_collaboration']
  }else if(isPreviouslyPurchased==true) {
    influencer_stats="Previously Purchased"
    isc=s['previously_purchased']
  }else if(isPreviouslyPurchasedNotDelivered==true) {
    influencer_stats="Previously Purchased"
    isc=s['previously_purchased']
  }  
  let c_=''
  if(align=='left') c_+=' '+s['left']
  
  return(
    <div className={s.main+' text-xs '+c_}>
      {influencer_stats && <div className={s.influencer_stats_h}><div className={s.influencer_stats+ ' '+isc}>{influencer_stats}</div></div>}
    </div>
  )
}
export default com
