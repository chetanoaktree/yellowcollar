import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import ProductItem from './product_item';
import s from './popular_products.module.scss';



const com = ({products}) => {   

  let products_=products.map((p, index)=>{
    let product=p.product     
    return(
      <div className={'w-6/12 md:w-3/12 px-4 md:px-8 mb-24'} key={index}>
        <ProductItem product={product}/>
      </div>       
    )
  })
  return(
    <div className={s.main+' '}>
      <h4>Popular Products</h4>
      <div className={'flex flex-wrap -mx-8 mt-12'}>
        {products_}    
      </div>
    </div>
  )
}
export default com
