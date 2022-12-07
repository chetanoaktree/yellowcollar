import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import Crisp from '../components/util/crisp'
import Tawk from '../components/util/tawk'
import GA from '../components/util/google_analytics'

import {NotificationContainer, NotificationManager} from 'react-notifications';


import { ProvidePage, usePage } from "../ui/lib/hooks/usePage";
import { loadFromLocal } from '/components/util/cart';
import { useDispatch, useSelector } from "react-redux";
import { CART_SET, PAGE_SET, PAGE_MEMBERSHIP_SET} from "/store/types";

import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import {set_user} from '../components/get/user';


//super tokens
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react'
import { frontendConfig } from '../config/frontendConfig'
if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig())
}


import { useSession, SessionProvider } from "next-auth/react"

import axios from 'axios';
//import { getSession } from "../libs/session";
//import { withIronSessionSsr } from "iron-session/next";

import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";



//import Nav from '../components/nav';
import Nav from '../components/nav';
import process2 from '../components/process_app';
import getUser from '../components/get/user';

import 'swiper/css'
import "swiper/css/scrollbar"
import "swiper/css/navigation"
import 'swiper/css/pagination';
import 'tailwindcss/tailwind.css'
import './style.scss'
import 'animate.css';

import {
  AnimatePresence,
  domAnimation, LazyMotion,
  m
} from "framer-motion"

