import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import s from './banners.module.scss';

import {get_site_image_src} from '../../../get/image';

let a=1
const com = (props) => {  
  
  let {banners, add2cartHandler}=props
  console.log("###### 6b UI "+a, banners) 
  a+=1

  const [isBanner, setBanner] = useState(0)  
  const router = useRouter() 

  const buy = (product) => {
    add2cartHandler(product)
    //router.push("/app/product/"+product_id)    
    console.log("buy ", product) 
  }
  
  const prev = () => {       
    setBanner((prev)=>{
      let next=prev==0 ? (banners.length-1) : (prev - 1 )
      console.log("prev", next) 
      return next
    })
  }
  const next = () => { 
    setBanner((prev)=>{
      let next=prev==(banners.length-1) ? 0 : (prev + 1 )
      console.log("next", next) 
      return next
    })
  }
  
  let localData=banners[isBanner]
  //console.log("localData", localData)
  let title=localData.label ? localData.label : localData.product_details.title
  
  let src=get_site_image_src(localData)
  return (
    <div className={s.banner+' flex flex-wrap '}>
      <div className={s.left+' w-full  md:w-6/12'}>
        <div className={s.image+' bg-cover bg-center'} style={{backgroundImage:'url("'+src+'")'}}>
          <div className={s.usp_3}>{localData.usp_3}</div>
          <div className={s.usp_4}>{localData.usp_4}</div>
        </div>                
      </div>
      <div className={s.right+' w-full  md:w-6/12 flex flex-col pt-12 md:pt-36'}>
        <div className={"flex-grow md:pl-12"}>
          <div className={s.subtitle}>{localData.promo_type}</div>
          <h2 className={s.title}>{title}</h2>
          <div className={s.by}><span className="">by</span> {localData.product_details.business.name}</div>
        </div>
        <div className={s.action_a+" flex items-center md:pl-12 py-8"}>
          <div className={s.price_a+' flex-grow'}>
            <div className={s.price}>Rs. {localData.product_details.final_price}</div>
            <div className={s.actual_price}>Rs. {localData.product_details.price}</div>
          </div>
          <div className={s.buy_a}>
            <Button type="action2" color="action_blue" clickHandler={()=>buy(localData.product_details)}>Buy Now</Button>
          </div>
        </div>
        <div className={s.bottom_usp_a+" flex "}>
          <div className={s.usp_1+" flex px-6 md:px-12 py-4 md:py-8"}>{localData.usp_1}</div>
          <div className={s.usp_2+" flex px-6 md:px-12 py-4 md:py-8"}>{localData.usp_2}</div>
        </div>
      </div>
      <div className={s.nav_a}>
          <div className={s.nav+' '+s.prev}><Button type="text2" size="sm" clickHandler={()=>prev()}>Prev</Button></div>
          <div className={s.sep}>|</div>
          <div className={s.nav+' '+s.next}><Button type="text2" size="sm" clickHandler={()=>next()}>Next</Button></div> 
        </div>   
    </div>
  )
}
export default com
