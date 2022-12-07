import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validator from 'simple-react-validator';
import Guest from './guest';
import Title from '../title';
import Button from '../button';
import Input from '../input2';
import Select from '../select';
import CheckBox from '../checkbox'
import TabSwitch from '../tab_switch';
import { useRouter } from 'next/router';
import { usePage } from "../hooks/usePage";
import InstagramLogin from '../blocks/com/instagram_login'
import {tag} from './_blocks/ui'
import { FacebookProvider, Login, LoginButton, Initialize  } from 'react-facebook';
import { signIn } from "next-auth/react"
import {Valid} from './_blocks/form_ui';

import axios from 'axios';

import s from './onboarding_u.module.scss';
const com = (props) => { 
  let {handler, industryOptions}=props
  let router= useRouter()
  // console.log("props", props)
  const {user} = useSelector((state) => state.pageData);  

  const [isP, setP] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isState, setState] = useState('init');
  const [isData, setData] = useState({
    user_id:user.user_id, 
    email:user.email, 
    fullname:'', 
    userType:'', 
    mobile:'',   
    onek_followers:false,
    profession:'',
    instagram_url:'',
    companyName:'', 
    website:'',
  });

  let error={
    basic:false,
    inf:false,
    bus:false
  }

  let d=isData
  let v =new Valid("sd","fd", useState)
  let f =v.fields() 
  v.message('email', d.email, 'required|email')
  v.message('mobile', d.mobile, 'required|phone')
  v.message('fullname', d.fullname, 'required')
  v.message('instagram_url', d.instagram_url, 'required|url')

  if(d.userType=='influencer'){
    v.message('onek_followers', d.onek_followers, 'required')
    v.message('profession', d.profession, 'required')
    v.message('industry', d.city, 'array')  
  }else if(d.userType=='business'){
    v.message('companyName', d.state, 'companyName')
    v.message('website', d.website, 'required|url') 
  } 

  if(!v.is_touch_valid('mobile') || ! v.is_touch_valid('fullname')){
    error.basic=true
  }
  if(!v.is_touch_valid('instagram_url') || ! v.is_touch_valid('profession') || ! v.is_touch_valid('onek_followers')){
    error.inf=true
  }
  if(!v.is_touch_valid('instagram_url') || ! v.is_touch_valid('companyName') || ! v.is_touch_valid('website')){
    error.bus=true
  }

  const check_error = () =>{
    let e={basic:false, inf:false, bus:false}
    if(!v.is_touch_valid('mobile') || ! v.is_touch_valid('fullname')){
      e.basic=true
    }
    if(!v.is_touch_valid('instagram_url') || ! v.is_touch_valid('profession') || ! v.is_touch_valid('onek_followers')){
      e.inf=true
    }
    if(!v.is_touch_valid('instagram_url') || ! v.is_touch_valid('companyName') || ! v.is_touch_valid('website')){
      e.bus=true
    }
    return e
  }
  

  const set_touch = (n) => {
    v.set_touch(n, true)
  }
  const touch_basic = (callback) => {   
    v.set_touches(['fullname', 'mobile'], callback) 
  }
  const touch_inf = (callback) => {
    v.set_touches(['instagram_url', 'profession', 'onek_followers'], callback) 
  }
  const touch_bus = (callback) => {    
    v.set_touches(['instagram_url', 'companyName', 'website'], callback) 
  }

  console.log("v", v.fields())
  console.log("d", d)



  useEffect(async() => {      
    let data=await handler({action:'get'})
    data.meta = data.meta ? data.meta : {}
    
    setData(prev=>({...prev, ...data.meta}))
    setLoaded(true)
    console.log("ON DATA", data)

  }, []); 

  const relogin = () =>{
    props.logoutHandler('/auth')
  }
  
  const inputHandler = (v, n) =>{
    //getTouch(n)
    setData(prev=>{
      let next={...prev, [n]:v}
      set_touch(n)  
      return next
    })
  }
  const checkHandler=(v, isChecked, e)=>{
    console.log("check", v, isChecked) 
    //getTouch(v)       
    setData((prev)=>{
      let next={...prev}      
      next[v]=isChecked
      //console.log("goal", prev.goal) 
      set_touch(v)        
      return next
    })
  }
  const create = async () =>{  
      setP(true)         
      let data=await handler({action:'update', inData:isData})  
      setState("success")  
      console.log("Created")
      setP(false)      
  }
  const create_bk = async () =>{   
      let data=await handler({action:'create_role', ...isData})  
      setState("success")  
      console.log("Created")
      setTimeout(()=>{
        props.logoutHandler()
        router.push('/thankyou?mode=a&type='+isData.userType);   
      }, 1000)
    
  }
  
  const type_opt={
    items:[
      {label:'Influencer', name:'influencer', isActive:isData.userType == 'influencer' ? true : false},
      {label:'Business', name:'business', isActive:isData.userType == 'business' ? true : false},      
    ],
    handler: async(i) =>{      
      //let data = await handler({action:'get', type:i.name}) 
      setData((prev)=>{
        next={...prev, userType:i.name}
        return next
      }) 
    }
  }  

  const init = () =>{
    return (
      <div>
        <Title >Welcome on board! We're excited to start working with you.</Title>
        <div className="mt-4">But first, let’s get the boring stuff out the way, shall we?</div> 
        <Button className="mt-8" type="action" clickHandler={()=>{setState("role")}}>Lets do it</Button>
      </div>
    )
  }
  const role = () =>{
    const roleHandler = (role) =>{
      setData(prev=>({...prev, userType:role}))
      setState("basic")
    }
    return (
      <div>
        <Title>Select your role</Title>
        <div className="mt-4 mb-12">Select Influencer to earn more or busineess to grow more.</div> 
        <div>
          <Button className="mt-8 mr-4" type="action" clickHandler={()=>{roleHandler("influencer")}}>Influencer</Button>    
          <Button className="mt-8" type="action" clickHandler={()=>{roleHandler("business")}}>Business</Button> 
        </div>            
      </div>
    )
  }
  //console.log("VVV1", v.is_touch_valid('fullname'))
  const basicHandler = () => { 
    const callback = () => {
      //console.log("TOUCHES", v.touch)
      //console.log("TOUCHES", v.is_touches_valid(['fullname', 'mobile']))
      if(v.is_touches_valid(['fullname', 'mobile'])) setState("advanced")  
    }   
    touch_basic(callback) 
     
  }
  const iAdvHandler = () => {
    const callback = () => {
     // console.log("TOUCHES", v.touch)
      //console.log("TOUCHES", v.is_touches_valid(['fullname', 'mobile']))
      if(v.is_touches_valid(['fullname', 'mobile'])) create("create")
    } 
   
    touch_inf(callback)    
  }
  const bAdvHandler = () => {
    const callback = () => {
      //console.log("TOUCHES", v.touch)
      //console.log("TOUCHES", v.is_touches_valid(['fullname', 'mobile']))
      if(v.is_touches_valid(['instagram_url', 'companyName', 'website'])) create("create")
    }    
    touch_bus(callback)       
  }

  const basic = () =>{    
    return (
      <div>
        <Title>Contact Information</Title>        
        <div className="mt-4 mb-12">But first, let’s get the boring stuff out the way, shall we?</div>        
        <div className="mb-2">
          <Input label="Full Name" changeHandler={(v, e, n)=>inputHandler(v, n)} value={isData.fullname} type="text" name="fullname" placeholder="Enter your full name"/>
          {v.isTouchError({name:'fullname'})}
        </div>
        <div className="mb-2">
          <Input label="Mobile/phone" changeHandler={(v, e, n)=>inputHandler(v, n)} value={isData.mobile} type="text" name="mobile" placeholder="Enter your mobile number"/>
          {v.isTouchError({name:'mobile', message:'It must be a valid mobile/phone number.'})}
        </div>         
        <div><Button className="mt-8" type="action" clickHandler={basicHandler}>Next</Button> </div>
        <Button className="mt-4" type="text2" size="sm" clickHandler={()=>{setState("role")}}>back</Button> 
      </div>
    )
  }
  const influencer_advanced = () =>{    
    return (
      <div>
        <Title>Tell us about yourself</Title>
        <div className="mt-4 mb-12">This information will help us to provide best service to you.</div>            
        <div  className="mb-2">
          <Input label="Profession" changeHandler={(v, e, n)=>inputHandler(v, n)} value={isData.profession} type="text" name="profession" placeholder="Enter your profession"/>
          {v.isTouchError({name:'profession'})}
        </div>
        <div  className="mb-2">
          <Input label="Instagram Url" changeHandler={(v, e, n)=>inputHandler(v, n)} value={isData.instagram_url} type="text" name="instagram_url" placeholder="Enter your instagram url"/>
          {v.isTouchError({name:'instagram_url'})}
        </div>
        <div  className="mb-4 mt-4 flex items-center">
          <div className={'opacity-50 text-left ml-2 flex-grow '}>Do you have more than 1000 followers?</div>
          <CheckBox className={''} name="onek_followers" label="" value="onek_followers" changeHandler={checkHandler}/>
          {v.isTouchError({name:'onek_followers'})}          
        </div>        
        <div  className="mb-2">
          <div className={'opacity-25 text-right mb-2 ml-2'}>Industry</div>          
          <Select label="Industry"  name="industry" value={isData.industry} isMulti options={industryOptions} placeholder="select industry"  changeHandler={(v, n)=>{inputHandler(v, n)}}/> 
          {v.isTouchError({name:'industry'})}   
        </div>
        <div><Button isProcessing={isP} className="mt-8" type="action" clickHandler={iAdvHandler}>Create Influencer Account</Button> </div>
        <Button className="mt-4" type="text2" size="sm" clickHandler={()=>{setState("basic")}}>back</Button>  
        
      </div>
    )
  }
  const business_advanced = () =>{    
    return (
      <div>
        <Title>Tell us about business</Title>
        <div className="mt-4 mb-12">This information will help us to provide best service to you.</div>                
        <div className="mb-2">
          <Input label="Company Name"  changeHandler={(v, e, n)=>inputHandler(v, n)} value={isData.companyName} type="text" name="companyName" placeholder="Enter your company name"/>
          {v.isTouchError({name:'companyName'})} 
        </div>
        <div  className="mb-2">
          <Input label="Instagram Url" changeHandler={(v, e, n)=>inputHandler(v, n)} value={isData.instagram_url} type="text" name="instagram_url" placeholder="Enter your instagram url"/>
          {v.isTouchError({name:'instagram_url'})} 
        </div>
        <div className="mb-2">
          <Input label="Website" changeHandler={(v, e, n)=>inputHandler(v, n)} value={isData.website} type="text" name="website" placeholder="Enter your website url"/>
          {v.isTouchError({name:'website'})} 
        </div>         
        <div><Button isProcessing={isP} className="mt-8" type="action" clickHandler={bAdvHandler}>Create Business Account</Button> </div>
        <Button className="mt-4" type="text2" size="sm" clickHandler={()=>{setState("basic")}}>back</Button>
      </div>
    )
  }
  const influencer_success = () =>{    
    return (
      <div>
        <Title>Your account is under verification, you shall hear from us soon!</Title>
        {/*<div className="mt-4">We will review your details and let you know the status asap.</div>   */}
      </div>
    )
  }
  const business_success = () =>{    
    return (
      <div>
        <Title>Your account is under verification, you shall hear from us soon!</Title>
        {/*<div className="mt-4">We will review your details and let you know the status asap.</div>   */}  
      </div>
    )
  }
  const business_success_bk = () =>{    
    return (
      <div>
        <Title>Account Created Successfully</Title>                   
        <div className="mt-4">Click below ReLogin button to load your profile.</div>              
        <div className="mt-12" >
          <Button type="action" clickHandler={relogin}>ReLogin</Button> 
        </div>  
      </div>
    )
  }
  const pending_status = () =>{    
    return (
      <div>
        <Title>We are reviewing your details.</Title>
        <div className="mt-4">We will let you know the status asap.</div>   
      </div>
    )
  }
  const rejected_status = () =>{    
    return (
      <div>
        <Title>Onboarding rejected.</Title>
        <div className="mt-4">We're sorry! You need to have 1000 followers and your account must be public in order to be a yellow collar verified influencer. You'll get there soon. We are waiting for you ❤️</div>   
      </div>
    )
  }
  const approved_status = () =>{    
    return (
      <div>
        <Title>Onboarding Approved.</Title>
        <div className="mt-4">Click below ReLogin button to load your profile.</div>              
        <div className="mt-12" >
          <Button type="action" clickHandler={relogin}>ReLogin</Button> 
        </div>     
      </div>
    )
  }

  let content_=(<div>Loading...</div>)
  if(isLoaded){
    if(d.status=='pending'){
      content_=pending_status()
    }else if(d.status=='rejected'){
      content_=rejected_status()
    }else if(d.status=='approved'){
      content_=approved_status()
    }else{
      content_=(
        <div>
          {isState=="init" && init()}        
          {isState=="role" && role()} 
          {isState=="basic" && basic()} 
          {(isState=="advanced" && isData.userType=="influencer") && influencer_advanced()} 
          {(isState=="advanced" && isData.userType=="business") && business_advanced()} 
          {(isState=="success" && isData.userType=="influencer") && influencer_success()} 
          {(isState=="success" && isData.userType=="business") && business_success()} 
        </div>  
      )
    }    
  }
  return (
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        <div className={s.inner+' w-full'}>
          <div className={s.card+' text-center w-full'} style={{maxWidth:'600px'}}>           
            {content_}   
          </div>
        </div>
      </div>
    </Guest>    
  )
}
export default com
