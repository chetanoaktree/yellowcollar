import React, { useState, useRef } from "react";
import s from './input.module.scss';
const com = ({name, label='', type='text', rounded=false, value, className, c, l, changeHandler, keyPressHandler, autoComplete, placeholder}) => {  
  const [isFocus, setIsFocus] = useState(false);

  const input = useRef(null);
  let c_=' '

  function onFocus() {
    setIsFocus(true);
  }
  function onChange (e) {   
    changeHandler(e.target.value, e, name);
  }
  function onKeyPress (e) {   
    //console.log(e)
    if(keyPressHandler) keyPressHandler(e.target.value, e, name);
  }
  function onBlur() {
    setIsFocus(false);
  }
  label= l ? l : label  
  className= c ? c : className
  c_+=isFocus ? s.focus : ' '
  if(rounded==true) c_+=' '+s.rounded
  return (
    <div className={s.main+' relative '+c_+' '+className}> 
      {(label!='' && value) && <div className={'absolute top-0 right-0 opacity-25 mt-2 mr-2'}>{label}</div>}             
      <input className={s.input_control} ref={input} onKeyPress={onKeyPress} onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={value} type={type} name={name} placeholder={placeholder} autoComplete={autoComplete}/>
    </div>
  )
}
export default com
