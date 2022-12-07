import React, { useState,  useEffect, useMemo} from 'react';
import Button from '../../../button';
import Input from '../../../input2';

import {get_input, ApproveReject, users} from './d_a_ui';

import {get_id, tag} from '../../_blocks/ui';
import s from './d_a_collab_au.module.scss';

import Video_popup from './d_video_au';

const requestAction=(i)=>{
  let { id, type, type_id, handler, isS, setS, setItem, meta}=i
  const reject = async() => {
    let in_data=meta
    let _d = await handler({action:'request_reject', id, type, type_id, in_data, result:'rejected'})
    if(_d.action_status=='done') {
      setS('done')  
      setItem(prev => ({...prev, result:'rejected'}))    
    }
  } 
  const approve = async() => {
    let in_data=meta
    let _d = await handler({action:'request_approve', id, type, type_id, in_data, result:'approved'})
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


const ItemCollabAction = (i) =>{  
  let {action} = i  
  let ret = false
  if(action=='Request') {
    ret =requestAction(i)
  }

  return ret
} 

const item_collab_config = (i) =>{
  let {action} = i     
  let ret={expand:false, action:false} 
  if(action=='Request') {
    ret.action=true
  }else if(action=='Promotion Complete' || action=='Performance Video') {
    ret.expand=true
  }
  return ret
} 


const itemCollabStatus = ({action, isItem, influencer, business, product, collab, collab_request}) => {
  
   let o={bottom:''}
   if(action=='Request'){      
      o.done = (isItem.result =='approved') ? {label: "Approved" , color:"green"} : {label: "Rejected" , color:"red"}  // set conditional rejected : red
      o.not_done = {label:"Approval Required", color:"blue"}   

    }else if(action=='Promotion Complete' || action=='Performance Video'){      
      o.done={label:"Updated", color:"green"}
      o.not_done = {label:"Update Required", color:"blue"}  

    }     
    o.action = {label:'Collab '+action, color:"orange"}      
    o.bottom = product ? product.title :''
    return o
}

const ItemCollabContent = ({action, collab, influencer, business, product, collab_request}) =>{ 
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

const ItemCollabExpand = ({handler, setE, setS, id, type, type_id, action, influencer, business, product, collab, collab_request}) =>{ 
  const [isVideo, setVideo]= useState(false) 
  let l={}
  if(action=='Promotion Complete' || action=='Performance Video') {
    l=collab.performance ? collab.performance : {id:0, click_through:0, engagement:0, followers:0, conversions:0, impressions:0}
  }
  
  const {performance_video_path_}=collab.meta
  //performance_video_path_='https://ik.imagekit.io/ycc/pexels-ivan-samkov-7121336_Lt_jTVyM-.mp4'
  const [isL, setL]= useState({...l})
  console.log("INIT", l)
  console.log("isL", isL)
  const inputHandler = (n, v) => {
    setL(prev=>{
      return ({...prev, [n]:v})
    })
  }
  let ret =false
  if(action=='Promotion Complete' || action=='Performance Video') {
    console.log("action_", action)
    const update = async() => {
      let in_data={performance_id:collab.performance_id, ...isL}
      let action_ = action=='Promotion Complete' ? 'promotion_complete' : 'update_performance'
      let _d= await handler({action:action_, id, type, type_id, in_data})
      console.log("D", _d)
      
      setL((prev)=>({...prev, ..._d}))
      if(_d.action_status=='done') setS('done')
      setE(false)
    }

    let click_through_ = get_input({label:"Click Through", name:'click_through', value:isL.click_through, onChange:inputHandler})
    let engagement_ = get_input({label:"Engagement", name:'engagement', value:isL.engagement, onChange:inputHandler})
    let followers_ = get_input({label:"Followers", name:'followers', value:isL.followers, onChange:inputHandler})
    let conversions_ = get_input({label:"Conversions", name:'conversions', value:isL.conversions, onChange:inputHandler})
    let impressions_ = get_input({label:"Impressions", name:'impressions', value:isL.impressions, onChange:inputHandler})
    const users_=(
      <div className={s.inputs+' flex flex-wrap items-center'}>
        {/*click_through_*/}
        {engagement_} 
        {impressions_} 
        {/*conversions_}
        {followers_*/} 
      </div>
    )  
    const video_=(
      <div className={s.video+' flex flex-col items-center'}>  
        <div className={s._play+' flex items-center justify-center'} onClick={()=>setVideo(true)}>
          <img src={"/images/Play.svg"} />
        </div>
        <div className={'text-xs opacity-50 mt-2'}>Play Video</div>  
        {/*get_video({src:'https://ik.imagekit.io/ycc/pexels-ivan-samkov-7121336_Lt_jTVyM-.mp4'})*/}    
      </div>
    )  
    ret=(
      <div className={s.collab_item+''}> 
        <div className={s.gray_block+' flex items-center'}>
          <div className={''}>{video_}</div>          
          <div className={''}>{users_}</div> 
          <div className={''}><Button type="action2" clickHandler={update}>Update</Button></div>
        </div> 
        <Video_popup isOpen={isVideo} setOpen={setVideo} src={performance_video_path_}/>            
      </div>
    )
  }
  return ret
} 



export {
  ItemCollabContent,
  ItemCollabExpand,  
  ItemCollabAction,
  itemCollabStatus,
  item_collab_config
}