const animation = {
  name: "Slide Up",
  variants: {
    initial: {
      opacity: 0,    
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  },
  transition: {
    duration: 0.7
  }
};

const get_session_user = async () => {
  const res = await axios.post(process.env.API+'/api/user/get_user', {});
  console.log("PRE content Async", res)
  const data = res.data;
  if(!data || data.status_code=="no_session_user") return
  localStorage.setItem('user_session', JSON.stringify(data)); 
  //console.log("PRE: Session User", data) 
  return data  
}
const get_local_session_user = () => {
  let user_session = localStorage.getItem('user_session');  
  let user_other = localStorage.getItem('user_other');  
  //console.log("PRE: Local User init", user_session)
  if(user_session){
    if(user_session == "[object Object]") {     
      user_session={}
      //console.log("PRE: Local User Empty", user_session)
    }else{
      user_session=JSON.parse(user_session)
      //console.log("PRE: Local User Obj", user_session)  
    } 
  }else if(user_other){
    if(user_other == "[object Object]") {     
      user_session={}
      //console.log("PRE: Local User Empty", user_session)
    }else{     
      user_session=JSON.parse(user_other)
      //console.log("PRE: Local User Obj", user_session)  
    } 
  }else{
     user_session=false
    //console.log("PRE: Local User Undefined", user_session)  
  } 
  return user_session
}

const PreContent=()=>{  
  //console.log("PRE content")

  const session = useSessionContext()
  const dispatch = useDispatch();
  const pageData = useSelector((state) => state.pageData);
  //console.log("PRE CONTENT session", session)

  const set_all_user = (user)=>{
    set_user(user) 
    let page_data={isLogged:true, user}
    page_data.user_refresh_state++
    dispatch({
      type: PAGE_SET,
      payload: page_data,
    });   
  }
  const check_local_user = async ()=>{
    let user_session = get_local_session_user();
    if(user_session.user){          
      set_all_user(user_session.user)
      console.log("PRE: Local User final", user_session)  
    } 
  }
  const check_session_user = async ()=>{
    let user_session = get_local_session_user();
    if(!user_session.user){      
       user_session=await get_session_user() 
    }
    if(user_session.user){          
      set_all_user(user_session.user)
      console.log("PRE: Session User final", user_session)  
    } 
  }

  useEffect(async ()=>{     
    await check_local_user()
  }, [])

  useEffect(async ()=>{  
    let local_session =  get_local_session_user() 
    if(local_session.user) return
    if(session.doesSessionExist!=true) return    
    await check_session_user()    
  }, [session.doesSessionExist])
  

  useEffect(() => {   
      
    let cart_={items:[]}
    //localStorage.setItem('cart',  JSON.stringify(cart_))
    if(cart_=localStorage.getItem('cart')){    
      cart_ = JSON.parse(cart_) 
      //console.log("CART_", cart_)
      if(cart_.items)  {
        dispatch({
          type: CART_SET,
          payload: cart_,
        });   
      }
    
    } 

    let page_={isLogged:false, user:{}}
    let membership_={}
    if(page_=localStorage.getItem('page')){    
      page_ = JSON.parse(page_) 
      //console.log("page_21", page_)
      if(page_.user)  {
        dispatch({
          type: PAGE_SET,
          payload: page_,
        });           
      }
    
    } 
    if(membership_=localStorage.getItem('membership')){    
      membership_ = JSON.parse(membership_) 
      //console.log("membership_app", membership_)
      if(membership_)  {
        dispatch({
          type: PAGE_MEMBERSHIP_SET,
          payload: membership_,
        }); 
      }      
    }         
        
  }, []); 

  return (<div></div>)

}



function MyApp({ Component, pageProps, router }) { 
  console.log("# 1 APP cont ---------------------------- ", pageProps)
  let callback=false
  //console.log("router.query  ", router)
  if(router.state && router.state.route.indexOf("/app/callback")!=-1){
    console.log("CALLABACK", router.state.route)
    callback=true

  }
  const { chat="crisp", short_url } = router.query  

  const Content=()=>{  
    
    //console.log("query", query)
    let args= process2()
    pageProps={...pageProps, ...args}   
    const pageData = useSelector((state) => state.pageData);  
    
    const page=usePage() 
    //console.log("APP args", args)
    /*
    useEffect(()=>{
      if(!isUser){
        let user=localStorage.getItem('user'); 
        let user_=JSON.parse(user) 
        setUser(user_)
        return( false )
      }    
    }, [isUser])
    */


    //page.setUser(isUser)
    page.setCallback("getNotifications", async (i)=>{
      const collabs = await axios.post(process.env.API+'/api/com/notification/', i);
      return collabs.data
    }) 
    page.setCallback("notification", async (i)=>{
      const result = await axios.post(process.env.API+'/api/com/notification/action', i);
      return result.data
    }) 
    page.setCallback("collabInfluencer", async (i)=>{
      const collab = await axios.post(process.env.API+'/api/influencer/collab/action', i);
      return collab.data
    }) 
    page.setCallback("collabBusiness", async (i)=>{
      const collab = await axios.post(process.env.API+'/api/business/collab/action', i);     
      return collab.data
    }) 

    //console.log("page2", page)
    let content_=(<div></div>)

    if(short_url || callback==true){
      content_=(
        <div><Component {...pageProps} /></div>
      )
    }else if(pageData.isLogged==true){
      content_=(
        <div>
          <Component {...pageProps} />          
        </div>
      )
    }else{
      content_=(
        <div>
          <Nav {...args}></Nav>
          <LazyMotion features={domAnimation}>
              <AnimatePresence exitBeforeEnter={true} >
                <m.div
                  key={router.route.concat(animation.name)}
                  className="page-wrap"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={animation.variants}
                  transition={animation.transition}
                >          
                <Component {...pageProps} />
                </m.div>
              </AnimatePresence>
          </LazyMotion>
        </div>
      )       
    }   
    //console.log("fasty", "fasty")
    return content_;
  }

  return (
    <SuperTokensWrapper>
      {/*<SessionProvider session={pageProps.session}>*/}
        <Provider store={store}>
          <PreContent/>
          <ProvidePage>
            <Content/>
            <NotificationContainer/>
          </ProvidePage>
        </Provider> 
      {/*</SessionProvider>*/}
      {/*<Crisp />*/}
      {chat =='crisp'   && <Crisp/>}
      {chat =='tawk' && <Tawk/>}
      <GA/>
    </SuperTokensWrapper>
  )
}


export default MyApp


