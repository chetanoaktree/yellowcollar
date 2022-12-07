import React, { useState, useRef } from "react";
import s from './tab_switch.module.scss';
import Loading from './view/ui/loading';


const com = ({items, size, active, handler}) => { 
  const [isP, setP] = useState(false)
  //console.log("Switch isP--------------------------", isP)
  const switchHandler=async (i)=>{
    //console.log("Switch--------------------------", i.name)
    setP(i.name)
    await handler(i)
    setP(false)
  }
  const items_=items.map((i, index)=>{
    let active_
    if(active=='' && i.name==''){
      active_ = true 
    }else  if(active){
      active_ = i.name==active ? true : false    
    }else{
      active_ = i.isActive
    }
    //console.log("active", active, "name", i.name)
    let c_=active_ ? s.active : ''
    return(
      <div key={index} className={ c_+' flex items-center'} onClick={()=>switchHandler(i)}>
        <span>{i.label}</span>
        <Loading className={'w-5 ml-2'} isProcessing={(isP!=false && isP == i.name) ? true : false} value=''/>
      </div>
    )
  })
  let c_
  if(size=="md") c_+=' '+s.md
  if(size=="sm") c_+=' '+s.sm

  return(
    <div className={s.switch+" flex justify-center "+ c_}>
      {items_}
    </div>
  )
}
export default com
