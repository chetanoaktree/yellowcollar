import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Order from '../../../ui/lib/view/influencer/order';
import Handlers from './handlers/collab';
import { usePage } from "/ui/lib/hooks/usePage";

import process from '../../process';
//import {rejectHandler, acceptHandler, performanceHandler, collabAgainHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  
  
  const args = process() 
  args.showShopNav=false
  args.showfooter=false  

  const page=usePage()
  const router = useRouter(); 
  //const[isArgs, setArgs] = useState(true) 
  const[isLoading, setLoading] = useState(false) 
  const[isItem, setItem] = useState(false) 

  const {user} = useSelector((state) => state.pageData);   
  
  const refreshHandler = ()=>{   
    getData()    
  }

  const getData = async () => {    
    //console.log('user', id)
    page.showLoading("guest")
    const order = await axios.post(process.env.API+'/api/influencer/order/action', {action:'get_order', order_id:id, influencer_id:user.id});
    console.log('order_data_', order.data)    

    setItem(order.data)
    page.hideLoading()       
  } 
  const handler = async (i) => { 
    console.log('req', i)    
    const order = await axios.post(process.env.API+'/api/influencer/order/action', {influencer_id:user.id, order_id:id, ...i});
    console.log('res data', order.data)     
    return  order.data     
  } 


  
  useEffect(() => { 
    if(isLoading==false && id){
      setLoading(true)
      //console.log("router", router)      
      getData() 
    }  
    return(()=>{
      setLoading(true)
    })
  }, [isLoading]); 

  return (
    <Order {...args}  handler={handler} item={isItem} setItem={setItem}></Order>
  )
}
export default com
