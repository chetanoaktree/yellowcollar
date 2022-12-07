import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '../../influencer/layout'
import Title from '../../../title'
import Button from '../../../button'
import Input from '../../../input2';
import Select from '../../../select';
import Search from '../../../blocks/com/search/index'

import s from './search.module.scss'






const com = ({product_status_options, updateHandler, ...props}) => {   
 
  const[isFilter, setFilter] = useState({query:'', product_status:'', product_id:'', product_name:''})  
  
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
    //console.log("search", isFilter)    
    updateHandler(isFilter)   
  }
  const resetHandler = () =>{
    setFilter({query:'', product_status:'', product_id:'', product_name:''})
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
          <div className={s.label}>Product id</div>
          <Input name="product_id" value={isFilter.product_id} placeholder="Product id" changeHandler={inputHandler}/>
        </div>          
        <div className={s.input_g+' w-4/12 px-1'}>
          <div className={s.label}>Product status</div>
          <Select name="product_status" value={isFilter.product_status} options={product_status_options} placeholder="Product status" changeHandler={selectHandler}/>
        </div>          
      </div>      
    </div>
  )
 

  return (
    <div className={s.search_area}>
      <Search value={isFilter.query} placeholder="Product name, SKU, UPC" queryHandler={queryHandler} applyHandler={applyHandler} resetHandler={resetHandler}>
        {SearchContent}
      </Search> 
    </div>   
  )
}
export default com
