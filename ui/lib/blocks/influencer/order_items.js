import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Title from '../../title';
import Button from '../../button';
import Performance from '../../blocks/com/performance';
import s from './orders.module.scss';
import Moment from 'moment';
import { useRouter } from 'next/router';

import {get_image_src} from '../../get/product';



const com = ({showHeading=true, items, user, refreshHandler, collaborateHandler, performanceHandler,...props}) => {
  console.log("items2", items)
  const myRef = useRef(null)
  const [isMessage, setMessage]= useState("")
  const [isPerformance, setPerformance]= useState(false)
  const router = useRouter(); 
  
  let collabs_
  let collab_
  let accept_
  //console.log("items", items)
  const collaborateHandler2 = async (product) => {
    //console.log("i", i)
    await collaborateHandler({action:'invite', product_id:product.id, business_id:product.business_id,  influencer_id:user.id})
    refreshHandler()
  } 
  const performanceHandler2 = (product) => {
    console.log("performance", product)
    setPerformance(true)
    //performanceHandler({collab_id:product.previouslyCollabId, product_id:product.id, business_id:product.business_id,  influencer_id:user.id})    
  }  
  if(items){
    collabs_=items.map((i, index)=>{
      i.influencer=i.influencer2
      let actions_
      console.log("indicator", i)
      if(i.product){
        if(i.product.isPreviouslyCollaborated){
          actions_=(
            <>            
              <Button className="mb-2" type="action2" color="white" clickHandler={()=>performanceHandler2(i.product)}>Performance</Button>
              <Button type="action2" clickHandler={()=>collaborateHandler2(i.product)}>Collaborate?</Button>
            </>
          )
        }else if(i.product.isOfferSent){
          actions_=(
            <>Collaborated offer recently sent</>
          )
        }else{
          actions_=(
            <>            
              <Button type="action2" clickHandler={()=>collaborateHandler2(i.product)}>Request</Button>
            </>
          )
        }
      }
      
      
      let src=get_image_src(i.product)
      return (
        <div className={s.item_area} key={index}>
          {i.product && <div className={s.item}>
            <Link href={"/app/product/"+i.product.id}>
              <div className={s.view} ><img src="/images/Arrow_right_light.svg"/></div>
            </Link>
            <div className={s.user_area}>
              <Link className={s.image_area} href="https://www.instagram.com/yellowcollarclub">
                <a className={s.image_area}  target="_blank">
                  <img className={s.image} src={src}/>
                  {i.status == "requested" && <div className={s.indicator}></div>}                  
                </a>
              </Link>
              <div>
                <div className={s.name}>{i.product.title}</div> 
                <div className={s.product} >{i.business.name}</div>               
              </div>
            </div> 
            <div className={s.action_area+' ml-4 '}>
              <div className={' mb-4'}>Collaborated before: <span className={s.collab_status}>{i.product.isPreviouslyCollaborated ? Moment(i.product.previouslyCollaboratedOn).format('DD.MM.YYYY'):'Never'}</span></div>
              {actions_}
            </div>
          </div>} 
        </div> 
      )
    })
  }
  
  const headings_=(
    <div className={s.headings}>
      <div className={s.user_area}></div>  
      <div className={s.action_area+' ml-4'}>Collaborate?</div>
    </div>
  )
  return (
    <div className={s.items}>
      {showHeading && headings_}
      {collabs_} 
      <Performance isOpen={isPerformance} setOpen={setPerformance}></Performance>
    </div>
  )
}
export default com
