import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import ProductStatus from './product_status';
import s from './product_influencer.module.scss';

import {get_thumb_src, get_size_600_src} from '../../../get/image';


const com = (props) => {   
  let {product, influencer}=props  
  let {img, label, size}=influencer  
  let business_name=product.business ? product.business.name : ''
  let p_img=product.img.replace("/products", '')

  if(p_img) p_img=product.img.replace("/products/", '')
  let product_src= get_size_600_src({...product.image, src:"/products/"+p_img})
  
  let c_
  if(size && size.value=="col2") c_+=' '+s.col2
  return(
    <div className={s.main+' '+c_}>     
      <div className={s.p_inner+' relative flex flex-col justify-center items-center'}>        
        <div className={s.img_h+' w-full'}>
          <div className={s.img+' bg-center bg-cover'} style={{backgroundImage:'url("/user/'+img+'")'}}></div>
        </div>
        <div className={s.title_a+' mt-2 flex items-center justify-center'} >
            <div className={s.title+' text-center '} >{label}</div>
        </div>
        <div className={s.bottom_a+' w-full mt-2 flex '} >
          <div className={s.product_img_h+' w-12 h-12 mr-4'}>
            <div className={s.product_img+' bg-center bg-cover'} style={{backgroundImage:'url("'+product_src+'")'}}></div>
          </div>
          <div className={s.product_a+' flex-grow'} >
            <div className={s.product_name+' '} >{product.title}</div>
            <div className={s.business_name+' '} >{business_name}</div>
          </div>
          <div className={s.price_a+' flex flex-col items-end'} >
          <div className={s.final_price+' '} >Rs. {product.final_price}</div>
          <div className={s.price} >Rs. {product.price}</div>
          </div>
        </div>
      </div>      
    </div>
  )
}
export default com
