import React, { useState,  useEffect, useMemo} from 'react';
import Button from '../../../button';
import Input from '../../../input2';

import {get_input, infoFields, ApproveReject, users} from './d_a_ui';

import {get_id, tag} from '../../_blocks/ui';
import s from './d_a_collab_au.module.scss';

import Video_popup from './d_video_au';

const requestAction=(i)=>{
  let { id, type, type_id, handler, isS, setS, setItem, meta}=i
  const reject = async() => {
    let in_data=meta
    let _d = await handler({action:'request_reject', id, type, type_id, in_data, result:'rejected'})
    let _e = await handler({action:'email_reject', id, type, type_id, in_data})
    if(_d.action_status=='done') {
      setS('done')  
      setItem(prev => ({...prev, result:'rejected'}))    
    }
  } 
  const approve = async() => {
    let in_data=meta
    let _d = await handler({action:'request_approve', id, type, type_id, in_data, result:'approved'})
    let _e = await handler({action:'email_approve', id, type, type_id, in_data})
    if(_d.action_status=='done') {
      setS('done') 
      setItem(prev => ({...prev, result:'approved'}))        
    }
  }  
  let ret = (<div></div>)
  if(isS!='done') {
    ret =( <ApproveReject rejectHandler={reject} approveHandler={approve}/>)
  }
  return ret
}

const request = (i) => {
  console.log("request", i)  
  let {meta}=i
  let {userType, email, fullname, mobile, onek_followers, profession, industry, instagram_url, companyName, website}=meta ? meta : {}
  const update = async() => {
    //let in_data={performance_id:collab.performance_id, ...isL}
    //let _d= await handler({action:'update_performance', id, type, in_data})
    //if(_d.action_status=='done') setS('done')
  }
  let com_fields =[
    {label:'userType', value:userType},
    {label:'email', value:email},
    {label:'fullname', value:fullname},
    {label:'mobile', value:mobile},
    {label:'instagram_url', value:instagram_url}    
  ]
  let influencer_fields =[ 
    ...com_fields,     
    {label:'onek_followers', value:onek_followers==true ? 1 : 0},
    {label:'profession', value:profession},
    {label:'industry', value:(industry && industry[0]) ? industry[0].value : ''}     
  ]
  let business_fields =[  
    ...com_fields,  
    {label:'companyName', value:companyName},
    {label:'website', value:website}       
  ]
  let fileds_ = infoFields({
    items: userType  == 'business' ? business_fields : influencer_fields
  })
  return(
    <div className={s.collab_item+' w-full'}> 
      <div className={s.gray_block+' flex items-center w-full'}>           
        <div className={'flex-grow'}>{fileds_}</div> 
        {/*<div classname={''}><Button type="action2" clickHandler={update}>Update</Button></div>*/}
      </div>              
    </div>
  )
}


const item_onboarding_config = (i) =>{ 
  let {action} = i  
  let ret={expand:false, action:false} 
  if(action=='Request') {
    ret.expand=true
    ret.action=true
  }else if(action=='Promotion Complete' || action=='Performance Video') {
    ret.expand=true
  }
  return ret
} 

const ItemOnboardingAction = (i) =>{    
  let {action} = i
  let ret = false
  if(action=='Request') {
    ret =requestAction(i)
  }
  return ret
} 

const itemOnboardingStatus = (i) => { 
  let {action, isItem, product} = i 
  let o={bottom:''}
  if(action=='Request'){      
    o.done = (isItem.result =='approved') ? {label: "Approved" , color:"green"} : {label: "Rejected" , color:"red"}  // set conditional rejected : red
    o.not_done = {label:"Approval Required", color:"blue"}   

  }else if(action=='Promotion Complete' || action=='Performance Video'){      
    o.done={label:"Updated", color:"green"}
    o.not_done = {label:"Update Required", color:"blue"}  

  }     
  o.action = {label:'Onboarding '+action, color:"orange"}      
  o.bottom = product ? product.title :''
  return o
}

const ItemOnboardingContent = (i) =>{
  let {action, collab, influencer, business, collab_request} = i  
  const [isL, setL]= useState({}) 
  let users_
  let display_users=true
  if(action=='Request'){
    if(status=='done') display_users = false    
  }
  if(display_users==true && influencer && business){
    users_=(users({influencer, business})) 
  }
  return(
    <div className={s.collab_item+'flex items-center'}> 
      <div className={''}>{users_}</div>         
    </div>
  )
} 

const ItemOnboardingExpand = (i) =>{ 
  let {id, type, meta, action, product, campaign, collab, collab_request} = i
  let p ={image_id:'', title:'', price:'', ...product} 
  let cm = (campaign && campaign.meta ) ? campaign.meta : {}
  cm={product_url:'', ...cm} 

  let l={}
  if(action=='Promotion Complete') {
    l=collab.performance ? collab.performance : {id:0, click_through:0, engagement:0, followers:0, conversions:0, impressions:0}
  }
  const [isL, setL]= useState(l)
  let ret =false
  if(action=='Request') {
    ret =request(i)
  }
  return ret
} 




export {
  ItemOnboardingContent,
  ItemOnboardingExpand,  
  ItemOnboardingAction,
  itemOnboardingStatus,
  item_onboarding_config
}