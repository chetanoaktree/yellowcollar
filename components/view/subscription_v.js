import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_PAYMENT_SET, PAGE_PAYMENT_RESET, PAGE_MEMBERSHIP_SET} from "/store/types";
import InfluencerSubscription from './influencer/subscription_v';
import BusinessSubscription from './business/subscription_v';
import process from '../process';
import axios from 'axios';

const com = ({id, ...props}) => { 
  let view_  
  const args = process() 

  const[isPW, setPW] = useState({token:false, order_id:'', isPopupOpen:false})

  const dispatch = useDispatch();  
  const {payment, user, membership} = useSelector((state) => state.pageData)

  console.log("sub user", user)
  const processTemp = async (i) => {
    i.user_id=user.id
    i.user_type=user.userType
    i.user_name=user.user_name
    i.plan=i.name
    console.log("processTemp", i)
    const temp = await axios.post(process.env.API+'/api/com/membership/action', {action_2:'create_temp_sub', ...i});
    console.log('temp_data', temp.data) 
    if(temp.data){      
      i.shortid = temp.data.shortid  
      i.token = temp.data.token  
      let argsPW={token:i.token, order_id:i.shortid, isPopupOpen:true}
      console.log('argsPW', argsPW) 
      setPW(argsPW)    
    } 
  }

  const handler = async (i) => {   
    console.log("handler", i)
    const temp = await axios.post(process.env.API+'/api/com/membership/action', {user_id:user.id, user_type:user.userType, user_name:user.name, ...i});
    console.log('handler_data', temp.data) 
    return temp.data
  }
  
  //console.log("membership view 2", membership)
 // const args2={}  
  args.chooseHandler =async (i) =>{      
    i.action='new_membership'
    if(isPW.token==false){
      processTemp(i)
    }else{
      setPW(prev =>({...prev, isPopupOpen:true}) ) 
    }    
    /*
    const {price, name}=i  
    dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:true, amount:price, for:'subscription', action:'new_membership',  meta:i},
    });*/
  }
  args.upgradeHandler =async (i) =>{    
    i.action='upgrade_membership'
    if(isPW.token==false){
      processTemp(i)
    }else{
      setPW(prev =>({...prev, isPopupOpen:true}) ) 
      console.log('argsPW', isPW) 
    }
    /*
    const {price, name}=i  
    dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:true, amount:price, for:'subscription', action:'upgrade_membership', meta:i},
    });*/
  }
  args.meta_list=[
    {for:'influencer', label:"Promotional requests", name:'promotional_requests', type:''},
    {for:'influencer', label:"Platform Fee", name:'platform_fee_order', type:'%'},
    {for:'influencer', label:"Success Fee (on total amount)", name:'platform_fee_collab', type:'%'},
    {for:'business', label:"Partnership fee", name:'platform_fee_collab', type:'%'},
    {for:'business', label:"Sales commission", name:'platform_fee_sale', type:'%'},    
  ]
  

  

  const payment_result = async (action, {result, meta}) =>{    
    const res = await axios.post(process.env.API+'/api/com/membership/action', {action, user_id:user.id, user_type:user.userType, user_name:user.name, plan:meta.name, duration:meta.duration, level:meta.level, meta:meta.meta});
    const data = res.data;
    //console.log("payment_result", data)  
    dispatch({
      type: PAGE_PAYMENT_RESET,
      payload: {},
    });
    dispatch({
      type: PAGE_MEMBERSHIP_SET,
      payload: data,
    });
    localStorage.setItem('membership', JSON.stringify(data));
  }

  if(payment.status=='payment_completed' && payment.for=='subscription'){    
    payment_result(payment.action, payment)
  }

  let args2={...args, id, membership, isPW, setPW, handler}

  if(args.userType=='business'){
    view_=<BusinessSubscription  {...args2} ></BusinessSubscription>
  }else if(args.userType=='influencer'){
    view_=<InfluencerSubscription {...args2} ></InfluencerSubscription>
  }  
  return (
    <>
      {view_}      
    </>
  )
}
export default com
