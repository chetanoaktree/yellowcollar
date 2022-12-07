import React, { useState, useEffect } from 'react';
import UI from '../../../ui/lib/view/business/profile_u';
import getUser from '../../get/user';
import process from '../../process';
//import {rejectHandler, acceptHandler, messageHandler, initPaymentPaidHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {   

  const router = useRouter(); 

  const args = process()
  args.showfooter=false 
  
  const[isItem, setItem] = useState({})
  const[isCollabs, setCollabs] = useState([])
  const[isProducts, setProducts] = useState([])

  const getData = async () => {  
    let user=getUser()
    console.log('business', user)    
    const business = await axios.post(process.env.API+'/api/com/profile/action', {action:'get_business', business_id:user.id});
    console.log('get_business_data', business.data) 

    const collabs = await axios.post(process.env.API+'/api/com/profile/action', {action:'get_business_collabs', business_id:user.id});
    console.log('get_collabs_data', collabs.data) 

    const products = await axios.post(process.env.API+'/api/com/profile/action', {action:'get_business_products', business_id:user.id});
    console.log('get_products_data', products.data)        

    setItem(business.data) 
    setCollabs(collabs.data)  
    setProducts(products.data)    
  } 

  useEffect(() => { 
    getData()       
  }, []); 

  return (
    <UI {...args}  item={isItem} collabs={isCollabs} products={isProducts}>Business Profile</UI>
  )
}
export default com
