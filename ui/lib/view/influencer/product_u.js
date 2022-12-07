import React, { useState, useEffect } from 'react';
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import Select from '../../select';
import productStats from '../../process/productStats';
import Performance from '../../blocks/com/performance';
import {usePage} from '/ui/lib/hooks/usePage';
import ProductStatus from './blocks/product_status';
import RecentProducts from './blocks/recent_products';
import ProductItem from './blocks/product_item';
import ProductInfluencer from './blocks/product_influencer';
import s from './product_u.module.scss';
import Moment from 'moment';

import _ from 'lodash'

import {get_input, get_select} from '../_blocks/input_ui';

import {get_image_src} from '../../get/product';
import {get_thumb_src, get_size_src, get_size_600_src, get_size_p600_src} from '../../get/image';


const com = ({item, handler, buyHandler, add2cartHandler, inviteHandler, performanceHandler, collaborateAgainHandler,  user, ...props}) => {
  //console.log("product2", item)
  let {variations}=item ? item : {}  
   
  
  const check_in_variations = (items, attr) => {
    console.log("isVariations", items)  
    console.log("attr", attr)  
   
    let variation = _.find(items, attr)
    console.log("variation", variation)  
    return variation
  }
  

  let content = (<div>loading...</div>)
  const page=usePage()   

  const [isPerformance, setPerformance]= useState(false)  
  let [isVariations, setVariations]= useState([])
  let [isVariationsF, setVariationsF]= useState([])
  let [isAttributes, setAttributes]= useState([])
  let [isItem, setItem]= useState({})
  let [isAttrD, setAttrD]= useState({})
  let [isAttrF, setAttrF]= useState({})
  let [isAttrA, setAttrA]= useState({})
  let [isAttr, setAttr]= useState({})
  let [isVariation, setVariation]= useState({})

  

  let show_price = (isVariations.length == 0 || (isVariation && isVariation.id)) ? true : false
  const process = (item) => {
    let default_selected = false
    let attributes2={}
    let default_attr = {}

    let variations2=_.map(variations, (v, k)=>{
      let ret={id:v.id, v:v}      
      _.forEach(v.attributes, (va, vk)=>{
        if(!attributes2[va.attribute]) {
          attributes2[va.attribute]=[]
        }
        attributes2[va.attribute].push(va.value)
        ret[va.attribute]=va.value
        if(default_selected==false) default_attr[va.attribute]=va.value
      })
      default_selected=true
      return ret
    })
    setItem(item)
    setAttrD(default_attr)  
    setAttr(default_attr)  
    setAttrF(variations2)  
    setAttrA(variations2)  
    setVariations(variations2) 
    setVariationsF(variations2) 
    setAttributes(attributes2)
    let variation=check_in_variations(variations2, default_attr)
    setVariation(variation)     
    
    console.log("variations", variations)  
    console.log("variations2", variations2)
    console.log("attributes2", attributes2)
    console.log("default_attr", default_attr)
  }
  useEffect(()=>{
    if(item && item.id) process(item)
  }, [item])
   
  console.log("isItem", isItem)
  console.log("isAttr", isAttr)
  console.log("isAttrF", isAttrF)
  console.log("isAttrA", isAttrA)
  console.log("isVariations", isVariations)
  console.log("isVariationsF", isVariationsF)
  console.log("isAttributes", isAttributes)
  console.log("isVariation", isVariation)
  //console.log("isAttr", isAttr)

  let {price, final_price}=isItem ? isItem : {}  

  const stats=productStats(item)
  const processItem = async (vItem) => {    
    if(isVariations.length) { 
      let itemP={...isItem}
      let vari={...vItem}       
      let { id='',  parent_id='', price='', discount='', stats='', sku='', parent_sku=''} = vari.v ? vari.v : {}
      let { available_units='' } = stats ? stats : {}
      if(id && id!='') itemP.id=id
      if(sku && sku!='') itemP.sku=sku
      if(parent_sku && parent_sku!='') itemP.parent_sku=parent_sku
      if(parent_id && parent_id!='') itemP.parent_id=parent_id
      if(price && price!='') itemP.price=price
      if(discount && discount!='') itemP.discount=discount
      if(available_units && available_units!='') itemP.stats = {...itemP.stats, available_units}
      delete vari.id  
      delete vari.v     
      itemP.variation={...vari}
      console.log('itemP', itemP)
      let d=await handler({action:'process', inData:itemP})
      console.log('itemP d', d)
      setItem(d)
    }
  }
  const add2cartHandler2 = () => {
    console.log("add2cart")
    console.log('isItem-->>', isItem)
    let itemP={...isItem}
    if(isVariations.length) { 
      delete itemP.variations
      delete itemP.popular
      delete itemP.extra      
      console.log('itemP', itemP)
    }
    add2cartHandler(itemP);
  }
  const buyHandler2 = () => {
    console.log("buy")
    buyHandler({product_id:item.id, business_id:item.business_id, influencer_id:user.id, total:item.price});
  }
  const inviteHandler2 = async () => {
    console.log("invite")
    await inviteHandler({action:'invite', business_id:item.business_id, product_id:item.id, influencer_id:user.id});
  }
  const collaborateAgainHandler2 = async () => {
    console.log("collaborateAgain")
    await collaborateAgainHandler({action:'invite', business_id:item.business_id, product_id:item.id, influencer_id:user.id});
  }
  const performanceHandler2 = async () => {
    console.log("performance")
    setPerformance(true)
    //await performanceHandler({action:'performance', collab_id:item.previouslyCollabId, business_id:item.business_id, product_id:item.id, influencer_id:user.id});
  }

  
  const info = () =>{
    let i_
    item.brand=''
    if(item.business){
      item.brand = item.business.company_name ? item.business.company_name  : item.business.name
    }
     
    let title; let desc; let action; let action2;

    if(item.collab_request || item.isOfferSent){
      i_+=' md:-ml-24 '
      title=(<div>Collaboration message to {item.brand} <span>sent.</span></div>)
      desc=(<div>You are all set, sit back and relax as we collect a response from {item.brand}.</div>)
     
    }else if(item.isPreviouslyCollaborated){      
      title=(<div>Previously collaborated with {item.brand} on <span>{Moment(item.previouslyCollaboratedOn).format('DD.MM.YYYY')}</span></div>)
      desc=(<div>You are all set, sit back and relax as we collect a response from {item.brand}.</div>)
      action=(
        <div className={"flex items-center"}>
          <div className={s.i_btn1+' mr-2'}><Button type="action2" color="black" clickHandler={performanceHandler2}>Check Performance</Button></div>
          {item.isCollaborateAgain == true && <div className={s.i_btn2}><Button type="action2" clickHandler={collaborateAgainHandler2}>Collaborate Again?</Button></div>}
        </div>
      )
    }else if(item.isPreviouslyPurchasedNotDelivered){      
      title=(<div>You can send invite for collaboration once you get your purchased product delievered.</div>)
      desc=(<div></div>)
      action=(<div></div>)
    }else if(item.isPreviouslyPurchased){
      i_+=' md:-ml-24 '+s.isPreviouslyPurchased
      title=(<div>Collaborate with {item.brand}?</div>)
      desc=(<div>Good for Influencers who have built a knowledge and expertise on a this product category. </div>)
      action2=(
        <>
          <div className={s.i_btn}><Button type="action2" outline={true} color="white" clickHandler={inviteHandler2}>Send Invite</Button></div>
        </>
      )
    }else{
      i_+=' md:-ml-4 bg-gradient-to-r from-light-yellow to-light-red  '
      title=(<div>Do you want to collaborate with {item.brand}.?  </div>)
      desc=(<div>Then, first you need to buy this product. <br/>Next send collaboration request to {item.brand}.</div>)     
    }
    if(title){
      return(
        <div className={s.info+' flex mt-12 px-8 py-8 '+i_}>
          <div className={"flex flex-col flex-grow pr-8"}>
            <div className={s.i_title+' text-2xl'}>{title}</div>
            {desc && <div className={s.i_subTitle}>{desc}</div>} 
            {action && <div className={s.i_action}>{action}</div>}           
          </div> 
          {action2 && <div>
            <div className={s.i_action2}>{action2}</div>  
          </div>}    
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
  }
  
  const check_in_attributes = (items, attr) => {   
    let filtered = _.filter(items, attr)
   // console.log("attributes filtered", filtered)  
    return filtered
  }
  const check_option = ({attr, name}) => {
    setAttr(prev=>{
      let next = {...prev, [attr]:name}
      let variation=check_in_variations(isVariations, next)
      let attrF=check_in_attributes(isVariations, next)
      let attrA=check_in_attributes(isVariations, {[attr]:name})
      setVariation(variation)
      setAttrF(attrF)
      setAttrA(attrA)
      processItem(variation)
      return next
    })  
  }
  const Options=({attr, heading, options})=>{    
    let options_=options.map((i, index)=>{
      let {name, label, active}=i
      let state=''
      let disable=''
      let optionF=_.find(isAttrF, {[attr]:name})
      let optionA=_.find(isAttrA, {[attr]:name})
      //console.log("optionA", attr, name, optionA, isAttrF)
      if(isAttr[attr]){
        if(name==isAttr[attr]) {
          state='active'
          //console.log("isAttr[attr]"+name, isAttr[attr])
        }
      }else if(active==true) {
        state='active'
      }
      if(!optionA && !optionF){
        disable='disable'
      }
      return (
        <div key={index} className={s.option+" mx-1 "+s[state]+' '+s[disable]} onClick={
          ()=>{            
            check_option({attr, name})
          }
        }>
          {label}
        </div>
      )
    })
    return (
      <div className={s.options+""}>
        <div className={"opacity-50 mb-2"}>{heading}</div>
        <div className={s.options+" flex items-center -mx-1"}>{options_}</div>
      </div>
    )
  }
  const attributes = () => {
    const changeAttr = (n, v)  => {
      setAttr(prev=>{
        let next={...prev, [n]:v}
        return next
      })
    }
    let opts=[
      {label:'S', name:'S', active:true},
      {label:'M', name:'M', active:false},
      {label:'L', name:'L', active:false}
    ]
    let copts=[
      {label:'Red', name:'Red', active:true},
      {label:'Green', name:'Green', active:false},
      {label:'Blue', name:'Blue', active:false}
    ]
    let attrs_=_.map(isAttributes, (i, key)=>{
      let op=_.map(i, (vo, ko)=>{
        return {label:vo, name:vo, active:isAttrD[key] == vo ? true : false}
      })
      return <div key={key} className={"mb-4"}>{Options({attr:key, heading:key, type:'string', options:op})}</div>
    })
    return (
      <div className={"mt-8"} style={{}}>
        {/*<div className={"mb-4"}>{Options({attr:'Size', heading:'Size', type:'string', options:opts})}</div>
        <div className={"mb-4"}>{Options({attr:'Color', heading:'Color', type:'color',  options:copts})}</div>*/}
        {attrs_}
      </div>
    )
  }

  let attributes_
  if(variations) attributes_=attributes()

  const ProductInfluencers = () =>{
    if(!item.extra) return (<div></div>)
    let influencers= item.extra.influencers ? item.extra.influencers : []
    if(!influencers.length) return false
    let out = influencers.map((i, index)=>{
      //console.log("influencer", i)
      let c2_
      if(i.size && i.size.value=="col2") {
        c2_='md:w-8/12'
      } else {
        c2_='md:w-4/12'
      }
      return (
        <div key ={index} className={"w-full sm:w-6/12 px-4 md:px-8 mb-24 "+c2_}>
          <ProductInfluencer {...{product:item, influencer:i}}/>
        </div>
      )
    })
    return (
      <div className="px-8">
        <h4>Influencers promoting this product</h4>
        <div className={'flex flex-wrap -mx-4 md:-mx-8 mt-2 md:mt-8'}>
          {out}
        </div>
      </div>
    )
  }

  const PopularProducts = () =>{    
    if(!item.popular.length) return (<div></div>)
    //console.log("popular products", item.popular)     
    item.brand = item.business ? item.business.name  : item.brand
    let popular= item.popular ? item.popular : []
    let out = popular.map((i, index)=>{
      //console.log("popular", i)     
      return (
        <div key ={index} className={"w-6/12 md:w-3/12 px-4 md:px-8 mb-24 "}>         
          <ProductItem product={i.product}/>
        </div>
      )
    })
    
    return (
      <div className="px-8">
        <h4>Popular Products from {item.brand}</h4>
        <div className={'flex flex-wrap -mx-8 mt-8'}>
          {out}
        </div>
      </div>
    )
  }
  

  const RenderItem=({item, showViewMore, descClipped})=>{
    const [isViewMore, setViewMore]= useState(false)
    //let src=get_image_src(item)
    //src=src.replace("/products/",'')
    let src=get_size_p600_src({...item.image, src:item.img})
    let thumb_src=get_thumb_src({...item.image, src:item.img})
    
    //console.log("SRC", src)
    let info_=info();
    return(
      <div className={s.main+' pb-48'}>
        <div className={s.header+' flex flex-wrap '}>
          <div className={s.left+" w-full flex justify-center xl:justify-end xl:items-start md:w-6/12 p-8 md:p-4 lg:p-0 lg:pt-12"}>
            <div className={s.bgimage+" h-full w-full overflow-hidden"} >
              <img src={src}  className={'h-auto'}/>
            </div>
          </div>
          <div className={s.right+" w-full md:w-6/12 pt-12 md:pt-36 "}>
              <div className={s.details+' px-4 lg:px-10 '} >
                <div className={"relative"}><ProductStatus {...item} {...{align:'left'}}/></div>
                <div className={s.title+' text-3xl lg:text-4xl xl:text-5xl'}>{item.title}</div>
                <div className={s.by}><span className="">by</span> {item.brand}</div>
                {attributes_}
                {show_price==true && <div>
                  <div className={s.price_a+" flex flex-grow items-center mt-8"}>           
                    <div className={s.price+' text-2xl lg:text-4xl mr-4 '}>Rs. {final_price}</div>
                    <div className={s.actual_price+' mr-8 line-through'}>Rs. {price}</div>
                  </div>
                  <Button type="action" clickHandler={add2cartHandler2} className="mt-8">Add to Cart</Button>    
                </div>}
                {show_price==false && <div className={"mt-8"}>
                  Select all above available options to display price
                </div>}
                <div className={s.info_a+''}>{info_}</div>
             </div>
          </div>
        </div> 
        {/*<div className={s.desc_a+' my-24 mx-auto'}>
          <div className={s.desc+' mt-12 text-sm opacity-90'}>
            {(showViewMore && isViewMore==false) ? descClipped : item.description} 
            {(showViewMore && isViewMore==false) ? '...' : ''}
            {(showViewMore && isViewMore==false) ? <Button type="link" className="inline-block" size="sm" clickHandler={()=>setViewMore(true)}>View More</Button> : <span></span>}
            {(showViewMore && isViewMore==true) ? <Button type="link"  className="inline-block" size="sm" clickHandler={()=>setViewMore(false)}>View Less</Button> : <span></span>}
          </div> 
        </div> */} 
        <div className={s.desc_a+' my-24 mx-auto'}>
          <h4>Product Descritpion</h4>
          <div className={s.desc+' mt-12 text-sm opacity-90'}>
            {item.description}            
          </div> 
        </div> 
        <div className={s.content}>
          <ProductInfluencers/>
          <PopularProducts/>
          <RecentProducts/>
        </div>

        <div className={'scroll_100_display'}>
          <div className={s.actionbar+' fixed px-6 py-3 md:px-12 md:py-6  flex mx-2 mb-2 md:mx-12 md:mb-12'}>
            <div className={"flex-grow hidden md:block"}>
              <div className={s.product+' mr-8 flex items-center'}>
                <div className={s.bgimage+" bg-cover bg-center mr-4"} style={{backgroundImage:'url("'+thumb_src+'")'}}></div>
                <div className={s.title_a+ ' '}>
                  <div className={s.title+' font-abel text-xl md:text-2xl'}>{item.title}</div>
                  <div className={s.by}><span className="">by</span> {item.brand}</div>
                </div>
              </div>
            </div>
            {show_price==true && <div className={"flex items-center w-full md:w-auto"}> 
              <div className={s.price_a+" flex flex-grow items-center"}>           
                <div className={s.price+' mr-4'}>Rs. {final_price}</div>
                <div className={s.actual_price+' mr-8 line-through'}>Rs. {price}</div>
              </div>
              {/*}<Button type="action2" color="white" clickHandler={add2cartHandler2} className="mr-4">Buy Now</Button>*/}
              <Button type="action2" clickHandler={add2cartHandler2} className="">Add to Cart</Button>
            </div>}
          </div>
        </div>
      </div>    
    )
  }
  

  if(item && item.id){
    let out    
    if(item.collab_request || item.isOfferSent || item.isPreviouslyPurchasedNotDelivered  || item.isPreviouslyCollaborated || item.isPreviouslyPurchased){
      let clipped=item.description.substr(0, 100);    
      out={
        descClipped:clipped,      
        showViewMore: item.description.length > 110
      }
    }   
    content=<RenderItem {...out} item={item}/>
  }
  
  return (
    <Layout {...props} showShopNav={false}>       
      {content}   
      <Performance isOpen={isPerformance} setOpen={setPerformance}></Performance>               
    </Layout>  
  )
  
}
export default com
