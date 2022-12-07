import React, { useState } from "react";
import Title from '../../title';
import Button from '../../button';
import s from './widgets.module.scss';

const com = ({items}) => {
  let widgets_
  const Widget=({label, value})=>{
    return(
      <div className={s.widget}>
        <div className={s.inner}>
          <h3>{label}</h3>
          <div className={s.value}>{value}</div>
        </div>
      </div>
    )
  }
  if(items){
    widgets_=items.map((widget, index)=>{
      return(<Widget key={index} {...widget}/>)
    })
  }
  
  return(
    <div className={s.widgets} >
      <div className={s.inner} >
        {widgets_}
      </div>  
    </div>  
  )
}
export default com