import React, { useState, useEffect } from "react";
import Guest from './guest';
import Title from '../title';
import Button from '../button';
import Input from '../input2';
import { useRouter } from 'next/router';
import { usePage } from "../hooks/usePage";
import InstagramLogin from '../blocks/com/instagram_login'
import { FacebookProvider, Login, LoginButton, Initialize  } from 'react-facebook';
import { signIn } from "next-auth/react"

import axios from 'axios';

import s from './login_u.module.scss';
const com = (props) => { 
  let {loginHandler, fbUserHandler, isForm}=props 
  //console.log("login props", props)
  const [isFBUser, setFBUser] = useState(false);  
  const [isUserType, setUserType] = useState('influencer');  
  const [isIG, setIG] = useState({code:'', accessToken:''});
  const [isData, setData] = useState({action:'login', email:'', pw:'', userType:'influencer'});
  const page=usePage()  
  const router = useRouter()
  
  function onEmailChange(value, e) {
    setData(previousState => {
      //console.log('data: ', isData);
      return { ...previousState, email: value }
    })
  } 
  function onPwChange(value, e) {
    setData(previousState => {
      //console.log('data: ', isData);
      return { ...previousState, pw: value }
    })
  }  
  function onUserType(value) {
    setData(previousState => {   
      //console.log('data: ', isData);
      return { ...previousState, userType: value }
    })
  }  
  const login = () =>{
    loginHandler(isData);
  }
  const keyDownHandler = event => {
    //console.log('User pressed: ', event.key);
    if (event.key === 'Enter') {
      event.preventDefault();
      //console.log('isData: ',isData);
      login()
    }
  };

  const handleResponse = async (data) => {
    console.log(data)    
    localStorage.setItem('fb_user', JSON.stringify(data));  
    let d={email:data.profile.email, name:data.profile.name, accessToken:data.tokenDetail.accessToken, userType:isUserType}
    console.log("d", d)    
    await fbUserHandler({action:'fb_user', ...d})
    //router.push('/app/shop/')
    setFBUser(prev => {      
      return data
    })
  }
  const handleError = (error) => {
    console.log(error)
  }
  const checkFBUser = () => {
    console.log("check_fb_user")
    let fb_user=localStorage.getItem('fb_user');
    if(fb_user && fb_user.email){
      console.log("fb_user", fb_user)
      setFBUser(prev => JSON.parse(fb_user))
    }
  }
  const logoutFBUser = () => {
    console.log("check_fb_user")    
    setFBUser(prev => {
      localStorage.setItem('fb_user',{});
      return false
    })
  }

  useEffect(() => {    
    checkFBUser()
  }, []);

  useEffect(() => {    
    document.addEventListener('keydown', keyDownHandler);    
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [isData]);

  const ig = () =>{
    const handleClick=()=>{      
      const clientId='1194804817999553'
      const scope='basic'
      const redirectUri = window.location.href
      const responseType = 'code'
      console.log("redirectUri", redirectUri)
      //window.location.href = `https://api.instagram.com/oauth/authorize/?app_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`
    }
    return (
      <div >
        <span onClick={handleClick}>
          Login via Instagram         
        </span>     
      </div>
    )
  } 
  const fb = () =>{
    return (
      <FacebookProvider appId2="434958935229217" appId="1194804817999553">
        <Login
          scope="email"
          onCompleted={handleResponse}
          onError={handleError}
        >
          {(props) => {
            let { loading, handleClick, error, data }=props
            //console.log("props", props)
            return (            
              <span onClick={handleClick}>
                Login via Facebook
                {loading && (
                  <span>Loading...</span>
                )}
              </span>
            )
          }}
        </Login>        
      </FacebookProvider>
    )
  } 
  const fb2 = () =>{
    return (
      <FacebookProvider appId2="434958935229217" appId="1194804817999553">       
        <Initialize>
          {({ isReady, api }) => {
            //api.ui(...) // our custom async/await api
            // original FB api is available via window.FB
            let logout =()=>{   
              window.FB.getLoginStatus(function(response) {
                  //statusChangeCallback(response);
                  console.log("response", response)
                  if (response && response.status === 'connected') {
                    window.FB.logout(function(res) {
                      console.log("res", res);   
                      logoutFBUser() // document.location.reload();
                    });
                  }                  
              });              
            }                  
            return(<div onClick={()=>logout()}>Logout</div>)
          }}
        </Initialize>
      </FacebookProvider>
    )
  } 
  const responseInstagram = async (response) => {
    console.warn("response", response)
    setIG(prev=> ({...prev, code:response}))
    window.location.href=process.env.API+"/api/instagram?code="+response   
    //const res = await axios.post('https://api.instagram.com/oauth/access_token', { code: response })
    /*let client_id='3361757314145378'
    let client_secret='31389e1ec378edce52a84976f3e98fbd'
    let grant_type='authorization_code'
    let redirect_uri='https://localhost:3000/api/instagram'   
    const body={ code: response, client_id, client_secret, grant_type, redirect_uri}
    const res = await axios.post('https://cors-anywhere.herokuapp.com/https://api.instagram.com/oauth/access_token', body)
    console.warn("res", res)*/
  }
  const errorInstagram = response => {
    console.warn("response", response)
  }

  const c_=isData.userType == 'influencer' ? s.influencer : s.business 
  return (
    <Guest {...props} viewType="guest" >   
      <div className={s.main+' '+c_}>   
        <div className={s.inner}>
          <div className={s.card}>
            <Title>Login</Title>                  
            <div className={s.form}>
              {isForm.isError!='' && <div className={s.error+' mb-4'}>{isForm.isError}</div>}   
              <div className={s.switch}>
                <div className={s.switch_influencer+' '+s.switch_item} onClick={()=>onUserType("influencer")}>Influencer</div>
                <div className={s.switch_business+' '+s.switch_item} onClick={()=>onUserType("business")}>Business</div>
              </div>
              <div className={s.input+" mb-4"}><Input changeHandler={onEmailChange} value={isData.email} type="text" name="email" placeholder="email"/></div>
              <div className={s.input+" mb-4"}><Input changeHandler={onPwChange} value={isData.pw} type="password" name="password" placeholder="password"/> </div>             
              <Button clickHandler={login} type="action">Log In</Button>
            </div>
            {/*}
            {isFBUser==false && fb()}
            {isFBUser && fb2()}
            <InstagramLogin clientId="3361757314145378" onSuccess={responseInstagram} onFailure={errorInstagram} scope="user_profile,user_media">              
              <span> Login with Instagram</span>
            </InstagramLogin>
            <button onClick={() => signIn("instagram")}>
              Login with Instagram
            </button>*/}
          </div>
        </div>
      </div>
    </Guest>    
  )
}
export default com
