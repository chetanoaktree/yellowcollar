import React, { useState,  useEffect, useMemo} from 'react';
import Button from '../../../button';
import Input from '../../../input2';

import {get_input, infoFields, ApproveReject, users} from './d_a_ui';


import {tag} from '../../_blocks/ui';
import s from './d_a_collab_au.module.scss';

const UPDATE='Update'

const itemProductStatus = ({action, isItem, influencer, business, product, collab, collab_request}) => {   
   let o={bottom:''}
   if(action==UPDATE){  
      o.done = (isItem.result =='approved') ? {label: "Approved" , color:"green"} : {label: "Rejected" , color:"red"}  // set conditional rejected : red
      o.not_done = {label:"Approval Required", color:"blue"}   

    }else if(action=='Promotion Complete'){      
      o.done={label:"Updated", color:"green"}
      o.not_done = {label:"Update Required", color:"blue"}  

    }     
    o.action = {label:'Product '+action, color:"orange"}      
    o.bottom = product ? product.title :''
    return o
}

const ItemProductContent = ({action, collab, influencer, business, product, collab_request}) =>{ 
  const [isL, setL]= useState({}) 
  let users_
  let display_users=true
  if(action==UPDATE){
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

const ItemProductExpand = ({handler, setS, id, type, action, influencer, business, product, campaign, collab, collab_request}) =>{ 
  let p ={image_id:'', title:'', price:'', ...product} 
  let cm = (campaign && campaign.meta ) ? campaign.meta : {}
  cm={product_url:'', ...cm} 

  let l={}
  if(action=='Promotion Complete') {
    l=collab.performance ? collab.performance : {id:0, click_through:0, engagement:0, followers:0, conversions:0, impressions:0}
  }
  const [isL, setL]= useState(l)
  const inputHandler = (n, v) => {
    setL(prev=>{
      return ({...prev, [n]:v})
    })
  }
  let ret =false
  if(action=='Update') {
    const update = async() => {
      let in_data={performance_id:collab.performance_id, ...isL}
      let _d= await handler({action:'update_performance', id, type, in_data})
      if(_d.action_status=='done') setS('done')
    }
    p.business.company_name = p.business.company_name ? p.business.company_name : p.business.name
    let fileds_ = infoFields({
      items:[
        {label:'id', value:'# '+p.id},
        {label:'Product', value:p.title},
        {label:'business', value:p.business.company_name},
        {label:'sku', value:p.sku},
        {label:'Price', value:p.price+' Rs.'},
        //{label:'image_id', value:p.image_id},
        {label:'Product_url', value:cm.product_url},        
      ]
    })

    const users_=(
      <div className={s.inputs+' flex flex-wrap items-center'}>
        {fileds_}           
      </div>
    )      
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

const ItemProductAction = ({handler, action, status, setItem, isS, setS, id, type, type_id, influencer, business, product}) =>{    
  let ret = false
  const reject = async() => {
    let in_data=product
    let _d = await handler({action:'update_reject', id, type, type_id, in_data, result:'rejected'})
    if(_d.action_status=='done') {
      setS('done')  
      setItem(prev => ({...prev, result:'rejected'}))    
    }
  }
  const approve = async() => {
    let in_data=product
    let _d = await handler({action:'update_approve', id, type, type_id, in_data, result:'approved'})
    if(_d.action_status=='done') {
      setS('done') 
      setItem(prev => ({...prev, result:'approved'}))           
    }
  }  
  if(action==UPDATE && isS!='done') {
    ret =( <ApproveReject rejectHandler={reject} approveHandler={approve}/>)
  }

  return ret
} 

const item_product_config = ({action}) =>{   
  let ret={expand:false, action:false} 
  if(action=='Request') {
    ret.expand=false
  }else if(action==UPDATE) {
    ret.expand=true
    ret.action=true
  }
  return ret
} 

export {
  ItemProductContent,
  ItemProductExpand,  
  ItemProductAction,
  itemProductStatus,
  item_product_config
}