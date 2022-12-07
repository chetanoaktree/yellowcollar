import React, { useState } from "react";
import Title from '../../title';
import Button from '../../button';
import s from './loading.module.scss';
import { usePage } from "../../hooks/usePage";

const com = ({id, ...props}) => { 
  const page=usePage()
  const {facebook_url, twitter_url, instagram_url, type}=props
  let c_=''
  if(type=="default"){
    
  } 
  if(id!=''){
    if(page.isLoading==id) c_+=' '+s.show
    c_+=' '+s.id
  }else{
    if(page.isLoading===true) c_+=' '+s.show
    c_+=' '+s.default
  }
  
  //console.log("page", page)
  return(
    <div className={s.loading+' '+c_}>
      <div className={s.content}>
         <img src="/images/loading.svg"/>
      </div>
    </div>
  )
}
export default com