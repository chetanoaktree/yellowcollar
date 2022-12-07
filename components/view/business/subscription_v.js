import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_PAYMENT_SET, PAGE_PAYMENT_RESET, PAGE_MEMBERSHIP_SET} from "/store/types";
import Subscription from '../../../ui/lib/view/business/subscription_u';
import process from '../../process';
import axios from 'axios';

const com = ({id, ...props}) => {   
  //const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true  
  
  //const dispatch = useDispatch();  
  //const {payment, user, membership} = useSelector((state) => state.pageData);
  const[isArgs, setArgs] = useState({})
  const[isItems, setItems] = useState({})
  //console.log("membership view2", membership)
  
 
  const getData = async () => { 
    const res = await axios.post(process.env.API+'/api/business/subscriptions', {action:'get'});
    const data = res.data;
    console.log('data', data)
    setItems(data)       
  } 
  
  useEffect(() => {
    getData()      
  }, []);

  const items=[
    {label:'Free', name:'free', level:0,
      monthly:{price:0, months:'Monthly', save:'', duration:1, per_month:0},  
      yearly:{price:0, months:'12 Months', save:'', duration:12,  per_month:0},
      points:[
        'Partnership fee - 5%',
        'Sales commission - 5%'
      ], 
      meta:{
        platform_fee_collab:"5",
        platform_fee_sale:"5", 
      } 
    },  
    {label:'Standard', name:'standard', level:1,
      monthly:{price:1200, months:'Monthly', save:'', duration:1, per_month:1200},  
      yearly:{price:13200, months:'12 Months', save:1200, duration:12,  per_month:1100},
      points:[
        'Partnership fee - 3%',
        'Sales commission - 3%'
      ],
      meta:{
        platform_fee_collab:"3",
        platform_fee_sale:"3",        
      }       
    },   
    {label:'Premium', name:'premium', level:2,
      monthly:{price:1750, months:'Monthly', save:'', duration:1, per_month:1750},  
      yearly:{price:19800, months:'12 Months', save:1200, duration:12,  per_month:1650},
      points:[
        'Partnership fee - 2%',
        'Sales commission - 2%'
      ],
      meta:{
        platform_fee_collab:"2",
        platform_fee_sale:"2",        
      }  
    },    
  ]  

  
  /*const chooseHandler =(i) =>{
    const {price, name}=i
    console.log("i", i)
    dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:true, amount:price, for:'subscription', action:'new_membership',  meta:i},
    });
  }
  const upgradeHandler =(i) =>{
    const {price, name}=i
    console.log("i", i)
    dispatch({
      type: PAGE_PAYMENT_SET,
      payload: {active:true, amount:price, for:'subscription', action:'upgrade_membership', meta:i},
    });
  }

  

  const payment_result = async (action, {result, meta}) =>{    
    const res = await axios.post(process.env.API+'/api/com/membership/action', {action, user_id:user.id, plan:meta.name, duration:meta.duration});
    const data = res.data;
    console.log("payment_result", data)  
    dispatch({
      type: PAGE_PAYMENT_RESET,
      payload: {},
    });
    dispatch({
      type: PAGE_MEMBERSHIP_SET,
      payload: data,
    });
  }

  if(payment.status=='payment_completed' && payment.for=='subscription'){    
    payment_result(payment.action, payment)
  }
*/
  
  


  return (
    <Subscription {...isArgs} items={isItems} {...props}></Subscription>
  )
}
export default com
