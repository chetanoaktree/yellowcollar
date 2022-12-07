import React, { useState, useEffect } from 'react';
import Sales from '../../../ui/lib/view/business/sales_u';
import getUser from '../../get/user';
import { usePage } from "/ui/lib/hooks/usePage";
import {extract_items} from '../../get/search';

import process from '../../process';
//import {rejectHandler, acceptHandler, collabAgainHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id='', ...props}) => {  
   
  const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true 
  args.showfooter=false  

  const router = useRouter(); 
  const page=usePage()
  const[isItems, setItems] = useState([])  
  
  const getData = async (i={}) => {          
    let user=getUser()
    //console.log('user', user)
    page.showLoading("guest")
    const sales = await axios.post(process.env.API+'/api/business/sale/', {business_id:user.id, ...i});
    console.log('sales_data2', sales.data)

    setItems(sales.data)  
    page.hideLoading()       
  } 

  const handler2 = async (i) => {      
    //console.log("i", i)
    getData(i)     
  } 
/*
  useEffect(() => { 
     getData() 
     return(()=>{
      setItems([])
    })  
  }, []); */


  const handler= async (i)=>{
    let user=getUser()
    console.log('handler :' + i.action, i) 
    const res = await axios.post(process.env.API+'/api/business/sale/', {business_id:user.id, ...i});
    console.log('handler_data: ' + i.action, res.data)    
    return  res.data
  } 

  return (
    <Sales {...args} items={isItems} {...{handler}}></Sales>
  )
}
export default com
