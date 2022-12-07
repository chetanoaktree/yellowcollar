import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import getStatus from '../../get/status';
import ProductItem from './blocks/product_item';
import RecentProducts from './blocks/recent_products';
import PopularProducts from './blocks/popular_products';
import Brands from './blocks/brands';
import Banners from './blocks/banners';
import s from './shop_u.module.scss';

let a=1
let b=1


const com = (props) => {   
  
  
  let {handler, add2cartHandler}=props
  
  const [isData, setData] = useState(false)
  const [isPopularProducts, setPopularProducts] = useState(false)

  const router = useRouter()

  console.log("##### 6 UI UUUUUUUUUUUUUUUUUUUUUUUUU "+a, isData)  
  a+=1

  useEffect(async () => { 
    console.log("##### 6 UI LOAAD "+b, isData) 
    b+=1 
    let data=await handler({action:'view_full'}) 
    let pdata=await handler({action:'popular_products2'})  
    setData(data)
    setPopularProducts(pdata)
  }, []);
  
 
  const brands= () =>{      
    return(
      <div className={s.brands+' mt-2'}>
        <div className={s.inner}>
          <h4>Brands to collaborate</h4>
        </div>
        <Brands {...{brands:isData.meta.brands}}/>        
      </div>
    )
  }
  
  let banners_
  let brands_
  let popular_products_
  let recent_products_
  if(isData){    
    
    banners_=(<Banners {...{banners:isData.meta.banners, add2cartHandler}}/>) 
    brands_=brands()
    recent_products_=(<RecentProducts/>)

    if(isPopularProducts.length){      
      
      popular_products_=PopularProducts({products:isPopularProducts})
       
    }
  }
  
  props.navArgs.translucent=false 
  props.navArgs.noborder=false   
  return (
    <Layout {...props} viewType="influencer_app"> 
      <div className={s.main}>
        <div className={s.inner}> 
          {popular_products_} 
          {/* enable later after first launch
            banners_*/}        
        </div>
        {brands_}
        <div className={s.inner}>          
          {recent_products_}
        </div>
      </div>
    </Layout>    
  )
}
export default com
