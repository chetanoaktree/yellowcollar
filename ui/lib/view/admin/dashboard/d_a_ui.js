import React, { useState} from 'react';
import Button from '../../../button';
import Input from '../../../input2';

import s from './d_a_ui.module.scss';

import {User, ApproveReject as AR} from '../../_blocks/ui';

const ApproveReject = ({rejectHandler, testHandler, approveHandler}) =>{   
  return (<AR {...{rejectH:rejectHandler, approveH:approveHandler}}/>)
} 

const get_input = ({label, value, name, onChange}) => {
  return(
    <div className={s.input+""}>
      <div className={s._inner+""}>
        <input className={s._ic+" "} value={value} onChange={(e)=>onChange(name, e.target.value)}/>
        <div className={s._l+" "}>{label}</div>
      </div>
    </div>
  )
}
const infoFields = ({items}) => {
  let items_
  if(items.length) items_=items.map((i, index)=>{
    /*let change_
    i={label:'', value:'', change_value:'', ...i}
    let {label, value, change_value} = i
    if(change_value && change_value!=value) {
      change_=<div className={s.change_value}>{i.change_value}</div>
    }*/
    return(<div className={s.info_field+' mx-4 my-1 flex items-center'} key={index}>
      {/*<div className={'mr-2 opacity-50 '} >{label}</div>
      <div>{value}</div>
      {change_}*/}
    </div>)
  })
  return(
    <div className={"flex flex-wrap text-sm"}>
      {items_}
    </div>
  )
}
const users = ({influencer, business}) => {
  if(!influencer || !business) return (<div></div>)
  business.company_name= business.company_name ? business.company_name : business.name
  return(
    <div className={s.users+' flex items-center'}>
      <div className={"flex flex-col items-center w-20 overflow-hidden mr-2"}>
        <User {...influencer} size="xs" className={""}/>
        <div className={"text-xs opacity-50"}>{influencer.name}</div>
      </div>
      <div className={"mr-2"}><img src="/images/Arrow_right_light.svg"/></div>
      <div className={"flex flex-col items-center w-20 overflow-hidden"}>
        <User {...business} size="xs" className={""}/>
        <div className={"text-xs opacity-50 text-center"}>{business.company_name}</div>
      </div>        
    </div>
  )
}

export {
  ApproveReject,
  get_input,
  infoFields,
  users
}