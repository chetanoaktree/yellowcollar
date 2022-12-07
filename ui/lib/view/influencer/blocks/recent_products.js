import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import ProductItem from './product_item';
import s from './recent_products.module.scss';
import _ from 'lodash'


const com = () => {   
  const { recentProducts } = useSelector((state) => state.pageData);
  //console.log("recentProducts", recentProducts)
  let newArray =recentProducts.items 
  newArray = _.reverse(newArray)
  newArray = _.take(newArray, 3)  
  if(!newArray.length) return(<div></div>)
  let products_=newArray.map((product, index)=>{      
    return(
      <div className={'w-6/12 md:w-3/12 px-4 md:px-8 mb-24'} key={index}>
        <ProductItem product={product}/>
      </div>    
    )
  })
  return(
    <div className={s.popular_products+' mt-12 md:mt-24 px-8'}>
      <h4>Products based on your search history</h4>
      <div className={'flex flex-wrap -mx-8 mt-12'}>
        {products_}    
      </div>
    </div>
  )
}
export default com
