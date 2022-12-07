import React, { useState, useEffect } from 'react';
import Orders from '../../../ui/lib/view/influencer/orders_u';
import getUser from '../../get/user';
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
  const[isArgs, setArgs] = useState(args) 

  
  const refreshHandler = ()=>{   
    getData()    
  }


  const getData = async () => {          
    let user=getUser()    
    console.log('user', user)
    page.showLoading("guest")
    const orders = await axios.post(process.env.API+'/api/influencer/order/', {influencer_id:user.id});
    console.log('orders_data2', orders.data)    

    setArgs({...isArgs, items:orders.data})
    page.hideLoading()       
  } 
  
  useEffect(() => { 
    //if(!isArgs.items){      
      getData() 
    //}  
    return(()=>{
      setArgs(false)
    })
  }, []); 

  return (
    <Orders {...isArgs}></Orders>
  )
}
export default com
