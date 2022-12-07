import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from 'next/router'
import axios from 'axios';

const pageContext = createContext();
let a=1
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls usePage().
export function ProvidePage({ children }) {
  const auth = useProvidePage();
  return <pageContext.Provider value={auth}>{children}</pageContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const usePage = () => {
  return useContext(pageContext);
};

// Provider hook that creates auth object and handles state
function useProvidePage() {
  
  let user={}
  const callbacks={
    getNotifications:async()=>{},
    notification:async()=>{},
    collabInfluencer:async()=>{},
    collabBusiness:async()=>{},    
  }
  
  const router = useRouter()  
  const [isLoading, setLoading] = useState(false); 
  const showLoading = (id='') => {
    if(id){
      setLoading(id)
    }else{
      setLoading(true)
    }
    
  };
  const getNotifications = async (i) => {
    let data=[
      {title:"Collaboration request", img:'image 2.png', product_img:'image 28.png', desc:'from Mohan'},
      {title:"second", img:'image 3.png', product_img:'image 30.png', desc:'from John Dev.'}
    ]
    data=await callbacks.getNotifications(i)
    return data
  }; 
  const notification = async (i) => {   
    let data=await callbacks.notification(i)   
    return data
  }; 
  const collabInfluencer = async (i) => {   
    let data=await callbacks.collabInfluencer(i)
    return data
  }; 
  const collabBusiness = async (i) => {   
    let data=await callbacks.collabBusiness(i)
    //let data=i
    return data
  }; 
    
  const setCallback = (name, i) => {
    callbacks[name]=i
  }; 
  const setUser = (i) => {
    user=i
    //console.log("page_user", user)
  }; 
  const getUser = () => {
    return user
  };
  const hideLoading = () => {
    setLoading(false)
  }; 
  const updateUser = (user) => {
    //setUser((prev)=> {return{...prev, user}}) 
  }; 
  const test = (i) => {
    console.log("test2", i)
    return i
  };  

  //console.log("## 2 USE PAGE "+a)
  a+=1

  return { 
    query:router.query,  
    setCallback, 
    isLoading,
    showLoading,
    hideLoading,
    getNotifications,
    notification,
    collabInfluencer,
    collabBusiness,    
    setUser,
    getUser,
    test,    
  };
}