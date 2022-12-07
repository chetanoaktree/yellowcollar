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
    let _d = await handler({action:'update_fee_reject', id, type, type_id, in_data, result:'rejected'})
    if(_d.action_status=='done') {
      setS('done')  
      setItem(prev => ({...prev, result:'rejected'}))    
    }
  } 
  const approve = async() => {
    let in_data=meta
    let _d = await handler({action:'update_fee_approve', id, type, type_id, in_data, result:'approved'})
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

const item_influencer_config = (i) =>{ 
  let {action} = i  
  let ret={expand:false, action:false} 
  if(action=='update_fee') {
    ret.expand=true
    ret.action=true
  }else if(action=='Promotion Complete' || action=='Performance Video') {
    ret.expand=true
  }
  return ret
} 

const ItemInfluencerAction = (i) =>{    
  let {action} = i
  let ret = false
  if(action=='update_fee') {
    ret =requestAction(i)
  }
  return ret
} 

const itemInfluencerStatus = (i) => { 
  let {action, isItem, product} = i 
  let o={bottom:''}
  if(action=='update_fee'){      
    o.done = (isItem.result =='approved') ? {label: "Approved" , color:"green"} : {label: "Rejected" , color:"red"}  // set conditional rejected : red
    o.not_done = {label:"Approval Required", color:"blue"}   

  }else if(action=='Promotion Complete' || action=='Performance Video'){      
    o.done={label:"Updated", color:"green"}
    o.not_done = {label:"Update Required", color:"blue"}  

  }     
  o.action = {label:'Influencer '+action, color:"orange"}      
  o.bottom = product ? product.title :''
  return o
}

const ItemInfluencerContent = (i) =>{
  let {action, collab, influencer, business, collab_request} = i  
  const [isL, setL]= useState({}) 
  let users_
  let display_users=true
  if(action=='update_fee'){
    return (<div></div>)
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

const ItemInfluencerExpand = (i) =>{ 
  let {id, type, meta, action, influencer} = i
  let {fixed_fee_story, fixed_fee_reel, fixed_fee_video, fixed_fee_post} = influencer.meta ? influencer.meta : {}
  meta.newMeta= meta.newMeta ? meta.newMeta : {}
  meta.oldMeta= meta.oldMeta ? meta.oldMeta : {}
  let newMeta ={...{fixed_fee_story:0, fixed_fee_reel:0, fixed_fee_video:0, fixed_fee_post:0}, ...meta.newMeta}
  let oldMeta ={...{fixed_fee_story:0, fixed_fee_reel:0, fixed_fee_video:0, fixed_fee_post:0}, ...meta.oldMeta}
  let l={}
  
  const [isL, setL]= useState(l)
  let ret =false
  if(action=='update_fee') {
    const update = async() => {
      let in_data={performance_id:collab.performance_id, ...isL}
      let _d= await handler({action:'update_performance', id, type, in_data})
      if(_d.action_status=='done') setS('done')
    }

    let fileds_ = infoFields({
      items:[        
        {label:'Name', value:influencer.name},
        {label:'Fixed Fee Story', value:oldMeta.fixed_fee_story, change_value:newMeta.fixed_fee_story},
        {label:'Fixed Fee Reel', value:oldMeta.fixed_fee_reel, change_value:newMeta.fixed_fee_reel},
        {label:'Fixed Fee Video', value:oldMeta.fixed_fee_video, change_value:newMeta.fixed_fee_video},
        {label:'Fixed Fee Post', value:oldMeta.fixed_fee_post, change_value:newMeta.fixed_fee_post},        
      ]
    })
     
    ret=(
      <div className={s.collab_item+' w-full'}> 
        <div className={s.gray_block+' flex items-center w-full'}>           
          <div className={'flex-grow'}>{fileds_}</div> 
          {/*<div classname={''}><Button type="action2" clickHandler={update}>Update</Button></div>*/}
        </div>              
      </div>
    )
  }
  return ret
} 




export {
  ItemInfluencerContent,
  ItemInfluencerExpand,  
  ItemInfluencerAction,
  itemInfluencerStatus,
  item_influencer_config
}