import React, { useState } from "react";
import s from './loading_simple.module.scss';

const com = ({id, show=true, ...props}) => {    
  let c_=''   
  if(show){
    c_+=' '+s.show   
  }
  return(
    <div className={s.loading+' '+c_}>
      <img src="/images/loading.svg"/>
    </div>
  )
}
export default com