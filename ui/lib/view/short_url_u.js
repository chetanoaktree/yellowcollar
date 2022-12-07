import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import redirect from 'nextjs-redirect'
import { CART_RESET } from "/store/types";
import Guest from './guest';
import Title from '../title';
import Button from '../button';
import Input from '../input2';

import {Loading} from './_blocks/ui';


import { useRouter } from 'next/router';
import axios from 'axios';
import s from './short_url_u.module.scss';



const com = (props) => {    
  let {handler, short_code} =  props
  //console.log("UI props", props)
  const router=useRouter()
  const dispatch = useDispatch(); 
  const [isData, setData] = useState({short_code:''})
  const [isP, setP] = useState(false)

  const {mode, type, id}=router.query

  const {detectedIp, ua}=props
  const {os, browser, osVersion, isDesktop, isMobile} = ua ? ua : {}
  const args={
    short_code,
    ip: detectedIp,
    os,
    browser,
    os_version:osVersion, 
    is_desktop:isDesktop, 
    is_mobile:isMobile  
  }

  console.log("Args", args)
  useEffect(async()=>{
    setP(true)
    let data = await handler({action:'get', ...args})
    console.log("DATA", data)
    setData(data)
    setP(false)
    //redirect(data.product_url)
  }, [])

  

  const {data} = useSelector((state) => state.pageData); 

  const login = () =>{
    router.push('/auth');   
  }
  const order = () =>{    
    router.push('/app/order/'+id);   
  }
  //console.log("router.query", router.query)

  let content_=(<div>loading</div>)
  if(isData.product_url){
    const Redirect = redirect(isData.product_url)
    content_=(<Redirect>Redirecting to Product Page</Redirect>)
  }
  let loading_ = <Loading {...{value:content_, isProcessing:isP}}/>
  return (
    
      <Guest {...props} viewType="guest" showShopNav={false}>   
        <div className={s.main}>   
          <div className={s.inner}>
            <div className={s.card+' text-center'}> 
              {loading_}
            </div>
          </div>
        </div>
      </Guest>    
    
  )
}
export default com
