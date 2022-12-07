import React, { useState,  useEffect } from 'react';
import { useRouter } from 'next/router'
import { GET_SAMPLE, CART_FASTY, CART_UPDATE, CART_SET,  CART_RESET, CART_ADD_ITEM, CART_DELETE_ITEM, SAMPLE_ERROR } from "/store/types";
import { APP_SET, PAGE_PAYMENT_SET, PAGE_PROCESS_SET, PAGE_PAYMENT_RESET} from "/store/types";
import { useDispatch, useSelector } from "react-redux";

import Checkout from '../../../ui/lib/view/influencer/checkout_u';
import { usePage } from "/ui/lib/hooks/usePage";
import process2 from '../../process';
import getUser from '../../get/user';
import axios from 'axios';

let a=0


const com = ({id, ...props}) => {  
  let country_options=[
    {label:"India", value:'india'},
    {label:"Germany", value:'germany'},
    {label:"Spain", value:'spain'},
    {label:"UK", value:'uk'},
    {label:"USA", value:'usa'}
  ]

  let shipping_options=[
    {label:"Free Shipping", name:'shipping_method', value:'free_shipping'},   
    //{label:"Fedex", name:'shipping_method', value:'fedex'}   
  ]

  let billing_address_options=[
    {label:"Same as shipping address", name:'is_billing_address', value:'same'},
    {label:"Use different billing address", name:'is_billing_address', value:'different'}      
  ] 

  let payment_options=[     
    {label:"Paytm", name:'payment_method', value:'paytm'},   
  ]


  let item={
    country:country_options[0], 
    mobile:'', 
    first_name:'', 
    last_name:'',
    address:'',
    city:'',
    state:'',
    pincode:'',
    shipping_method:'',
    payment_method:'',
    is_billing_address:billing_address_options[0],
    b_first_name:'', 
    b_last_name:'',
    b_address:'',
    b_city:'',
    b_state:'',
    b_country:country_options[0], 
    b_pincode:'', 
    tax:0,     
    sub_total:0,
    platform_fee:0,  
    total:0,
  }


  const router = useRouter()
  const {step } = router.query  
  const dispatch = useDispatch();  
  const page=usePage()
  const args = process2()
  //args.navArgs.home="/app/shop/"
  args.showShopNav=false
  args.showfooter=false  
  
  const[isPW, setPW] = useState({token:'', order_id:'', isPopupOpen:false})
  const[isProcessing, setProcessing] = useState(false)
  const[isData, setData] = useState(item)
  const cartData = useSelector((state) => state.cartData);
  //const pageData = useSelector((state) => state.pageData);   
  const {app, payment, user, isProcess, membership} = useSelector((state) => state.pageData);

  //console.log("user", user)
  //console.log("payment", payment)

  console.log("checkout app", app)
  
  ////console.log("cartData_checkout", cartData)

  const processedData = async (data) => {
     const shippingProcess = await axios.post(process.env.API+'/api/influencer/checkout', {action:'process_shipping', ...data});
     let d= shippingProcess.data ? shippingProcess.data : {}
     localStorage.setItem('checkout', JSON.stringify({...data, ...d})); 
     return d
  }

  useEffect(()=>{
    console.log("router", router.query.step)
    let item_    
    if(router.query.step=="payment_gateway"){
      if(item_=localStorage.getItem('checkout')){
        item_ = JSON.parse(item_)
        create_temp_order(item_)
      }      
    }  
  },[])

  useEffect(async () => { 
    if(cartData.change) {
      const cart = await axios.post(process.env.API+'/api/influencer/cart', {action:'update', items:cartData.items});
      //console.log('cart_data', cart.data)
      //console.log("CART CHANGE", cartData.items)
      dispatch({
        type: CART_UPDATE,
        payload: {change:false, ...cart.data},
      });
    }

  }, [cartData.change]); 

  useEffect(async() => {
    let item_, item2
    console.log("A cartData", cartData)  
    if(item_=localStorage.getItem('checkout')){       
      item_ = JSON.parse(item_)
      console.log("A item_", item_)  
      item2={...item, ...item_}
      item2.items=cartData.items
      setData(item2)
    }
    if(item2){ 
      const d = await processedData(item2);  
      console.log("A d", d) 
      console.log("A item_2", item2)
      setData({...item2, ...d})
    }
  }, []); 

  const create_temp_order = async(data) =>{
    console.log('create_temp_order', data) 
    data.influencer_id=user.id
    setProcessing(true)      
    const tempOrder = await axios.post(process.env.API+'/api/influencer/order/action', {action:'create_temp_order', ...data});
    console.log('tempOrder_data', tempOrder.data) 
    if(tempOrder.data){
      data.shortid = tempOrder.data.shortid  
      data.token = tempOrder.data.token  
      setPW({token:data.token, order_id:data.shortid, isPopupOpen:true})    
    } 
    
    //console.log('order_data', data) 
    setProcessing(false)
  }
  const dataHandler= async (to, i)=>{   
    localStorage.setItem('checkout', JSON.stringify(isData));  
    let data = localStorage.getItem('checkout');
    data = JSON.parse(data)
    //data={items:cartData.items, ...data, influencer_id:user.id}
    //console.log("data2", data)   
    if(to=="complete_order"){

      await create_temp_order(data)
      router.push('/app/checkout/?step='+to)

    }else{      

      let d= await processedData(data);     
      dispatch({
        type: APP_SET,
        payload: {checkout:d},
      });      
      router.push('/app/checkout/?step='+to)
    }
  }  
  
  const handler=({action, ...i})=>{
     //console.log("i",i)
    if(action=='delete_item'){
     
      dispatch({
        type: CART_DELETE_ITEM,
        payload: i,
      });
    }
  }

  return (
    <Checkout {...args} isPW={isPW} isProcessing={isProcessing} items={cartData.items} isData={isData} setData={setData} step={step} 
      handler={handler} dataHandler={dataHandler} 
      country_options={country_options} shipping_options={shipping_options} payment_options={payment_options} billing_address_options={billing_address_options}
    ></Checkout>
  )
  
}
export default com
