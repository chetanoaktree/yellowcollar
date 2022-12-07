import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_PAYMENT_SET, PAGE_PAYMENT_RESET} from "/store/types";
import Collab from '../../../ui/lib/view/business/collab_u';
//import getUser from '../../get/user';
import { process_collab }  from '../../get/collab';
//mport getShortUrl from '../../get/short_url';
import { usePage } from "/ui/lib/hooks/usePage";
import process from '../../process';
import {rejectHandler, collaborateHandler, acceptHandler, messageHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

import {ikHandler} from '../../get/image_v';


const com = ({id, ...props}) => {   

  const router = useRouter(); 
  const page=usePage()

  const dispatch = useDispatch();  
  const {user, payment} = useSelector((state) => state.pageData)

  const args = process()
  //args.navArgs.home="/app/shop/"
  args.showShopNav=true 
  args.showfooter=false 
  args.navArgs.fullWidth=true
  args.items=[]
  args.item={}
  
  const[isPW, setPW] = useState({token:'', order_id:'', isPopupOpen:false})
  const[isItem, setItem] = useState({})
  const[isItems, setItems] = useState([])
  const[isArgs, setArgs] = useState(args)

 
  const getData2 = async () => {  
    //let user=getUser()
    //console.log('user', user)    
    const collabs = await axios.post(process.env.API+'/api/business/collab/', {userType:user.userType, business_id:user.id});
    console.log('collabs_data', collabs.data)   
    //setItems(collabs.data.items)  
    setArgs((prev)=>{return {...prev, items:collabs.data.items, tresholds:collabs.data.tresholds}})    
  } 
  const getData3 = async (collab_id) => {     
    id= id ? id : collab_id
    if(!collab_id) page.showLoading("guest")
    const collab = await axios.post(process.env.API+'/api/business/collab/'+id, {userType:user.userType, business_id:user.id});    
    if(!collab_id) {
      console.log('refresh', collab.data) 
    }else{
      console.log('collab_data', collab.data)
    } 
    //setItem(collab.data)
    
    if(collab.data && collab.data.id){
      setArgs((prev)=>{
        //collab.data=process_collab(collab.data, prev.tresholds)
        let next= {...prev, item:collab.data}
        return next
      })  
    }  
    if(!collab_id) page.hideLoading()
  } 
  
  useEffect(async () => { 
    if(id){        
      console.log('collab_id', id)
      await getData2()  
      await getData3()  
    }  
  }, [id]); 


  const refreshHandler = async (i)=>{    
    getData3(i.collab_id)  
  }
  const breakdownHandler = async (event, item, e)=>{
    console.log("breakdownHandler", event)
    console.log('/app/collab/'+item.id+'/breakdown')
    const win = window.open('/app/collab/'+item.id+'/breakdown', "_blank");
    win.focus();   
  }
  const performanceHandler = async (event, item, e)=>{
    console.log("performanceHandler", event)
    console.log('/app/collab/'+item.id+'/performance')
    const win = window.open('/app/collab/'+item.id+'/performance', "_blank");
    win.focus();   
  }  

  const paidHandler2 = async (i)=>{
    console.log("final_payment", i)   
    const tempCollab = await axios.post(process.env.API+'/api/business/collab/payment', {...i, action_2:'create_temp_collab'});
    console.log('tempCollab_data', tempCollab.data) 
    if(tempCollab.data){
      i.shortid = tempCollab.data.shortid  
      i.token = tempCollab.data.token  
      setPW({token:i.token, order_id:i.shortid, isPopupOpen:true})    
    } 
    /*dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:true, amount:i.amount, for:'collab', action:'final_payment',  meta:i},
    });*/
    //const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
    //console.log('paid_data', collab.data)
    //return collab.data     
  }  
  const paidHandler2_backup = async (i)=>{
    console.log("final_payment", i)
    dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:true, amount:i.amount, for:'collab', action:'final_payment',  meta:i},
    });
    //const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
    //console.log('paid_data', collab.data)
    //return collab.data     
  }  
  const initPaymentPaidHandler2 = async (i)=>{
    console.log("init_payment", i)    
    const tempCollab = await axios.post(process.env.API+'/api/business/collab/payment', {...i, action_2:'create_temp_collab'});
    console.log('tempCollab_data', tempCollab.data) 
    if(tempCollab.data){
      i.shortid = tempCollab.data.shortid  
      i.token = tempCollab.data.token  
      setPW({token:i.token, order_id:i.shortid, isPopupOpen:true})    
    } 
    /*dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:true, amount:i.amount, for:'collab', action:'init_payment',  meta:i},
    });*/
    //const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
    //console.log('paid_data', collab.data)
    //return collab.data     
  }  
  const initPaymentPaidHandler2_backup = async (i)=>{
    console.log("init_payment", i)
    dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:true, amount:i.amount, for:'collab', action:'init_payment',  meta:i},
    });
    //const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
    //console.log('paid_data', collab.data)
    //return collab.data     
  }  

  const payment_result = async (payment) =>{  
    dispatch({
      type: PAGE_PAYMENT_RESET,
      payload: {},
    });   
    const res = await axios.post(process.env.API+'/api/business/collab/action', {method:payment.method, ...payment.meta, meta:payment.meta});
    const data = res.data;
    console.log("payment_result", payment)      
    refreshHandler(id)
    return data    
  }

  if(payment.status=='payment_completed' && payment.for=='collab'){    
    //payment_result(payment)
  }

  const handler = async (i) =>{  
    console.log("handler data", i)       
    const res = await axios.post(process.env.API+'/api/business/collab/action', {userType:user.userType, business_id:user.id, ...i});
    const data = res.data;
    console.log("handler result", data)      
    refreshHandler(id)
    return data    
  }

  return (
    <Collab {...isArgs} isPW={isPW} {...{handler, ikHandler, collaborateHandler, refreshHandler, acceptHandler, initPaymentPaidHandler:initPaymentPaidHandler2, paidHandler:paidHandler2, messageHandler, breakdownHandler, performanceHandler}}></Collab>
  )
}
export default com
