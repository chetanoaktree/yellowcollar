import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '../../influencer/layout'
import Title from '../../../title'
import Button from '../../../button'
import Input from '../../../input2';
import Select from '../../../select';
import Search from '../../../blocks/com/search/index'
import {extract_items} from '../../../blocks/com/search/extract';

import s from './search.module.scss'

const com = ({collab_status_options, updateHandler, ...props}) => {   
 
  const[isFilter, setFilter] = useState({query:'', user_name:'', user_id:'', user_email:'', code:'', limit_: '', usage:''})  
  
  const inputHandler = (v, e, n) =>{   
    setFilter((prev)=>{      
      return {...prev, [n]:v}
    })
  }
  const selectHandler = (v,  n) =>{   
    setFilter((prev)=>{      
      return {...prev, [n]:v}
    })
  }
  const applyHandler = () =>{  
    let out=extract_items(isFilter, [
      //{find:'collab_status', get:'collab_status', get_type:'object'},
      {find:'limit', get:'limit_', get_type:'string'},  
      {find:'code', get:'code', get_type:'string'},  
      {find:'usage', get:'usage', get_type:'string'},       
      {find:'u', get:'user_name', get_type:'string'},   
      {find:'uid', get:'user_id', get_type:'string'}, 
      {find:'email', get:'user_email', get_type:'string'},   
      {find:'uemail', get:'user_email', get_type:'string'},     
      /*{find:'b', get:'business_name', get_type:'string'},
      {find:'i', get:'influencer_name', get_type:'string'},
      {find:'p', get:'product_name', get_type:'string'},
      {find:'business_id', get:'business_id', get_type:'string'},  
      {find:'influencer_id', get:'influencer_id', get_type:'string'},      
      {find:'product_id', get:'product_id', get_type:'string'}*/
    ])        
    updateHandler(out)   
  }
  const resetHandler = () =>{
    //setFilter({query:'', collab_status:'', influencer_id:'', influencer_name:'', product_id:'', product_name:''})
    setFilter({query:'', user_name:'', user_id:'', user_email:'', code:'', limit_: '', usage:''})
    updateHandler({})     
  }
  const queryHandler = (v) =>{      
    setFilter((prev)=>{  
      let next={...prev, query:v}
      console.log("next", next)   
      return next
    })   
  }

  const SearchContent=( 
    <div className={s.search}>
      <div className={s.content+' flex -mx-1'}>
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Code</div>
          <Input name="code" value={isFilter.code} placeholder="code" changeHandler={inputHandler}/>
        </div> 
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Limit</div>
          <Input name="limit_" value={isFilter.limit_} placeholder="limit" changeHandler={inputHandler}/>
        </div> 
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Usage</div>
          <Input name="usage" value={isFilter.usage} placeholder="usage" changeHandler={inputHandler}/>
        </div> 
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>User id</div>
          <Input name="user_id" value={isFilter.user_id} placeholder="user id" changeHandler={inputHandler}/>
        </div> 
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>User Name</div>
          <Input name="user_name" value={isFilter.user_name} placeholder="user_name" changeHandler={inputHandler}/>
        </div>                 
        {/*<div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Collab status</div>
          <Select name="collab_status" value={isFilter.collab_status} options={collab_status_options} placeholder="Collab status" changeHandler={selectHandler}/>
        </div> */}         
      </div>      
    </div>
  ) 

  return (
    <div className={s.search_area}>
      <Search value={isFilter.query} placeholder="search by code, code:CM48AIPLj3H, u:john" queryHandler={queryHandler} applyHandler={applyHandler} resetHandler={resetHandler}>
        {SearchContent}
      </Search> 
    </div>   
  )
}
export default com
