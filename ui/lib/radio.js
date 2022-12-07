import React, { useState, useRef } from "react";
import s from './radio.module.scss';

const com = ({name, value, options, changeHandler}) => { 
   
  const handleOnChange = (e, o) => {
    /*setSelected(()=>{      
      changeHandler(e.target.value, name, e) 
      return  e.target.value 
    })*/
    //console.log("change value", e, o)
    changeHandler(e.target.value, name, e, o) 
    
  };
  //console.log("radio value", value)
  let options_=options.map((i, index)=>{
    //console.log("radio value", i, value)
    let checked=false
    if(value && value.value) {
      checked = i.value==value.value ? true : false 
    }else{
      checked= i.value==value ? true : false
    }
    //console.log("radio value checked", checked)
    return(
      <div key={index} className={s.radio}>
        <input
          type="radio"
          id={i.value}
          name={i.name}
          value={i.value}      
          checked={checked}    
          onChange={(e)=>handleOnChange(e, i)}
        />        
        <label className={s.label} htmlFor={i.value}>{i.label}</label>
      </div>
    )
  })
  return(
    <div className={s.radiogroup}>
      {options_} 
    </div>
  )
}
export default com
