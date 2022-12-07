import React, { useState } from "react";
import Title from '../../title';
import Button from '../../button';
import s from './sm.module.scss';

const com = (props) => { 
  const {facebook_url, twitter_url, instagram_url, size}=props
  let c_=''
  if(size=="block"){
    c_+=' '+s.block
  } 
  //console.log(props)
  return(
    <div className={s.sm+' '+c_}>
      <div className={s.items}>
         <a href={instagram_url} className={s.item} target="_blank"><img src="/images/instagram.png"/></a>
         <a href={facebook_url}  className={s.item} target="_blank"><img src="/images/facebook.png"/></a>
         <a href={twitter_url}  className={s.item} target="_blank"><img src="/images/twitter.png"/></a>
      </div>
    </div>
  )
}
export default com