import React, { useState } from "react";
import s from './input.module.scss';
const com = ({name, rounded=false, value, changeHandler, placeholder}) => {  
  const [isFocus, setIsFocus] = useState(false);
  
  let c_=' '

  function onFocus() {
    setIsFocus(true);
  }
  function onChange (e) {   
    changeHandler(e.target.value, e, name);
  }
  function onBlur() {
    setIsFocus(false);
  }

  c_+=isFocus ? s.focus : ' '
  if(rounded==true) c_+=' '+s.rounded
  return (
    <div className={s.main+' '+c_}>              
      <textarea className={s.input_control} onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={value} name={name} placeholder={placeholder}/>
    </div>
  )
}
export default com
