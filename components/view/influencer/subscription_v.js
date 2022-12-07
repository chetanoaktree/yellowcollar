import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_PAYMENT_SET, PAGE_PAYMENT_RESET, PAGE_MEMBERSHIP_SET} from "/store/types";
import Subscription from '../../../ui/lib/view/influencer/subscription_u';
import process from '../../process';
import axios from 'axios';

const com = ({id, ...props}) => {   
  const args = {}
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true  
  
  //const dispatch = useDispatch();  
  //const {payment, user, membership} = useSelector((state) => state.pageData);
  const[isArgs, setArgs] = useState({})
  const[isItems, setItems] = useState({})
  
  const getData = async () => { 
    const res = await axios.post(process.env.API+'/api/influencer/subscriptions', {action:'get'});
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
        'Success Fee (on total amount) - 15%',
        'Barter - no',
        'Promotional requests - 10',
      ] ,
      meta:{       
        platform_fee_collab:"15",
        platform_fee_order:"15",
      }       
    },  
    {label:'Gold', name:'gold', level:1,
      monthly:{price:400, months:'Monthly', save:'', duration:1, per_month:400},  
      yearly:{price:4200, months:'12 Months', save:600, duration:12,  per_month:350},
      points:[
        'Success Fee (on total amount) - 5%',
        'Barter - no',
        'Promotional requests - 30',
      ],
      meta:{        
        platform_fee_collab:"5",
        platform_fee_order:"5"
      }     
    },   
    {label:'Platinum', name:'platinum', level:2,
      monthly:{price:700, months:'Monthly', save:'', duration:1, per_month:700},  
      yearly:{price:7200, months:'12 Months', save:800, duration:12,  per_month:600},
      points:[
        'Success Fee (on total amount) - 4%',
        'Barter - yes',
        'Promotional requests - Unlimited',
      ],
      meta:{        
        platform_fee_collab:"4",
        platform_fee_order:"4"
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
    <Subscription {...isArgs}  items={isItems} {...props}></Subscription>
  )
}
export default com
