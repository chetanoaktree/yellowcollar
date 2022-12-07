import React, { useState, useEffect } from 'react';
import { PAGE_SET} from "/store/types";
import {set_user} from '../get/user';
import Login from '../../ui/lib/view/login_u';
import navArgs from '../args/nav';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";

import process2 from '../process';



const com = (props) => {   
  
  //console.log("process.env", process.env)
  const[isForm, setForm] = useState({isError:''}) 
  const router = useRouter(); 
  const dispatch = useDispatch(); 
  
  const redirectUser = (data) => {     
  
    set_user(data)

    if(data.userType=="admin"){
      router.push({
          pathname: '/admin/',         
      });      
    }else if(data.userType=="business"){
      router.push({
          pathname: '/',         
      });
    }else{
      router.push({
          pathname: '/',         
      });
    }
    console.log("1")
    setTimeout(()=>{
      router.reload({
          pathname: '/',         
      });
      console.log("2")
    }, 500)
    
    let page_data={isLogged:true, user:data}
    page_data.user_refresh_state++
    dispatch({
      type: PAGE_SET,
      payload: page_data,
    });
  } 
  const loginHandler = async (isData) => {     
    //console.log("data", isData)  
    const res = await axios.post(process.env.API+'/api/user/action', isData);
    const data = res.data;
    console.log("login", res.data)
    
   
    //console.log("user", user)  
    //args.navArgs.isLogged=true
    if(res.data.status=="user_not_exists"){
      console.log("user_not_exists")
      setForm((prev)=>{ return {...prev, isError:"User Not Exists."}})

    }else if(res.status==200) {
      //router.push("/app/shop/")     
      //router.reload('/app/shop/')
      let login_other={user:data}
      localStorage.setItem('user_other', JSON.stringify(login_other)); 
      redirectUser(data)      
    }
  } 
  const fbUserHandler = async (i) => {     
    console.log("login data", i)  
    const res = await axios.post(process.env.API+'/api/user/action', i);
    const data = res.data;
    redirectUser(data)
    console.log("login response data", res.data)    
  } 
 
  let args = process2();
  args.loginHandler=loginHandler
  args.fbUserHandler=fbUserHandler
  args.showShopNav=false  
  
  //console.log("login props", props)
   
  return (
    <Login {...args} isForm={isForm}></Login>
  )
}
export default com
