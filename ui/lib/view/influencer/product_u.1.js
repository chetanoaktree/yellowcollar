import React, { useState, useEffect } from 'react';
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import productStats from '../../process/productStats';
import Performance from '../../blocks/com/performance';
import {usePage} from '/ui/lib/hooks/usePage';
import ProductStatus from './blocks/product_status';
import RecentProducts from './blocks/recent_products';
import ProductItem from './blocks/product_item';
import ProductInfluencer from './blocks/product_influencer';
import s from './product_u.module.scss';
import Moment from 'moment';

import {get_image_src} from '../../get/product';
import {get_thumb_src, get_size_src, get_size_600_src} from '../../get/image';


const com = ({item, buyHandler, add2cartHandler, inviteHandler, performanceHandler, collaborateAgainHandler,  user, ...props}) => {
  //console.log("product2", item)
  let content = (<div>loading...</div>)
  const page=usePage()   
  const [isPerformance, setPerformance]= useState(false)

  const stats=productStats(item)

  const add2cartHandler2 = () => {
    console.log("add2cart")
    add2cartHandler(item);
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
        <div key ={index} className={"w-full px-8 mb-24 "+c2_}>
          <ProductInfluencer {...{product:item, influencer:i}}/>
        </div>
      )
    })
    return (
      <div className="px-8">
        <h4>Influencers promoting this product</h4>
        <div className={'flex flex-wrap -mx-8 mt-8'}>
          {out}
        </div>
      </div>
    )
  }

  const PopularProducts = () =>{    
    if(!item.popular.length) return (<div></div>)
    console.log("popular products", item.popular)     
    item.brand = item.business ? item.business.name  : item.brand
    let popular= item.popular ? item.popular : []
    let out = popular.map((i, index)=>{
      console.log("popular", i)     
      return (
        <div key ={index} className={"w-6/12 md:w-3/12 px-8 mb-24 "}>         
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
  
  const info = () =>{
    let i_
    item.brand = item.business ? item.business.name  : item.brand
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
  const RenderItem=({item, showViewMore, descClipped})=>{
    const [isViewMore, setViewMore]= useState(false)
    //let src=get_image_src(item)
    //src=src.replace("/products/",'')
    let src=get_size_600_src({...item.image, src:item.img})
    let thumb_src=get_thumb_src({...item.image, src:item.img})
    
    //console.log("SRC", src)
    let info_=info();
    return(
      <div className={s.main+' pb-48'}>
        <div className={s.header+' flex flex-wrap md:h-screen '}>
          <div className={s.left+" w-full md:w-6/12 p-10 md:p-0"}>
            <div className={s.bgimage+" h-full w-full overflow-hidden"} >
              <img src={src}  className={'w-full h-auto'}/>
            </div>
          </div>
          <div className={s.right+" w-full md:w-6/12 pt-8 md:pt-36"}>
              <div className={s.details+' pl-10 pr-10 md:pr-'} >
                <div className={"relative"}><ProductStatus {...item} {...{align:'left'}}/></div>
                <div className={s.title}>{item.title}</div>
                <div className={s.by}><span className="">by</span> {item.brand}</div>
                <div className={s.desc+' mt-12'}>
                  {(showViewMore && isViewMore==false) ? descClipped : item.description} 
                  {(showViewMore && isViewMore==false) ? '...' : ''}
                  {(showViewMore && isViewMore==false) ? <Button type="link" className="inline-block" size="sm" clickHandler={()=>setViewMore(true)}>View More</Button> : <span></span>}
                  {(showViewMore && isViewMore==true) ? <Button type="link"  className="inline-block" size="sm" clickHandler={()=>setViewMore(false)}>View Less</Button> : <span></span>}
                </div>
                <div className={s.info_a+''}>{info_}</div>
             </div>
          </div>
        </div> 
           
        <div className={s.content}>
          <ProductInfluencers/>
          <PopularProducts/>
          <RecentProducts/>
        </div>

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
          <div className={"flex items-center w-full md:w-auto"}> 
            <div className={s.price_a+" flex flex-grow items-center"}>           
              <div className={s.price+' mr-4'}>Rs. {item.final_price}</div>
              <div className={s.actual_price+' mr-8 line-through'}>Rs. {item.price}</div>
            </div>
            {/*<Button type="action2" color="white" clickHandler={add2cartHandler2} className="mr-4">Buy Now</Button>*/}
            <Button type="action2" clickHandler={add2cartHandler2} className="">Add to Cart</Button>
          </div>
        </div>
      </div>    
    )
  }
  

  if(item && item.id){
    let out    
    if(item.collab_request || item.isOfferSent  || item.isPreviouslyCollaborated || item.isPreviouslyPurchased){
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
