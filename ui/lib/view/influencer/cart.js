import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import Loading from '../../blocks/com/loading';


import s from './cart.module.scss';
import Moment from 'moment';

import {get_image_src, get_product_title} from '../../get/product';
import {get_thumb_src} from '../../get/image';



const com = ({items, sub_total, handler, ...props}) => {
  console.log("cart items", items)
  //const sub_total=0
  const deleteHandler=(i)=>{
    handler({action:'delete_item', id:i.id, item:i, items})
  } 
  
  let items_=items.map((i, index)=>{
    if(!i) return false
    let {business, stats, variation=''}=i
    let {available_units}=stats ? stats : {}
    business.company_name = business.company_name ? business.company_name : business.name
    //let src=get_image_src(i)
    //sub_total+=i.price
    console.log("variation", variation)
    let src= get_thumb_src({...i.image, src:i.img})
    let stock_= available_units > 0 ? available_units+' left in stock' : ' Out of stock'
    let stock_c_= available_units > 0 ? ' bg-green-500 ' : 'bg-red-500 '
    let title_ = get_product_title(i)
    
    return(
      <div key={index} className={s.item}>
        <div className={s.img_a}>
          <Link href={"/app/product/"+i.id}><div className={s.img+' cursor-pointer'} style={{backgroundImage:'url("'+src+'")'}}></div></Link>
        </div>
        <div className={s.title_a}>
          
          <div>
            <Link href={"/app/product/"+i.id}><h4 className={"cursor-pointer"}>{title_}</h4></Link>
            <div className={"text-sm opacity-75"}>by {business.company_name}</div>
            <div className={stock_c_+" bg-opacity-10 rounded-full inline-block text-xs mt-2 px-2"}>{stock_}</div>
          </div>            
          
          <div className={s.bottom_a}>
             <div className={s.sub+' mr-2'}>
                <Button clickHandler={()=>{
                  handler({action:'sub_item', id:i.id, item:i, items})
                }}>-</Button>
              </div>
             <div className={s.qty+' mr-2'}>{i.qty}</div>
             <div className={s.add+' mr-2'}>
                <Button clickHandler={()=>{
                  handler({action:'add_item', id:i.id, item:i, items})
                }}>+</Button>
             </div>
             <Button type="text2" color="red" size="sm" clickHandler={()=>{
               handler({action:'delete_item', id:i.id, item:i, items})
             }}>Delete</Button>
          </div>
        </div>
        <div className={s.price_a}>
          <h4 className={s.price}>{i.final_price_after_discount} Rs</h4>
          <div className={s.price+' line-through'}>{i.price_after_discount} Rs</div>
        </div>
      </div>
    )
  })
  let heading=(
    <div className={s.heading}>
      <div className={s.img_a}></div>
      <div className={s.title_a}><h5>Product</h5> </div>
      <div className={s.price_a}><h5>Price</h5></div>
    </div>
  )
  let total=(
    <div className={s.sub_total_area}>
      <div className={s.space}></div>
      <h3 className={s.sub_total_title}>Sub Total : </h3>
      <h3 className={s.sub_total}>{sub_total} Rs</h3>
    </div>
  )
  let checkout=(
    <div className={s.checkout_area}>
      <div className={s.space}></div>
      <div className={s.action_a}>
        <div>Tax &amp; Shipping calculated at checkout.</div>
        <div className={"mt-6"}><Button type="action" to="/app/checkout?step=information">Check out</Button></div> 
      </div>
    </div>
  )

  //const collabs_=123
  return (
    <Layout {...props} showShopNav={false} viewType="influencer_app"> 
      <div className={s.main}>
        <h2 className={s.section_title}>Shopping Cart</h2> 
        <div>{heading}</div>   
        <div className={s.items}>{items_}</div>
        {total}
        {checkout}
      </div>     
    </Layout>    
  )
}
export default com
