import React, { useState, useEffect } from 'react';
import { GET_SAMPLE, CART_FASTY, CART_UPDATE, CART_SET, CART_ADD_ITEM, CART_SUB_ITEM, CART_DELETE_ITEM, SAMPLE_ERROR } from "/store/types";
import { useDispatch, useSelector } from "react-redux";

import Cart from '../../../ui/lib/view/influencer/cart';
import { usePage } from "/ui/lib/hooks/usePage";
import process from '../../process';
import getUser from '../../get/user';
import axios from 'axios';

const com = ({id, ...props}) => {  
  const dispatch = useDispatch();  
  const page=usePage()
  const args = process()
  //args.navArgs.home="/app/shop/"
  args.showShopNav=false
  args.showfooter=false  
  
  const[isArgs, setArgs] = useState(args)
  
  const cartData = useSelector((state) => state.cartData);


  console.log("cartData_cart", cartData)

  const dataHandler=(i)=>{
    console.log("data", i)
    localStorage.setItem('checkout', JSON.stringify(i));  
    let data = localStorage.getItem('checkout');
    data = JSON.parse(data)
    console.log("data2", data)
  }
  
  

  const getData = async () => {          
    let user=getUser()
    
    console.log('user', user)     
    const collabs = await axios.post(process.env.API+'/api/influencer/collab/', {influencer_id:user.id});
    console.log('collabs_data', collabs.data)

    setArgs({...isArgs, items:collabs.data.items}) 
        
  } 
  
  useEffect(() => { 
    page.showLoading("guest")
    setTimeout(()=>{
      page.hideLoading()     
    }, 500)
     //getData()

  }, []); 

  useEffect(async () => { 
    if(cartData.change) {
      const cart = await axios.post(process.env.API+'/api/influencer/cart', {action:'update', items:cartData.items});
      console.log('cart_data', cart.data)
      console.log("CART CHANGE", cartData.items)
      dispatch({
        type: CART_UPDATE,
        payload: {change:0, ...cart.data},
      });
    }

  }, [cartData.change]); 


  

  const handler=({action, ...i})=>{
     console.log("i",i)
    if(action=='delete_item'){
     
      dispatch({
        type: CART_DELETE_ITEM,
        payload: i,
      });

      localStorage.setItem('cart', JSON.stringify(cartData));  
    }else if(action=='add_item'){
     
      dispatch({
        type: CART_ADD_ITEM,
        payload: i,
      });
     
    }else if(action=='sub_item'){
     
      dispatch({
        type: CART_SUB_ITEM,
        payload: i,
      });
    }
  }

  

  return (
    <Cart {...isArgs}  {...cartData} handler={handler}></Cart>
  )
}
export default com
