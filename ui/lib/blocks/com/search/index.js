import React, { useState } from "react";
import ClickAwayListener from 'react-click-away-listener'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input2';
import s from './index.module.scss';

const com = ({children, ...props}) => { 
  const {placeholder, value, size, queryHandler, resetHandler, applyHandler}=props

  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [isValue, setValue] = useState(value)

  const showView = async(init=true) =>{
    if(init) {
      setLoading(true)
      setOpen(!isOpen)
    }      
    //items=await page.getNotifications()     
    //setItems(items)  
    setLoading(false)
  }

  let c_=''
  if(size=="block"){
    c_+=' '+s.block
  } 
  //console.log("props", props)
  const queryHandler2=(v, e, n)=>{  
    queryHandler(v)   
  }
  const View=()=>{
    return(
      <div className={s.view}>
        <div className={s.content}>
          {children}
        </div>   
        <div className={s.footer}>
          <Button type="action2" color="white" className="mr-2" clickHandler={resetHandler}>Reset</Button>
          <Button type="action2" clickHandler={applyHandler}>Apply</Button>
        </div>     
      </div>
    )
  }
  const keyPressHandler=(v, e, n)=>{
    if(event.key === 'Enter'){
      //console.log("event", e)
      setValue(v)
      queryHandler(v)
      applyHandler()
    } 
  }
  const submitHandler=()=>{
    applyHandler()
  }  
  return(
    <ClickAwayListener onClickAway={() => setOpen(false)}>
    <div className={s.search+' '+c_}>
      <div className={s.inner}>
         <div className={s.query_a+' flex items-center'}>
          <div className={s.query} >
            <Input placeholder={placeholder} value={value} changeHandler={queryHandler2} keyPressHandler={keyPressHandler} rounded={true}/>
            <Button type="default" className={s.reset_icon} clickHandler={resetHandler}><img src="/images/Close_square.svg"/></Button>
            <Button type="default" className={s.query_icon} clickHandler={submitHandler}><img src="/images/Search.svg"/></Button>
          </div>
          <Button type="action2" color="white" contentClass={s.filterBtn} clickHandler={()=>showView()}><img src="/images/Filter_alt.svg"/> filter</Button>
         </div>
         {<div className={s.view+' '+s[(isOpen? 'open':'close')]}>
          <div className={s.content}>
            {children}
          </div>  
          <div className={s.footer}>
            <Button type="text2" color="gray" className="mr-2" clickHandler={()=>setOpen(false)}>Close</Button>
            <Button type="action2" color="white" className="mr-2" clickHandler={resetHandler}>Reset</Button>
            <Button type="action2" clickHandler={applyHandler}>Apply</Button>
          </div>      
        </div>}
      </div>
    </div>
    </ClickAwayListener>
  )
}
export default com
 