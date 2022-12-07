import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {APP_RESET, PAGE_SET, PAGE_RESET, CART_RESET, HANDLERS_SET} from "/store/types";
import { useRouter } from 'next/router';
import footerArgs from './args/footer';
import args from './args/args';
import navArgs from './args/nav';
import shopNavArgs from './args/shopNav';
import socialMediaArgs from './args/socialMedia';
import {set_user} from './get/user';
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { signOut } from "supertokens-auth-react/recipe/emailpassword";

import axios from 'axios';

let do_user=0
const process2 = () => { 

  const dispatch = useDispatch();  
  const router = useRouter()

  const pageData = useSelector((state) => state.pageData);

  //console.log("pageData", pageData)

  useEffect(()=>{
    dispatch({
      type: HANDLERS_SET,
      payload: {
        coupon:async (i)=>{
          const collabs = await axios.post(process.env.API+'/api/com/coupon', i);
          return collabs.data
        }, 
        notification:async (i)=>{
          const collabs = await axios.post(process.env.API+'/api/com/notification/action', i);
          return collabs.data
        },       
      },
    });   
  }, [])
  
  

  const removeLocalHandler = async() => {
    await signOut()       
    localStorage.setItem('fb_user', {});
    localStorage.setItem('user_session', false);
    localStorage.setItem('user', JSON.stringify({}));
    localStorage.setItem('page', JSON.stringify({isLogged:false, user:{}}));  
    localStorage.setItem('membership', JSON.stringify({})); 
    localStorage.setItem('cart', JSON.stringify({}))   
    localStorage.setItem('checkout', JSON.stringify({}))   
    dispatch({
      type: PAGE_RESET,
      payload: {},
    }); 
    dispatch({
      type: CART_RESET,
      payload: {},
    });
  } 
  const logoutHandler = async (path) => { 
    if(!path) path='/'      
    await removeLocalHandler()
    router.push("/")
    //router.reload('/')
  } 
  

  let init={
    ...args,
    isProcessed:false,
    navArgs:navArgs,
    shopNavArgs:shopNavArgs,
    showShopNav:false,
    showFooter: false,
    footerArgs:footerArgs,
    socialMediaArgs:socialMediaArgs, 
    logoutHandler:logoutHandler,
    removeLocalHandler:removeLocalHandler  
  }
  let user_=pageData.user  
  
  const checkUser_core = (state) => {  

    //console.log("### 3 PROCESS_APP user", user_ )
    
    if(user_ && user_.userType){
      state.navArgs.isLogged = true
      state.isLogged = true
      state.navArgs.logoutHandler=logoutHandler
      state.user=user_
      if(user_.userType=="admin"){
        state.navArgs.items = state.navArgs.adminItems
      }else if(user_.userType=="user"){
        state.navArgs.items = state.navArgs.userItems
      }else if(user_.userType=="new_user"){
        state.navArgs.items = state.navArgs.newUserItems
      }else if(user_.userType=="business"){
        state.navArgs.items = state.navArgs.businessItems
      }else{
        state.navArgs.items = state.navArgs.influencerItems
      }
      //state.navArgs.items = user_.userType == "business" ? state.navArgs.businessItems : state.navArgs.influencerItems
      state.userType=user_.userType
      state.showShopNav = user_.userType == "business" ? false : true
    }else{
      state.navArgs.isLogged = false
      state.isLogged = false
      state.navArgs.items=state.navArgs.guestItems
      state.userType='guest'
    }  
    return state
  }

  init=checkUser_core(init)
  const[isArgs, setArgs] = useState(init) 

  const checkUser = () => {       
    setArgs((state)=>{ 
      state=checkUser_core(state)
      return {...state}
    })    
  }


  //useEffect(() => {    
    //console.log("user_refresh_state", pageData.user_refresh_state)
    //checkUser()      
  //}, [pageData.user_refresh_state]);

  //init=checkUser_core(init)
  return init;
}
export default process2
