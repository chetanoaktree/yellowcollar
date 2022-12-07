import React, { useState } from "react";
import Title from '../../title';
import Button from '../../button';
import {get_size_src} from '../../get/image';
import s from './user.module.scss';

const com = (i) => { 
  let {className, profile_pic, profile_pic_full, size, name='', company_name='', email='', show_info=false} =i
  let c_=className+' ' 
  let img=''
  if(size=="block"){
    c_+=' '+s.block
  }else if(size=="md"){
    c_+=' '+s.md
  }else if(size=="lg"){
    c_+=' '+s.lg
  }else if(size=="sm"){
    c_+=' '+s.sm
  }else if(size=="xs"){
    c_+=' '+s.xs
  }
  /*if(profile_pic_full){
    img=profile_pic_full
  }else if(profile_pic){
    img='/db_images/'+profile_pic
  }else{
    img='/images/User_light.svg'
  }*/
  //console.log("____image", i)
  img= get_size_src(i)
  let info=''
  if(show_info!=false && (name!='' || company_name!='')){
    name = company_name ? company_name : name
    info=(
      <div className={"ml-2 flex flex-col"}>
        <div>{name}</div>
        {email!=''  && <div className={"text-xs font-normal opacity-50"}>{email}</div>}
      </div>
    )
  }
  return(
    <div className={s.user+' '+c_}>
      <div className={s.pic} style={{backgroundImage:'url("'+img+'")'}}>
         
      </div>
      {info}
    </div>
  )
}
export default com