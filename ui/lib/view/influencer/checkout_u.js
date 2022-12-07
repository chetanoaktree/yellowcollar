import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Validator from 'simple-react-validator';

import Link from 'next/link'
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input2';
import Radio from '../../radio';
import Select from '../../select';
import Loading from '../../blocks/com/loading';

import Checkout from '../_blocks/checkout';
import {Valid} from '../_blocks/form_ui';
import {tag} from '../_blocks/ui';


import s from './checkout_u.module.scss';
import Moment from 'moment';

import {get_thumb_src} from '../../get/image';
import {get_image_src, get_product_title} from '../../get/product';

import _ from 'lodash'



const com = (props) => {
  //console.log("cart items", items)
  
  const {
    items, isData, isPW={}, isProcessing=false, 
    setData, step, handler, 
    country_options, shipping_options, payment_options, 
    billing_address_options, dataHandler
  }=props

  const dispatch = useDispatch();  
  const {app} = useSelector((state) => state.pageData);

  const router = useRouter()   



  let d=isData
  let v =new Valid("sd","fd", useState)
  v.message('mobile', d.mobile, 'required|phone')
  v.message('first_name', d.first_name, 'required')
  v.message('last_name', d.last_name, 'required')
  v.message('address', d.address, 'required')
  v.message('pincode', d.pincode, 'required')
  v.message('city', d.city, 'required')
  v.message('state', d.state, 'required')
  v.message('country', d.country, 'required')
  
  //console.log("valid get", v.is_touch("mobile"))



  //console.log("isData", isData) 

  let data={
    mobile:''
  }    

  const set_touch = (n) => {
    v.set_touch(n, true)
  }

  const dataHandler2=(to)=>{
    let valid=true
    if(to=="payment_gateway"){
      valid=v.is_all_valid()
    }
    //console.log("valid", valid) 
    if(valid) dataHandler(to, isData)    
  }

  const ship_to=()=>{
    const {first_name, last_name, address, city, state, pincode, country}=isData   
    return first_name+' '+last_name+', '+address+', ' +city+', '+state+' '+pincode+' '+country.label
  }

  //const router = useRouter()
  //const {step } = router.query  
  //const [isData, setData]= useState({...inData})
  //console.log("router.query", router.query)
  //let sub_total=0
  let shipping=-1
  //let  total=0
  if(step=="payment" && isData.shipping_method.value=='fedex') {
    shipping=30
  }else if(isData.shipping_method.value){
    shipping=0
  }
  const deleteHandler=(i)=>{
    handler({action:'delete_item', id:i.id})
  }
  let items_=items.map((i, index)=>{
    if(!i) return false
    //sub_total+=i.price
    //total+=i.price
    let title_ = get_product_title(i)
    let src= get_thumb_src({...i.image, src:i.img})
    i.business.company_name = i.business.company_name ? i.business.company_name : i.business.name
    return(
      
      <div key={index} className={s.item+' '}>
        <Link href={"/app/product/"+i.id}>
        <div className={s.img_a+' cursor-pointer'}>
          <div className={s.img} style={{backgroundImage:'url("'+src+'")'}}></div>
        </div>
        </Link>
        <div className={s.title_a}>
          <Link href={"/app/product/"+i.id}>           
            <div>
              <h6 className={'cursor-pointer'}>{title_}</h6>
              <div className={"text-xs opacity-75"}>by {i.business.company_name}</div>
            </div>
          </Link>
          <div className={s.bottom_a}>
             <div className={s.qty+' mr-2'}>Qty {i.qty}</div>             
          </div>
        </div>
        <div className={s.price_a}>
          <h5 className={s.price}>{i.final_price_after_discount} Rs</h5>
          <div className={s.price+' line-through'}>{i.price_after_discount} Rs</div>
        </div>
      </div>      
    )
  })  

  const error_ = (<div>{!v.is_all_valid() && <div className={"mb-4"}>{tag({label:"Please fill all details", color:"red", size:"sm"})}</div>}</div>)

  const Section = ({title, content}) => {
    return(
      <div className={s.section}>
        <h4 className={s.title}>{title}</h4>
        <div className={s.content}>{content}</div>
      </div>
    )
  }
 
  let values_=(
    <div className={s.values_area}>      
      <div className={s.value_area}>      
        <h6 className={s.value_title}>Sub Total : </h6>
        <h5 className={s.value}>{isData.sub_total} Rs</h5>
      </div>
      {/*<div className={s.value_area}>      
        <h6 className={s.value_title}>Shipping : </h6>
        <h5 className={s.value}>{isData.isShipping ? isData.shipping+' Rs' : 'Calculated at next step'} </h5>
      </div>*/}
      {/*<div className={s.value_area}>      
        <h6 className={s.value_title}>Tax : </h6>
        <h5 className={s.value}>{isData.tax} Rs</h5>
      </div>*/} 
      {/*isData.processed && <div className={s.value_area}>      
        <h6 className={s.value_title}>Platform Fee ({isData.meta.platform_fee_order}%) : </h6>
        <h5 className={s.value}>{isData.platform_fee} Rs</h5>
      </div>  */}    
    </div>
  )  
  let total_=(
    <div className={s.total_area}>      
      <h6 className={s.total_title}>Total : </h6>
      <h5 className={s.total}>{isData.total} Rs</h5>
    </div>
  )
  let nav=[
    {name:'cart', label:'Cart', to:'/app/cart/'},
    {name:'information', label:'Information', to:'/app/checkout/', query:{step:"information"}},
    {name:'shipping', label:'Shipping', to:'/app/checkout/', query:{step:"shipping"}},
    {name:'payment', label:'Payment', to:'/app/checkout/', query:{step:"payment"}}
  ]
  let nav_=nav.map(({label, to, name, query}, index)=>{    
    let cc_=name==step ? s.active : ''
    let er_= (label=="Information" && !v.is_all_valid()) ? (<div className={"absolute top-0 left-0 -mt-2 w-2 h-2 rounded-full"} style={{backgroundColor:'red'}}></div>) : ''
    return (
      <Link key={index} href={{pathname: to, query: query}}>
        <div className={s.nav_item+' '+cc_}>
          <div className={"relative flex items-center"}>{er_} {label} </div>
          <div className={s.icon}><img src="/images/Arrow_right_light.svg"/></div>
        </div>
      </Link>
    )
  })
  //const collabs_=123
  let setData2=(v, n)=>{
    setData((prev)=>{
      let next={...prev, [n]:v} 
      set_touch(n)        
      return next
    })  
  }   
  let selectHandler=(v, n)=>{
    //setData2(v, n)
    setData(prev => {
      let next={...prev, [n]:v}
      set_touch(n)      
      return next
    })
  } 
  let inputHandler=(v, e, n)=>{    
    //setData2(v, n)
    setData(prev => {
      let next={...prev, [n]:v}
      set_touch(n)      
      return next
    })
  }  
  let radioHandler=(v, n, e, o)=>{  
    console.log(v, n, e)  
    //setData2(v, n)
    setData(prev => {
      let next={...prev, [n]:o}
      set_touch(n)      
      return next
    })   
  } 

  // INPUTS
  let contact=(
    <div>
      <Input name="mobile" placeholder="Email or mobile phone number" value={d.mobile} changeHandler={inputHandler}/> 
      {v.isTouchError({name:'mobile', message:'It must be a valid mobile/phone number.'})}
      <div className="mt-4" >We will send you an order receipt via text message. Reply STOP to unsubscribe. Reply HELP for help. View our privacy policy &amp; terms of service</div>
    </div>
  )
  let shipping_address=(
    <div>
      <div>
        <Select name="country" options={country_options} placeholder="Country/region" value={isData.country} changeHandler={selectHandler}/>
      </div>
      <div className={"flex align-items -mx-1 mt-2 mb-2"}>
        <div className={"w-6/12 px-1"}>
          <Input name="first_name" placeholder="First name" value={isData.first_name} changeHandler={inputHandler}/>
          {v.isTouchError({name:'first_name'})}          
        </div>
        <div className={"w-6/12 px-1"}>
          <Input name="last_name" placeholder="Last name" value={isData.last_name} changeHandler={inputHandler}/>
          {v.isTouchError({name:'last_name'})}   
        </div>
      </div>
      <div className={""}>
        <Input name="address" placeholder="Address" value={isData.address} changeHandler={inputHandler}/>
        {v.isTouchError({name:'address'})}   
      </div>
      <div className={"flex align-items -mx-1 mt-2"}>
        <div className={"w-4/12 px-1"}>
          <Input name="city" placeholder="City" value={isData.city} changeHandler={inputHandler}/>
          {v.isTouchError({name:'city'})}   
        </div>
        <div className={"w-4/12 px-1"}>
          <Input name="state" placeholder="State" value={isData.state} changeHandler={inputHandler}/>
          {v.isTouchError({name:'state'})}   
        </div>
        <div className={"w-4/12 px-1"}>
          <Input name="pincode" placeholder="Pincode" value={isData.pincode} changeHandler={inputHandler}/>
          {v.isTouchError({name:'pincode'})}   
        </div>
      </div>
    </div>
  ) 

  
  let shipping_method=(
    <div>
      <div>
        <Radio name="shipping_method" options={shipping_options} placeholder="Shipping Method" value={isData.shipping_method} changeHandler={radioHandler}/>
      </div>      
    </div>
  )  
  let payment_method=(
    <div>
      <div>
        <Radio name="payment_method" options={payment_options} placeholder="Payment Method" value={isData.payment_method} changeHandler={radioHandler}/>
      </div>      
    </div>
  ) 
  let billing_address=(
    <div>
      <div>
        <Radio name="is_billing_address" options={billing_address_options} placeholder="Billing Address" value={isData.is_billing_address} changeHandler={radioHandler}/>
      </div>
      {isData.is_billing_address.value=='different' && <div className={"mt-6"}>
        <div>
          <Select name="country" options={country_options} placeholder="Country/region" value={isData.country} changeHandler={selectHandler}/>
        </div>
        <div className={"flex align-items -mx-1 mt-2 mb-2"}>
          <div className={"w-6/12 px-1"}>
            <Input name="b_first_name" placeholder="First name" value={isData.b_first_name} changeHandler={inputHandler}/>
          </div>
          <div className={"w-6/12 px-1"}>
            <Input name="b_last_name" placeholder="Last name" value={isData.b_last_name} changeHandler={inputHandler}/>
          </div>
        </div>
        <div className={""}>
          <Input name="b_address" placeholder="Address" value={isData.b_address} changeHandler={inputHandler}/>
        </div>
        <div className={"flex align-items -mx-1 mt-2"}>
          <div className={"w-4/12 px-1"}>
            <Input name="b_city" placeholder="City" value={isData.b_city} changeHandler={inputHandler}/>
          </div>
          <div className={"w-4/12 px-1"}>
            <Input name="b_state" placeholder="State" value={isData.b_state} changeHandler={inputHandler}/>
          </div>
          <div className={"w-4/12 px-1"}>
            <Input name="b_pincode" placeholder="Pincode" value={isData.b_pincode} changeHandler={inputHandler}/>
          </div>
        </div>
      </div>}
    </div>
  ) 

  
  // SECTIONS
  const info =(
    <div className={s.info_area}>      
      <div className={s.info}>
        <div className={s.label}>Contact</div>
        <div className={s.value}>{isData.mobile}</div>
        <div className={s.action}><Button type="text2" size="xs" color="action_blue" to="/app/checkout?step=information">Change</Button></div>
      </div>
      <div className={s.info}>
        <div className={s.label}>Ship to</div>
        <div className={s.value}>{ship_to()}</div>
        <div className={s.action}><Button type="text2" size="xs" color="action_blue"  to="/app/checkout?step=information">Change</Button></div>
      </div>
      {(step=='payment' && isData.shipping_method) && <div className={s.info}>
        <div className={s.label}>Shipping</div>
        <div className={s.value}>{isData.shipping_method.label}</div>
        <div className={s.action}><Button type="text2" size="xs" color="action_blue"  to="/app/checkout?step=shipping">Change</Button></div>
      </div>  }    
    </div>
  )

  const Information =(
    <div>      
      <div className={s.section}>
        <h4 className={s.title}>Contact information</h4>
        <div className={s.content}>{contact}</div>
      </div>
      <div className={s.section}>
        <h4 className={s.title}>Shipping address</h4>
        <div className={s.content}>{shipping_address}</div>
      </div>
      <div className={"mt-6 flex items-center"}>
        <div className={"flex-grow"}><Button type="text2" size="xs" color="action_blue"  to="/app/cart">Back to cart</Button></div>
        <div>
          {error_}
          <Button type="action" clickHandler={()=>dataHandler2("shipping")}>Continue to shipping</Button>
        </div>
      </div>
    </div>
  )
  const Shipping = (
    <div>
      {info}
      {/*<div className={s.section}>
        <h4 className={s.title}>Shipping method</h4>
        <div className={s.content}>{shipping_method}</div>
      </div>*/}
      <div className={"mt-6 flex items-center"}>
        <div className={"flex-grow"}><Button type="text2" size="xs" color="action_blue"  clickHandler={()=>dataHandler2("information")}>Back to information</Button></div>
        <div>
           {error_}
          <Button type="action" clickHandler={()=>dataHandler2("payment")}>Continue to payment</Button>
        </div>
      </div>
    </div>
  )
  const Payment = (
    <div>
      {info}
      {/*<div className={s.section}>
        <h4 className={s.title}>Payment</h4>
        <div className={s.content}>{payment_method}</div>
      </div>*/}
      <div className={s.section}>
        <h4 className={s.title}>Billing address</h4>
        <div className={s.content}>{billing_address}</div>
      </div>
      <div className={"mt-6 flex items-center"}>
        <div className={"flex-grow"}><Button type="text2" size="xs" color="action_blue"  clickHandler={()=>dataHandler2("shipping")}>Back to shipping</Button></div>
        <div>
           {error_}
          <Button isProcessing={isProcessing} type="action" clickHandler={()=>dataHandler2("payment_gateway")}>Complete order</Button>
        </div>
      </div>
    </div>
  )

  const PaymentGateway = (
    <div>
      <div className={s.section}>
        <h5 className={s.title}>Payment gateway closed. Please try again to complete this corder.</h5>        
      </div>
      <div className={"mt-6 flex items-center"}>        
        <Button isProcessing={isProcessing} type="action" clickHandler={()=>dataHandler2("payment")}>Back to Payment</Button>    
      </div>
    </div>
  )


  return (
    <Layout {...props} showShopNav={false}  viewType="influencer_app"> 
      <div className={s.main}>
        <div className={s.left}>
          <h2 className={s.section_title}>Check Out</h2> 
          <div className={s.nav}>{nav_}</div>         
          <div>
            {step=='information' && Information}
            {step=='shipping' && Shipping}
            {step=='payment' && Payment}
            {step=='payment_gateway' && PaymentGateway}
          </div> 
        </div>
        <div  className={s.right}>
          <div className={s.items}>{items_}</div>
          {values_}
          {total_}
        </div>
      </div> 
      <Checkout isPW={isPW}/>    
    </Layout>    
  )
}
export default com
