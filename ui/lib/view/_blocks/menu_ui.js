import React, { useState, useEffect} from 'react';

import ClickAwayListener from 'react-click-away-listener'
import Link from 'next/link'
import Button from '../../button';

import s from './menu_ui.module.scss';

let ExternalLink = (i) => {
  let {label, to} = i
  return (
    <Link href={to}>
      <a target="_blank" className={s.ExternalLink+' flex py-2'}><div className={'flex-grow'}>{label}</div><div><img src="/images/Arrow_top-right.svg"/></div></a>
    </Link>
  )
}

let MenuItem = ({label, to}) => {
  return (
    <Link href={to}>
      <a className={s.MenuItem}>{label}</a>
    </Link>
  )
}
let MenuItems= ({items, c}) => {
  let items_ =items.map((i, index)=>{
    return <MenuItem  {...i} key={index}/>
  })
  let ret=(
    <div className={s.MenuItems+" flex flex-col "+c}>
      {items_}
    </div>
  )
  return ret
}

let DropDown = ({items, trigger, hideArrow=false, pos='left', hoverable=false})=>{
  const [isLOpen, setLOpen] = useState(false)
  useEffect(() => {
    if(window){
      window.addEventListener("scroll", () => {
        setLOpen(false)        
      })
    }
    return(()=>{})
  },[])
  let arrow = hideArrow==true ? '' : (<div>{isLOpen==true && <img src="/images/Expand_up_light.svg"/>}{isLOpen==false && <img src="/images/Expand_down_light.svg"/>}</div>)
  let c_
  if(pos=='right') c_+=' '+s.right

  let hoverable_= (
    <div className={s.dropdown+ ' '+c_}  onMouseOver={() => {setLOpen(true)}} onMouseOut={() => {setLOpen(false)}} >
      <div className={s.dropdown_trigger+' flex items-center w-full '} onClick={() => setLOpen(prev=>!prev)}><div className={"flex-grow"}>{trigger}</div> {arrow}</div>      
        <div className={s.dropdown_content_area} style={{display:isLOpen?'':'none'}}>          
            <div className={s.dropdown_content}>
                {items}
            </div>
        </div>
      
    </div>
  )
  let default_=(
    <div className={s.dropdown+ ' '+c_} >
      <div className={s.dropdown_trigger+' flex items-center w-full '}  onMouseOver={() => {setLOpen(true)}} onClick={() => setLOpen(prev=>!prev)}><div className={"flex-grow"}>{trigger}</div> {arrow}</div>
      {(isLOpen) && (
        <div className={s.dropdown_content_area} >
          <ClickAwayListener onClickAway={() => setLOpen(false)}>
            <div className={s.dropdown_content}>
                {items}
            </div>
          </ClickAwayListener>
        </div>
      )}
    </div>
  )
  return hoverable == true ? hoverable_ : default_
}
let Expand = ({items, trigger})=>{
  const [isLOpen, setLOpen] = useState(false)
  useEffect(() => {
    if(window){
      window.addEventListener("scroll", () => {
        setLOpen(false)
      })
    }
    return(()=>{})
  },[])
  let arrow = (<div>{isLOpen==true && <img src="/images/Expand_up_light.svg"/>}{isLOpen==false && <img src="/images/Expand_down_light.svg"/>}</div>)
  
  return (
    <div className={s.expand+' py-2'}>
      <div className={s.expand_trigger+' -mx-3 flex items-center '} onClick={() => setLOpen((prev)=>(!prev))}><div className={"flex-grow"}>{trigger}</div> {arrow}</div>
      {isLOpen && (
        <div className={s.expand_content_area} >
          <div className={s.expand_content+' -mx-3'}>
              {items}
          </div>
        </div>
      )}
    </div>
  )
}
export { 
  ExternalLink,
  MenuItem,
  MenuItems,
  DropDown,
  Expand,
}
/*
*/
