import React, { useState, useRef } from "react";
import s from './input.module.scss';
const com = ({name, type='text', value, changeHandler, placeholder}) => {
  const [isValue, setValue] = useState(value);
  const [isFocus, setIsFocus] = useState(false);

  const input = useRef(null);

  function onFocus() {
    setIsFocus(true);
  }
  function onChange (e) {
    setValue(e.target.value);
    changeHandler(e.target.value, e);
  }
  function onBlur() {
    setIsFocus(false);
  }

  const _c=isFocus ? s.focus : ''

  return (
    <div className={s.main+' '+_c}>              
      <input ref={input} onChange={onChange} onFocus={onFocus} onBlur={onBlur} className={s.input_control} value={isValue} type={type} name={name} placeholder={placeholder}/>
    </div>
  )
}
export default com
