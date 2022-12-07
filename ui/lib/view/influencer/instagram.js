import React, { useState, useEffect, useRef } from 'react';
import Button from '../../button';
import { FacebookProvider, Login, LoginButton, Initialize  } from 'react-facebook';
import axios from 'axios';





const get_instagram_id = async (accessToken, data) => {
  console.log("fb input", data.meta) 

  let instagramUserId
  let facebookUserId
  let facebookUsername

  const fb = await axios({       
    url: "https://graph.facebook.com/v14.0/"+data.meta.facebook_id+"/accounts?fields=id,name,username,instagram_business_account&access_token=" + accessToken,
    method: "get",
  });
  console.log("fb details", fb.data)
  let fb_data
  if(fb_data=fb.data.data[0]){
    instagramUserId = fb_data.instagram_business_account.id;       
  }
  
  //console.log("instagramUserId", instagramUserId) 
  let meta=data.meta ? data.meta : {}
  if(instagramUserId){      
    meta={...{instagramUserId:''}, ...meta}     
    meta.instagramUserId=instagramUserId       
  }else{
    meta={...meta, instagram_connected:false, instagram_status:'busineess_account_not_exist', instagram_status_message:'Busineess Account Not Exist'}         
  }
  data.meta=meta
  return data
}
const get_instagram_details = async (accessToken, instagramUserId, data2, setLive)=>{       
  const { data } = await axios({
    //url: "https://graph.facebook.com/v14.0/me?fields=id,name&access_token=" + accessToken,
    //url: "https://graph.facebook.com/v14.0/17841449935442501?fields=business_discovery.username(immutly){followers_count,media_count}&access_token=" + accessToken,
    //url: "https://graph.facebook.com/v14.0/17841449935442501?fields=followers_count,media_count,username,profile_picture_url&access_token=" + accessToken,
    url: "https://graph.facebook.com/v14.0/"+instagramUserId+"?fields=followers_count,media_count,username,profile_picture_url&access_token=" + accessToken,
    method: "get",
  });
  console.log("data instagram", data)
  if(data && data.username){      
    setLive(prev => {
      let next= {...prev, follower_count:data.followers_count, username:data.username, profile_picture_url:data.profile_picture_url, facebook_verified:true, verified:true}
      data2.meta.instagram=next
      data2.meta.instagram_connected=true
      return next
    })
  }
  return data2
} 

const get_instagram = async (data, setLive) =>{  

  if(data.meta && data.meta.facebook_accessToken){
    const accessToken = data.meta.facebook_accessToken;
    //const userId = fb_user_.profile.id;
    
    /*const fb2 = await axios({       
      url: "https://graph.facebook.com/v14.0/me/accounts?fields=id,name,username,picture,instagram_business_account&access_token=" + accessToken,
      method: "get",
    });
    console.log("fb2", fb2.data)
    const fb2 = await axios({       
      url: "https://graph.facebook.com/v14.0/{user-id}/accounts?access_token=" + accessToken,
      //url: "https://graph.facebook.com/v14.0/oauth/client_code?client_id=1194804817999553&client_secret=cd8e036889b13ccc7013f7de5b37f215&redirect_uri=https://localhost:3000&access_token=" + accessToken,
      method: "get",
    });
    console.log("fb2", fb2.data)*/
    
    if(data.meta.instagramUserId!=''){
      data = await get_instagram_id(accessToken, data)            
    }
    if(data.meta.instagramUserId){
      data = await get_instagram_details(accessToken, data.meta.instagramUserId, data, setLive)  
    }
  }    
  return data
} 



export {
  get_instagram
}