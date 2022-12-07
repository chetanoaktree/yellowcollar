import React, { useState } from "react";
import Title from '../../title';
import Button from '../../button';
import Input from '../../input2';
import s from './search.module.scss';

const com = (props) => { 
  const {placeholder, value, size, changeHandler}=props
  let c_=''
  if(size=="block"){
    c_+=' '+s.block
  } 
  //console.log("props", props)
  const changeHandler2=(e)=>{
    //console.log(e)
    changeHandler(e)
  }
  return(
    <div className={s.search+' '+c_}>
      <div className={s.inner}>
         <Input placeholder={placeholder} value={value} changeHandler={changeHandler2} rounded={true}/>
      </div>
    </div>
  )
}
export default com