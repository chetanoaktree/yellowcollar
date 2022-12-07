import React, { useState, useRef } from "react";
import s from './checkbox.module.scss';

const com = ({className, name, label, value, changeHandler}) => { 
 
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = (e) => {
    setIsChecked((prev)=>{
      let next=!prev
      changeHandler(value, next, e)
      return next;
    });
    
  };
  return(
    <div className={s.checkbox+' '+className}>
      <input
        type="checkbox"
        id={value}
        name={value}
        value={value}
        checked={isChecked}
        onChange={handleOnChange}
      />
      {label && <label className={s.label} htmlFor={value}>{label}</label>}
    </div>
  )
}
export default com
