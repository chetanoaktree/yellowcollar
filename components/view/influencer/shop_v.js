import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { CART_ADD_ITEM} from "/store/types";
import { useDispatch, useSelector } from "react-redux";
import Shop from '../../../ui/lib/view/influencer/shop_u';
import {usePage} from '/ui/lib/hooks/usePage';
import process from '../../process';
import axios from 'axios';
let a=1
let b=1
const com = ({id, ...props}) => {
  
  
  const args = process()
  //args.navArgs.home="/app/shop/"
  args.showFooter=true  

  if(args.user && args.user.userType!="influencer")  return (<div></div>)
  
  const dispatch = useDispatch(); 
  const router = useRouter()
  const page=usePage()
  //const[isArgs, setArgs] = useState(args)

  const {user} = useSelector((state) => state.pageData);
  
  console.log("#### 5 VVVVVVVVVVVVVVVVVV "+ a, args) 
  a+=1  

  const handler = async (i) => { 
    page.showLoading("guest")
    const res = await axios.post(process.env.API+'/api/influencer/shop', {influencer_id:user.id, ...i});
    const data = res.data;
    console.log('#### 5a SHOP data '+b, data)
    b+=1
    page.hideLoading()
    return  data;
  } 

  const add2cartHandler = async (i)=>{
    i.img='/products/'+i.img   
    dispatch({
      type: CART_ADD_ITEM,
      payload: i,
    });
    router.push("/app/checkout/?step=information")  
  }
  
  /*
  useEffect(() => { 
    if(id){        
      console.log('id2', id)
      args.id=id 
      getData()  
    }  
  }, []); */
  
  return (
    <Shop {...args}  handler={handler} add2cartHandler={add2cartHandler}></Shop>
  )
}
export default com
