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

const com = (props) => {   
  let {placeholder='status, Influencer name..', extract=[], categories_options, updateHandler}=props
 
  let [isFilter, setFilter] = useState({query:'', categories:'', business_id:'', business_name:'', influencer_id:'', influencer_name:'', product_id:'', product_name:'', start:1, end:10, limit:10})  
  
  
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
    let ex=[
      {find:'categories', get:'categories', get_type:'object'},     
      {find:'b', get:'business_name', get_type:'string'},
      {find:'i', get:'influencer_name', get_type:'string'},
      {find:'p', get:'product_name', get_type:'string'},
      {find:'s', get:'categories', get_type:'object'},
      {find:'business_id', get:'business_id', get_type:'string'},  
      {find:'influencer_id', get:'influencer_id', get_type:'string'},      
      {find:'product_id', get:'product_id', get_type:'string'}
    ]    
    let out=extract_items(isFilter, ex) 
    setFilter(prev=>{
      let next={...prev, ...out}
      updateHandler(next)     
      return next
    })
  }
  const resetHandler = () =>{
    setFilter(prev=>{
      let next={...prev, query:'', categories:'', influencer_id:'', influencer_name:'', product_id:'', product_name:''}
      updateHandler(next)     
      return next
    })    
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
        {/*<div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Business id</div>
          <Input name="business_id" value={isFilter.business_id} placeholder="Business id" changeHandler={inputHandler}/>
        </div>
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Product id</div>
          <Input name="product_id" value={isFilter.product_id} placeholder="Product id" changeHandler={inputHandler}/>
        </div> */}
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Product Name</div>
          <Input name="product_name" value={isFilter.product_name} placeholder="product name" changeHandler={inputHandler}/>
        </div>                  
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>status</div>
          <Select name="categories" value={isFilter.categories} options={categories_options} placeholder="categories" changeHandler={selectHandler}/>
        </div>          
      </div>      
    </div>
  ) 

  return (
    <div className={''}>
      <Search value={isFilter.query} placeholder={placeholder} queryHandler={queryHandler} applyHandler={applyHandler} resetHandler={resetHandler}>
        {SearchContent}
      </Search> 
    </div>   
  )
}
export default com
