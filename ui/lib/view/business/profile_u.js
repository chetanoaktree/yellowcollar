import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import User from '../../blocks/com/user';
import Sm from '../../blocks/com/sm';
import {get_size_600_src} from '../../get/image';
import {get_image_src} from '../../get/product';
import {ThumbImage} from '../../blocks/ui/image_u';
import {Setting, SM} from '../_blocks/ui';

import s from './profile_u.module.scss';

const com = ({item, collabs, products, ...props}) => {
  const {user} = useSelector((state) => state.pageData);
  
   let profile_
   let collabs_
   let products_
    
  //console.log('item', item)
  //console.log('user', user)
  //console.log('products', products)

  if(collabs){
    collabs_=collabs.map(({id, influencer2}, index)=>{
      let influencer=influencer2    
      return(
        <Link key={index} href={"/app/collab/"+id}>
        <div className={s.collab} >
          <div className={s.inner}>
            <div><User {...influencer} size="md"/></div>
            <div className={s.name}>{influencer.name}</div>
          </div>
        </div>
        </Link>
      )
    })
  }

  if(products){
    products_=products.map((i, index)=>{      
      i.influencer=i.influencer2
      
      //console.log("i", i.stats)     
      let {meta, image} = i
      let {available_units} = meta ? meta :{available_units:0}
      let ps_
      let pc_      
      let src= get_size_600_src({...image})

     

      return (
        <div key={index} className={s.item+' w-6/12 md:w-3/12'}>
          <div className={s.inner+' item items-center'}>
            <div className={s.image_area+' w-full  mb-4'}>
              <div className={'w-full bg-cover bg-center rounded-lg'} style={{paddingTop:"100%", backgroundImage:`url('${src}')`}}></div>
            </div>
            <div className={s.name_area}>
              <h5 className={s.id}>{i.title}</h5>   
            </div>           
            <div className={s.price_area+' w-48 flex items-end'}>    
              <div className={'text-sm line-through flex-grow'}>{i.price} Rs.</div>      
              <div className={s.discount+' text-xl '}>{i.final_price} Rs.</div> 
            </div> 
          </div>      
        </div>
      )
    })
  }

  if(item){
    let {details, image, name, company_name=''} = item
    let {desc} = details ?details: {}
    let {website, instagram_url, facebook_url} = item.meta ? item.meta :{}

    if(!company_name) company_name=name

    //console.log("image-profile", image)
    
    profile_=(
    <div className={' mx-auto w-full mt-12 flex flex-col items-center  bg-gradient-to-r from-light-blue to-light-green text-center mb-12 rounded-xl py-6 px-12'} style={{maxWidth:'600px'}}>
      <div className={'mt-12 flex justify-center mx-auto'}>
        <div className={s.user}><User {...image} size="lg"/></div>            
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"mt-12 text-3xl mb-2"}>{company_name}</div>
        <div>{website}</div>
      </div>
      <div className={s.sm_a+' px-2 py-6 flex w-full mt-6'} >
        <div className={"w-12"}>-</div>
        <div className={"flex-grow"}>
          <SM {...{facebook_url, instagram_url}}/>
        </div>
        <Setting {...{settings_url:'/app/settings/'}}/>
      </div>
      <div className={s.profiles_a+' w-full py-12 '} >
        <div className={''}>{desc}</div>
      </div>
    </div>
    )
  }
  return (
    <Layout {...props} showShopNav={false} showFooter={true} viewType="business_app"> 
      <div className={s.main}>
        <div className={s.inner+' mx-auto w-full flex flex-col items-center'} style={{maxWidth:'1020px'}}>
          {profile_}
          <div className={s.companies+" px-12 py-12"}>
            <div className={s.heading+' mb-6 text-3xl  text-center rounded-xl py-2 px-12'} >Products</div>
            <div className={s.products}>{products_}</div>
          </div>
        </div>
      </div>
    </Layout>    
  )
}
export default com


/*
<div className={s.head+' flex flex-wrap items-center md:flex-nowrap py-12'}>            
            <div className={s.right+' w-full md:w-auto flex-grow pl-12'}>
              <div className="flex items-center">                
                <Link href="/app/settings"><div className={s.settings+' ml-6 w-8'}><img src="/images/settings.png"/></div></Link>
              </div>            
            </div>
          </div>

          */
