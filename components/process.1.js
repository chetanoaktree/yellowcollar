import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {PAGE_SET, PAGE_RESET} from "/store/types";
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
  const session = useSessionContext()
  const dispatch = useDispatch();  
  const router = useRouter()

  const pageData = useSelector((state) => state.pageData);

  let localSession={isServerSessionLoaded:false, isUser:false, user:{}}  
  const [isLS, setLS] = useState(localSession);  

  console.log("pageData", pageData)
  //console.log("session", session)
  //console.log("init_redirect", pageData.init_redirect)

  useEffect(async () => { 
    localSession=localStorage.getItem('localSession')
    if(typeof localSession === 'string') {
      localSession=JSON.parse(localSession)
      setLS(prev=>{
        let next={...prev, ...localSession}
        //console.log("LOCAL SESSION", next)
        return next
      })
    }
  }, []);

  const initRedirect = () => {
     
  }
  const pageSet = (page_data, user_) =>{
    page_data.user_refresh_state++
    let redirect=''
    if(pageData.init_redirect==false){
      if(user_.userType=="new_user") {  
        page_data.init_redirect = true  
        redirect='/onboarding'  
      }
    }
    dispatch({
      type: PAGE_SET,
      payload: page_data,
    }); 
    if(redirect!='') router.push(redirect)      
  }

  useEffect(() => {     
    if(session.doesSessionExist==true){ 
      let redirect=''     
      let user_=session.accessTokenPayload.user
      console.log("LOADING SESSION USER", user_)
      
      let page_data={isLogged:true, user:user_} 
      set_user(user_) 
      setLS(prev=>{
        let next={...prev, isServerSessionLoaded:true}
        localStorage.setItem('localSession', JSON.stringify(next))        
        //console.log("LOCAL UPDATED SESSION", next)
        return next
      })        
      pageSet(page_data, user_) 
       
    }
  }, [session.doesSessionExist])

  

  useEffect(async () => { 
    if(session.doesSessionExist==true){  
      //console.log("get isLS", isLS)
      let user_=session.accessTokenPayload.user
      //console.log("get Server User", user_)
      if(user_.userType=="new_user"){
        const res = await axios.post(process.env.API+'/api/user/action', {action:'loginById', user_id:user_.user_id});
        console.log("get DB user", res.data)
        let page_data={user:res.data} 
        set_user(res.data)         
        setLS(prev=>{
          let next={...prev, isUser:true, user:res.data}
          localStorage.setItem('localSession', JSON.stringify(next))        
          //console.log("LOCAL UPDATED SESSION 2", next)
          return next
        }) 
        pageSet(page_data, user_) 
      }
    }
  }, [session.doesSessionExist]);

  

  

  const logoutHandler = async (path="/") => { 
    await signOut()
    setUser(false) 
    localStorage.setItem('fb_user', {});
    localStorage.setItem('user', JSON.stringify({}));
    localStorage.setItem('page', JSON.stringify({isLogged:false, user:{}}));  
    localStorage.setItem('membership', JSON.stringify({}));    
    dispatch({
      type: PAGE_RESET,
      payload: {},
    }); 
    //router.replace("/")
    router.push({
        pathname: path,        
    });
    //router.reload('/')
  } 
  

  const init={
    ...args,
    isProcessed:false,
    navArgs:navArgs,
    shopNavArgs:shopNavArgs,
    showShopNav:false,
    showFooter: false,
    footerArgs:footerArgs,
    socialMediaArgs:socialMediaArgs, 
    logoutHandler:logoutHandler   
  }
  const[isSessionUser, setSessionUser] = useState(false)  
  const[isUser, setUser] = useState(false)  
  const[isArgs, setArgs] = useState(init)  
  

  const checkUser = () => {      
    
    let user_=pageData.user  
    setArgs((state)=>{ 
      //console.log("do_user", do_user++)
      if(user_ && user_.email){
        state.navArgs.isLogged = true
        state.isLogged = true
        state.navArgs.logoutHandler=logoutHandler
        state.user=user_
        if(user_.userType=="admin"){
          state.navArgs.items = state.navArgs.adminItems
        }else if(user_.userType=="new_user"){
          state.navArgs.items = state.navArgs.userItems
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
      return {...state}
    })
    setUser(true)    
    
  }

  useEffect(() => {    
    if(!isUser){
      checkUser()      
    } 
  
  }, [isUser]);

  useEffect(() => {    
    //console.log("user_refresh_state", pageData.user_refresh_state)
    checkUser()      
  }, [pageData.user_refresh_state]);

 
  
  return isArgs;
}
export default process2
