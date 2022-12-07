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

import s from './profile.module.scss';

const com = ({item, collabs, products, ...props}) => {
  const {user} = useSelector((state) => state.pageData);
  
   let profile_
   let collabs_
   let products_
    
  //console.log('item', item)
  //console.log('user', user)
  //console.log('products', products)

  if(collabs){
    collabs_=collabs.map((i, index)=>{   
      let {id, business} =i

      return(        
        <div key={index} className={s.item+' w-6/12 md:w-3/12'}>
          <Link key={index} href={"/app/collab/"+id}>
            <div className={s.inner+' item items-center'}>              
              <div className={s.name_area+' text-center'}>
                <div><User {...business} size="md"/></div>
                <h5 className={s.id+' mt-4'}>{business.name}</h5>   
              </div> 
            </div>
          </Link>      
        </div>
      )
    })
  }

  if(item){
    let {details, profession, image} = item
    let {desc} = details ? details: {}
    let {website, instagram_url, facebook_url} = item.meta ? item.meta :{}    
    console.log("item", item)
    
    profile_=(
    <div className={' mx-auto w-full mt-12 flex flex-col items-center  bg-gradient-to-r from-light-blue to-light-green text-center mb-12 rounded-xl py-6 px-12'} style={{maxWidth:'600px'}}>
      <div className={'mt-12 flex justify-center mx-auto'}>
        <div className={s.user}><User {...image} size="lg"/></div>            
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"mt-12 text-3xl mb-2"}>{user.name}</div>
        <div>{profession}</div>
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
          <div className={s.companies+" w-full px-12 py-12"}>
            <div className={s.heading+' mb-6 text-3xl  text-center rounded-xl py-2 px-12 mb-8'} >Companies <strong>collaborated</strong></div>
            <div className={s.collabs+' flex flex-wrap justify-center pt-8'}>{collabs_}</div>
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
