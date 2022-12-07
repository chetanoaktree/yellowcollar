import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Layout from './layout';
import Title from '../../title';
import ProductItem from './blocks/product_item';
import productStats from '../../process/productStats';
import s from './cat_u.module.scss';

import {get_site_image_src} from '../../get/image';

const com = ({cat, category, products, ...props}) => {

  const[isCat, setCat] = useState(cat)
  let products_
  let banner_
  /*products_=products?.items?.map((item, index)=>{
    const stats=productStats(item)
    return (
      <Link href={"/app/product/"+item.id}  key={index}>
        <div className={s.product}>
          <div className={s.p_inner}>
            {stats && <div className={s.status}>{stats}</div>}            
            <div className={s.image}><img src={"/products/"+item.img}/></div>
            <div className={s.title}><Title size="sm">{item.title}</Title></div>
            <div className={s.brand}>{item.business.name ? item.business.name  : item.brand}</div>
            {item.discount && <div className={s.discount}>Upto {item.discount} off</div>}
            <div className={s.price}>{item.price}</div>
            <div className={s.price}>{item.cat}</div>
          </div>
        </div>
      </Link>
    )
  })*/
  
  

  const Products= () =>{    
    console.log("products", products)
    let products_=products.map((p, index)=>{
      let product=p.product     
      return(
        <div className={'w-full md:w-4/12 px-8 mb-24'} key={index}>
          <ProductItem product={product}/>
        </div>       
      )
    })    
    return(
      <div className={s.products+' mt-8'}>        
        <div className={'w-full flex flex-wrap mt-12'}>
          {products_}    
        </div>
      </div>
    )
  }

  if(products && products.length){ 
    products_=Products()    
  }
  if(category){ 
    console.log("category", category)
    category.meta.banner_image=category.meta.banner_image ? category.meta.banner_image : {}
    let src=get_site_image_src(category.meta.banner_image)
    banner_=(
      <div className={s.banner} style={{backgroundImage:'url("'+src+'")'}}>
        <div className={s.b_inner+' '}>
          <div className={s.b_content+' px-8'}>
            <div className={"flex flex-col"}>
              <h2>{category.name}</h2>
              <div className={"text-md md:text-xl"}>{category.desc}</div>
            </div>
          </div>
        </div>
      </div> 
    )  
  }
  return (
    <Layout {...props}> 
      {banner_} 
      <div className={s.content}>
        {products_}
      </div>
    </Layout>    
  )
}
export default com
/*

Featured
Price: High to Low
Price Low to High
A-Z
Z-A
Oldest to Newest
Newest to Oldest
Best Selling

*/