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


const com = ({order_status_options, payment_status_options, updateHandler, ...props}) => {   
 
  const[isFilter, setFilter] = useState({query:'', order_status:'', payment_status:'', order_id:'',  product_id:'', product_name:''})  
  
  const inputHandler = (v, e, n) =>{
    //console.log("next", v,  n)
    setFilter((prev)=>{      
      return {...prev, [n]:v}
    })
  }
  const selectHandler = (v,  n) =>{
    //console.log("next", v,  n)
    setFilter((prev)=>{      
      return {...prev, [n]:v}
    })
  }
  const applyHandler = () =>{   
    let out=extract_items(isFilter, [
      {find:'order_id', get:'order_id', get_type:'string'},
      {find:'order_status', get:'order_status', get_type:'object'},
      {find:'payment_status', get:'payment_status', get_type:'object'},
      {find:'product', get:'product_name', get_type:'string'},
      {find:'product_id', get:'product_id', get_type:'string'},

      {find:'os', get:'order_status', get_type:'object'},
      {find:'ops', get:'payment_status', get_type:'object'},
     
      {find:'i', get:'influencer_name', get_type:'string'},
      {find:'p', get:'product_name', get_type:'string'},
    ])  
    //console.log("search", isFilter)    
    updateHandler(out)   
  }
  const resetHandler = () =>{
    setFilter({query:'', order_status:'', payment_status:'', order_id:'',  product_id:'', product_name:''})
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
          <div className={s.label}>Order id</div>
          <Input name="order_id" value={isFilter.order_id} placeholder="Order id" changeHandler={inputHandler}/>
        </div>
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Order status</div>
          <Select name="order_status" value={isFilter.order_status} options={order_status_options} placeholder="Order status" changeHandler={selectHandler}/>
        </div>
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Payment status</div>
          <Select name="payment_status" value={isFilter.payment_status} options={payment_status_options} placeholder="Payment status" changeHandler={selectHandler}/>
        </div>          
      </div>      
    </div>
  )
 

  return (
    <div className={s.search_area}>
      <Search value={isFilter.query} placeholder="Order #, influencer, order, product, status, ex. i:john, p:fizz, os:ship" queryHandler={queryHandler} applyHandler={applyHandler} resetHandler={resetHandler}>
        {SearchContent}
      </Search> 
    </div>   
  )
}
export default com
