import React, { useState, useRef } from "react";
import AsyncSelect from 'react-select'
import s from './select.module.scss';

const com = ({className, name, label, value, defaultValue,  options, isMulti=false, changeHandler}) => { 

///console.log(name+" defaultValue", defaultValue)
  //console.log(name+" value", value)
  ///console.log(name+" options", options)
  const options2 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  //console.log("select value", value)
  const colourStyles={
    control: (styles, { data, isDisabled, isFocused, isSelected }) => ({ 
      ...styles, 
      padding: '4px 4px', 
      borderRadius:'8px', 
      border:"1px solid rgba(0,0,0,.1)", 
      '&:focus': {
        borderColor: "rgba(0,0,0,.1)",
        outline: isFocused ? "2px solid rgba(0,0,0,.5)!important" : "2px solid rgba(0,0,0,.5)!important",        
        boxShadow: isFocused ? '0 0 0 1px rgba(0,0,0,.1)' : 'none'
      },    
      '&:hover': {
        borderColor: "rgba(0,0,0,.1)",
        outline: isFocused ? "2px solid rgba(0,0,0,.5)!important" : "2px solid rgba(0,0,0,.5)!important",        
        boxShadow: isFocused ? '0 0 0 1px rgba(0,0,0,.1)' : 'none'
      },
    }),
  } 
  
  const handleOnChange = (newValue) => {
    //console.log("newValue "+name, newValue)
    changeHandler(newValue, name)    
  };

  return(
    <div className={className+' '+s.select}>
      <AsyncSelect instanceId={name} defaultValue={defaultValue} isMulti={isMulti} value={value} options={options} styles={colourStyles} onChange={handleOnChange}/>
    </div>
  )
}
export default com
