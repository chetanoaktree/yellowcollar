import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import s from './brands.module.scss';

import {get_brand_image_src} from '../../../get/image';

const com = (props) => {   
  let {brands}=props
  //console.log("brands", brands)  
  let brands_=brands.map((i, index)=>{
    let {label, img} = i
    let src=get_brand_image_src(i)
    return(
      <div className={s.brand} key={index}>     
        <img className={s.img+' bg-center bg-cover'} src={src}/>        
      </div>      
    )
  })
  return(
    <div className={s.brands+' bg-gradient-to-r from-light-yellow to-light-red  '}>
      <div className={s.inner}>{brands_}</div>
    </div>
  )
}
export default com
