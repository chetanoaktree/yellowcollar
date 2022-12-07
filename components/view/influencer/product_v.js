import React, { useState, useEffect } from 'react';
import { GET_SAMPLE, CART_FASTY, CART_ADD_ITEM, PAGE_RECENT_PRODUCTS_ADD } from "/store/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import {usePage} from '/ui/lib/hooks/usePage';
import getUser from '../../get/user';
import Product from '../../../ui/lib/view/influencer/product_u';
import process from '../../process';
import axios from 'axios';

const com = ({id, ...props}) => { 
  const dispatch = useDispatch(); 
  const cartData = useSelector((state) => state.cartData);
  const router = useRouter()
  const page=usePage() 
  const args = process()
  let id_=id 
  //console.log("init id", id)
  let user_={}
  let cart= page.cart
  let isCart =page.isCart
  //console.log("product cart", isCart)

  const { recentProducts } = useSelector((state) => state.pageData);

  const add2cartHandler = async (i)=>{
    /*dispatch({
      type: CART_FASTY,
      payload: "Best in Class",
    });*/  
   
    dispatch({
      type: CART_ADD_ITEM,
      payload: i,
    });
    //const cartData2 = useSelector((state) => state.cartData);
    //console.log("CD", cartData)    
    //localStorage.setItem('cart', JSON.stringify(cartData));  
    

    //await page.cartAddItem(i)     
    //const res = await axios.post(process.env.API+'/api/influencer/buy/', i);
    //console.log('add to cart res', i)
    //console.log("page", isCart.items)
    //await getData(i.product_id)

    let user=getUser()   
    const res = await axios.post(process.env.API+'/api/influencer/cart/', {influencer_id:user.id, ...i});
    console.log('buy res', res.data)
    return res.data
    
  }
  const handler = async (i)=>{  
    let user=getUser()   
    const res = await axios.post(process.env.API+'/api/influencer/product/', {influencer_id:user.id, ...i});
    console.log('buy res', res.data)
    return res.data
  }
  const buyHandler = async (i)=>{  
    const res = await axios.post(process.env.API+'/api/influencer/buy/', i);
    console.log('buy res', res.data)
    await getData(i.product_id)
  }
  const inviteHandler = async (i)=>{    
    const res = await axios.post(process.env.API+'/api/influencer/collab/action',  i);
    //console.log('inviteHandler res', res.data)   
    await getData(i.product_id)   
  }
  const performanceHandler = async (i) => {      
    console.log('/app/collab/'+i.collab_id+'/performance')
    const win = window.open('/app/collab/'+i.collab_id+'/performance', "_blank");
    win.focus();     
  }
  const collaborateAgainHandler = async (i) => {    
    const res = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    //console.log('inviteHandler res', res.data)   
    await getData(i.product_id) 
  }
  args.handler=handler
  args.add2cartHandler=add2cartHandler
  args.buyHandler=buyHandler
  args.inviteHandler=inviteHandler
  args.navArgs.home="/"
  args.showShopNav=false 
  args.navArgs.noborder=true 
  args.navArgs.translucent=true 
  

  const[isArgs, setArgs] = useState(args)  
  
  const getData = async (id2) => {      
    let user=getUser()   
    id = id2 ? id2 : id
    page.showLoading("guest")
    const res = await axios.post(process.env.API+'/api/influencer/product/'+id, {influencer_id:user.id});
    
    const data = res.data;
    if (!data.id) {
      router.push('/redirect?mode=p&type=not_exists&id='+id)
    }
    console.log('data', data)
    //console.log('1 id', id)      
    add2RecentProducts(data)
    setArgs({...isArgs, item:data, performanceHandler, collaborateAgainHandler, user})   
    page.hideLoading()    
  } 
  const getData2 = async (id_) => { 
    //console.log('2 id_', id_)      
  } 
  const add2RecentProducts = (item) =>{   
    dispatch({
      type: PAGE_RECENT_PRODUCTS_ADD,
      payload: item,
    });
    console.log("recentProducts", recentProducts)
  }  
  
  useEffect(async () => {     
    if(id){  
      args.id=id 
      await getData()  
    }  
  }, [id]); 

  return (
    <Product isChange {...isArgs}></Product>
  )
}
export default com
