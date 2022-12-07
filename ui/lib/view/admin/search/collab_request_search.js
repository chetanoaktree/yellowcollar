import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '../../influencer/layout'
import Title from '../../../title'
import Button from '../../../button'
import Input from '../../../input2';
import Select from '../../../select';
import Search from '../../../blocks/com/search/index'

import s from './search.module.scss'

const com = ({collab_status_options, updateHandler, ...props}) => {   
 
  const[isFilter, setFilter] = useState({query:'', collab_status:'', influencer_id:'', influencer_name:'', product_id:'', product_name:''})  
  
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
    updateHandler(isFilter)   
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
      <Search value={isFilter.query} placeholder="Product name, Collab status, Influencer name" queryHandler={queryHandler} applyHandler={applyHandler} resetHandler={resetHandler}>
        {SearchContent}
      </Search> 
    </div>   
  )
}
export default com
