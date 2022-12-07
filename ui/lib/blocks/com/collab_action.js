import React, { useState } from "react";
import _ from "lodash"
import Link from 'next/link'
import Title from '../../title';
import Button from '../../button';
import s from './collab_action.module.scss';
import Moment from 'moment';

const com = ({className, userType, item, initPaymentPaidHandler, collabDetailsHandler, paidHandler, liveHandler, completedRequestHandler, completedHandler, i}) => {
  //if(item.status!="init_payment") return(<></>)
  let out
 // if(!_.includes(["business_accepted", "init_payment", "amount", "init_payment_paid", "live", "completed"], item.status)) return(<></>)
  item.influencer=item.influencer2

  //console.log("collab action item", userType)
  // business
  const BusineessCollabDetails=()=>{      
    return(
      <div>          
        <Button type="action2" color="blue" clickHandler={(e) => {collabDetailsHandler()}}>Collaboration Details</Button>
        {/*<Button type="action2" color="blue" clickHandler={(e) => {}}>Make Payment</Button>  */}       
      </div>
    )
  } 
  const BusinessAccepted=()=>{      
    return(
      <div>          
        <Button type="action2" clickHandler={(e) => {collabDetailsHandler()}}>Collaboration Details</Button>
        {/*<Button type="action2" color="blue" clickHandler={(e) => {}}>Make Payment</Button>  */}       
      </div>
    )
  }  
  const InitPayment=()=>{      
    return(
      <div>          
        <Button type="action2"clickHandler={(e) => initPaymentPaidHandler()}>Make Payment</Button>
        {/*<Button type="action2" color="blue" clickHandler={(e) => {}}>Make Payment</Button>  */}       
      </div>
    )
  }  
  const Amount=()=>{     
    return(
      <div>          
        <Button type="action2"clickHandler={(e) => paidHandler()}>Make Final Payment</Button>
      </div>
    )
  }

  // influencer
  const InitPaymentPaid=()=>{      
    return(
      <div>          
        <Button type="action2" color="blue" clickHandler={(e) => liveHandler()}>Promotion Live</Button>           
      </div>
    )
  }
  const Live=()=>{      
    return(
      <div>          
        <Button type="action2" clickHandler={(e) => completedRequestHandler()}>Promotion Completed</Button>           
      </div>
    )
  }
  
  if(userType=="business"){
    out=(
      <div>
        {(item.status!="requested" && item.status!="business_accepted")  && <div className={s.details}><BusineessCollabDetails ></BusineessCollabDetails></div>} 
        {item.status=="business_accepted"  && <BusinessAccepted ></BusinessAccepted>}        
        {item.status=="init_payment"  && <InitPayment ></InitPayment>} 
        {item.status=="completed"  && <Amount ></Amount>}  
      </div>
    )
  }else{
    out=(
      <div>
        {item.status=="init_payment_paid"  && <InitPaymentPaid ></InitPaymentPaid>} 
        {item.status=="live"  && <Live ></Live>}  
      </div>
    )
  }
  
  return(
    <div className={s.action+' '+className} >
      <div className={s.action_inner} >
        {out}           
      </div>
    </div>
  )
}
export default com