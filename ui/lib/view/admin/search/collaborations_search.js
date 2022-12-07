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
 
  const[isFilter, setFilter] = useState({query:'', collab_status:'', business_id:'', business_name:'', influencer_id:'', influencer_name:'', product_id:'', product_name:''})  
  
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
      {find:'collab_status', get:'collab_status', get_type:'object'},     
      {find:'b', get:'business_name', get_type:'string'},
      {find:'i', get:'influencer_name', get_type:'string'},
      {find:'p', get:'product_name', get_type:'string'},
      {find:'business_id', get:'business_id', get_type:'string'},  
      {find:'influencer_id', get:'influencer_id', get_type:'string'},      
      {find:'product_id', get:'product_id', get_type:'string'}
    ])     
    updateHandler(out)   
  }
  const resetHandler = () =>{
    setFilter({query:'', collab_status:'', influencer_id:'', influencer_name:'', product_id:'', product_name:''})
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
          <div className={s.label}>Business id</div>
          <Input name="business_id" value={isFilter.business_id} placeholder="Business id" changeHandler={inputHandler}/>
        </div>
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Influencer id</div>
          <Input name="influencer_id" value={isFilter.influencer_id} placeholder="Influencer id" changeHandler={inputHandler}/>
        </div> 
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Product id</div>
          <Input name="product_id" value={isFilter.product_id} placeholder="Product id" changeHandler={inputHandler}/>
        </div>          
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Collab status</div>
          <Select name="collab_status" value={isFilter.collab_status} options={collab_status_options} placeholder="Collab status" changeHandler={selectHandler}/>
        </div>          
      </div>      
    </div>
  ) 

  return (
    <div className={s.search_area}>
      <Search value={isFilter.query} placeholder="Product name, Collab status, Influencer name, Business name," queryHandler={queryHandler} applyHandler={applyHandler} resetHandler={resetHandler}>
        {SearchContent}
      </Search> 
    </div>   
  )
}
export default com
