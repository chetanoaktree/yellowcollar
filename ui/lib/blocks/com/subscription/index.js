import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import getStatus from '../../../get/status';
import s from './index.module.scss';
import _ from 'lodash'

import Checkout from '../../../view/_blocks/checkout';
import Coupon from '../b_coupon_u';

const com = (props) => {
  let {items, isPW, meta_list, membership, chooseHandler, upgradeHandler} =props
  const {user} = useSelector((state) => state.pageData); 
  //console.log("isPW", isPW)
  let plan=''
  let items_=''
  let items2=[]
  //console.log("pageData", pageData)

  const [isCoupon, setCoupon] = useState({status:'', touch:false, value:0, unit:''})
  const [isDuration, setDuration] = useState('monthly')
  const [isData, setData]  = useState({label:'', name:'', duration:'', save:'', price:'', per_month:''})

  //console.log("isCoupon",isCoupon)

  const process=(item)=>{
    let data={
      name:item.name, 
      level:item.level, 
      meta:item.meta, 
      final_per_month:item.final_per_month,
      final_price:item.final_price,
      final_save:item.final_save,
      coupon:isCoupon
    }
    
    if(isDuration=="monthly"){
      data={...data, ...item.monthly, duration:1}
    }else{
      data={...data, ...item.yearly, duration:12}
    }
    //console.log("upgrade", data)
    return data
  }
  const chooseHandler2=(item)=>{
    let data=process(item)    
    chooseHandler({...data})
  }
  const upgradeHandler2=(item)=>{
    let data=process(item)    
    upgradeHandler(data)
  }
  
  let points=[
    {for:'influencer', label:"Promotional requests", name:'promotional_requests', type:''},
    {for:'influencer', label:"Platform Fee", name:'platform_fee_order', type:'%'},
    {for:'influencer', label:"Success Fee (on total amount)", name:'platform_fee_collab', type:'%'},
    {for:'business', label:"Partnership fee", name:'platform_fee_collab', type:'%'},
    {for:'business', label:"Sales commission", name:'platform_fee_sale', type:'%'},    
  ]

  const Item=(item)=>{  
    item={...item}  
    //const {label, name, level,  points}=item
    const {title, name, level, points2, meta}=item
    const {months, duration, price, per_month, save} = isDuration=='monthly' ? item.monthly : item.yearly
    
    let final_per_month = per_month
    let final_price = price
    let final_save = save
    let strike_c=''

    const process_coupon = () => {
      if(name!='free' && isCoupon.status=='active' && isCoupon.code!='' && isCoupon.touch==false){
        let multiply = isCoupon.value/100
        final_per_month = Math.round(per_month - (per_month * multiply) )
        final_price =  Math.round(price - (price * multiply))
        final_save = Math.round(price - final_price )
        strike_c='line-through opacity-75'
      }
    }
    let enable_coupon=false
    if(membership){
      if(membership.plan!=name && membership.level != 2) {
        enable_coupon=true
      }
    }else{
      enable_coupon=true
    }
    if(enable_coupon) process_coupon()

    item.final_per_month=final_per_month
    item.final_price=final_price
    item.final_save=final_save
    console.log("isCoupon", isCoupon)

    //console.log('plan item',item)
    const points_=meta_list.map((i, index)=>{
      if(i.for!=user.userType) return(<div  key={index}></div>)
      return(
        <li key={index} className={s.point}>{i.label} - {meta[i.name]}{i.type}</li>
      )
    })
    let action=(<Button className={s.button} type="action" width="full" clickHandler={()=>chooseHandler2(item)}>Choose</Button>)
    if(membership && membership.plan){
      if(membership.plan == name){          
        if(membership.status == 'expired'){   
          action=(<Button className={s.button} type="action" color="blue" width="full" clickHandler={()=>upgradeHandler2(item)}>Renew</Button>)
        }else {
          action=(<div className={s.subscribed}>Subscribed</div>)
        }
      }else if(membership.duration>duration){
        action=(<div className={s.downplan}></div>)
      }else if(level > membership.level){        
        action=(<Button className={s.button} type="action" width="full" clickHandler={()=>upgradeHandler2(item)}>Upgrade</Button>)
      } else{
        action=(<div></div>)
      }    
    }else{
      
    }
    if(price==0){
      action=(<div></div>)
    }
    return(
      <div className={s.item+' w-full md:w-4/12'}>
        <div className={s.item_inner}>
          <div className={s.top}>
            <h4>{title}</h4>
            <div className={s.membership}>Membership</div> 
            <div className={s.pricing_a+' flex flex-col items-start'}> 
              {(enable_coupon && name!='free' && isCoupon.code) && 
              <div className={s.coupon_a}>
                <h5>Rs. {final_per_month}</h5>
                <div className={'text-xs opacity-50'}>
                  {isDuration=='yearly' && <span className={s.billed_yearly}>Rs. {final_price} Billed Yearly - </span>}
                  {save>0 && <span> Save Rs. {final_save} </span>}
                </div>
              </div>}          
              <div className={s.price_a+' '+strike_c}>              
                <div className={s.rs}>Rs</div>
                <h3 className={s.price}>{per_month}</h3>
                <div className={s.per}>/ per mo</div>
              </div>
              {name!='free' && 
              <div className={s.save+' '+strike_c}>
                {isDuration=='yearly' && <span className={s.billed_yearly}>Rs. {price} Billed Yearly - </span>}
                {save>0 && <span> Save {save} Rs</span>}
              </div>}
            </div>
          </div>
          <ul className={s.points+ ' list-disc pl-6'}>
            {points_}
          </ul>          
          <div className={s.action}>{action}</div>
        </div>
      </div>
    )
  }
  
  if(items){
   items2=[]
    _.forEach(items, (value, key)=>{
       value.level=key.replace("level",'')
       //console.log("key", key)
       //console.log("value", value)
       //items_+=(<Item key={key} {...value}/>)
       items2.push(value)
    })
    items_=items2.map((i, index)=>{      
      return (<Item key={index} {...i}/>)
    })
  }
  const Switch=()=>{
    const switchHandler=(duration)=>{     
      setDuration((prev)=>{
        let next = duration
        //console.log("duration", next)
        return next
      })
    }
    return (
      <div className={s.switch+" flex justify-center"}>
        <div className={isDuration=="monthly" ? s.active : ''} onClick={()=>switchHandler("monthly")}>Monthly</div>
        <div className={isDuration=="yearly" ? s.active : ''} onClick={()=>switchHandler("yearly")}>Yearly</div>
      </div>
    )
  }
  return (
    <div className={s.main}>
      <div className={"flex items-center w-full"}>
        <div className={"w-5/12"}></div>
        <div className={"w-2/12 flex justify-center"}><Switch/></div>
        {membership.level != 2 && <div className={"w-5/12 flex justify-end"}><Coupon {...{outData:setCoupon}}/></div>}
      </div>
      <div className={s.items+' flex flex-wrap'}>      
        {items_}
      </div>
      <Checkout isPW={isPW}/>
    </div>  
  )
}
export default com
