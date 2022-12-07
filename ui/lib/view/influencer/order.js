import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import {get_address} from '../../get/order';
import productStats from '../../process/productStats';
import s from './order.module.scss';
import Moment from 'moment';

import {get_thumb_src} from '../../get/image';
import {get_image_src, get_product_title} from '../../get/product';
import {tag, order_status_tag} from '../_blocks/ui';


const com = ({item, setItem, handler, ...props}) => {
  const {id, created_at, items}=item
  //console.log('item', item) 

  const {user} = useSelector((state) => state.pageData);  

  const collab_button = (i) => {
    let collaborate = async() => {
      let data=await handler({action:"collab_invite", product_id:i.product.id})
      console.log("button", data)
      setItem(data)
    }
    let ret=(<div></div>)
    let ret_collab=(<div className={s.action+' mt-4'}><Button type="action2"  size="sm" clickHandler={()=>{collaborate()}}>Collaborate</Button></div>)
    let ret_invite=(<div className={s.action+' mt-4'}><div className={"flex"}>{tag({label:"Collaboration Invite Sent", color:'blue', size:"sm"})}</div></div>)
    let {status, collab, collab_request=false}=i
    if(status=="delivered"){
      if(collab_request!=false){
        ret = ret_invite
      }else if(collab && collab.status=="paid"){
        ret = ret_collab
      }else{
        ret = ret_collab
      }    
    }
    return ret
  }
 
  
  let data_
  if(id){
    let items_=items.map((i, index)=>{      
      let final_price_after_discount= i.final_price_after_discount  ? i.final_price_after_discount : i.price_after_discount
      let message = i.final_price_after_discount ? '' : 'New orders will have correct final price.'
      let {img, image}= i.product
      let src=get_thumb_src({...image})  
      let title_ = get_product_title(i)
      let status_=order_status_tag({status:i.status, size:'sm'})  
      return(
        <div key={index} className={s.item}>
          <Link href={"/app/product/"+i.product.id}><div className={s.img+' cursor-pointer'} style={{backgroundImage:'url("'+src+'")'}}></div></Link>
          <div className={s.title_a}>
            <div className={s.status+' inline-block'}>{status_}</div>
            <Link href={"/app/product/"+i.product.id}><h5 className={s.title+' cursor-pointer'}>{title_}</h5></Link>
            <div className={s.qty+' '+s.data}>Qty : {i.qty}</div> 
            {collab_button(i)}          
          </div>
          <div className={s.price_a}>
            <h4 className={s.price}>{final_price_after_discount} Rs</h4>
            <div className={s.price+' line-through'}>{i.price} Rs</div> 
            {message && <div className={"mt-2"}>{message}</div> }        
          </div>
        </div>
      )
    })
    item.tax=0
    data_=(
      <div>
        <Button to="/app/orders/" type="link" className={'mb-8 flex'}><img className={"mr-2"} src={"/images/Arrow_left_light.svg"}/> Back to orders</Button>
        <h3 className={'mb-8'}>Order ID: #{id}</h3>
        <div className={s.data}>Order date: <span>{Moment(created_at).format('MMMM Do, YYYY')}</span></div>
        <div className={s.items}>{items_}</div>
        
        <div className={s.section+' flex'}>
          <div className={'w-6/12'}>
            <h4 className={'mb-4'}>Payment</h4>
            <div>{item.payment[0].mode.label} </div>
          </div>
          <div className={'w-6/12'}>
            <h4 className={'mb-4'}>Delivery</h4>
            <div className={"opacity-50"}>Address</div>
            <div dangerouslySetInnerHTML={{ __html: get_address(item.details[0]) }}></div>
            
            <div className={"opacity-50 mt-6"}>Delivery Method</div>
            <div>{item.shipping_[0].method.label}</div>
          </div>
        </div>

        <div className={s.section+' flex mt-12'}>
          <div className={'w-6/12'}>
            <h4 className={'mb-4'}>Need help?</h4>
            <div className={s.icon_link}>Order issues <img src="/images/Arrow_top-right.svg"/></div>
            <div className={s.icon_link}>Returns <img src="/images/Arrow_top-right.svg"/></div>
          </div>
          <div className={'w-6/12'}>
            <h4 className={'mb-4'}>Order Summary</h4>
            <h5 className={s.info}><span className={s.label}>Subtotal:</span> <span className={s.value}>{item.subtotal} Rs</span></h5>
            <div className={s.total_details}>
              {/*<div className={s.info}><span className={s.label}>Delivery</span> <span className={s.value}> {item.shipping} Rs</span></div>
              <div className={s.info}><span className={s.label}>Platform Fee ({item.meta.platform_fee_order}%)</span> <span className={s.value}> {item.platform_fee} Rs</span></div>*/}
              {(item.tax=='' || item.tax==0) && <div className={s.info}><span className={s.label}></span> <span className={s.value+' text-sm'}>(Price Inclusive of Tax)</span></div>}
              {(item.tax!='' && item.tax!=0 )&& <div className={s.info}><span className={s.label}>Tax</span> <span className={s.value}> {item.tax} Rs</span></div>}
              {/*<div className={s.info}><span className={s.label}>Delivery</span> <span className={s.value}>12</span></div>
              <div className={s.info}><span className={s.label}>Tax</span> <span className={s.value}>12</span></div>*/}
            </div>            
            <h5 className={s.info}><span className={s.label}>Total:</span> <span>{item.total} Rs</span></h5>  
          </div>
        </div>

      </div>    
    )
  }
  
  props.navArgs.translucent=false 
  props.navArgs.noborder=false 

  return (
    <Layout {...props}  viewType="influencer_app" showShopNav={false}> 
      <div className={s.main}>  
        <div className={s.inner}> 
          {data_}    
        </div>
      </div> 
    </Layout>    
  )
}
export default com
