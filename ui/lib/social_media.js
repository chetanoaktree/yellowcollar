//import seo from '../seo';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import s from './social_media.module.scss';

const com = ({items}) => {
  const items_=items?.map((item, index)=>{
    return (
      <a key={index} className={s.item} href={item.href} target="_blank">
        <div><img src={"/images/"+item.icon}/></div>
      </a>
    )
  })  

  return (
    <div className={s.main}>
      <div className={s.items}>
        {items_}
      </div>
    </div>
  )
}
export default com
