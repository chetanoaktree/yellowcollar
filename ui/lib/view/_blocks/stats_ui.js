import ReactSlider from 'react-input-slider';
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { Scrollbars } from 'react-custom-scrollbars';
import User from '../../blocks/com/user';
import Button from '../../button';
import Link from 'next/link'


import {get_thumb_src, collab_status_tag, order_status_tag, Thumb, Refresh, Loading, ApproveReject} from './ui';

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import s from './stats_ui.module.scss';

const CONSTANTS={
  test:1,  
}
const Loading2=(i)=>{
  let {value, isProcessing} = i
  let value_ = isProcessing == true  ? (<span><img src={"/images/loading.svg"}/></span>) : value
  return value_
}
const Widget=(i)=>{
  let {label, value, sub_label, sub_value, isProcessing} = i
  let sub_label_=sub_label ? (<span className={"text-sm ml-4"}>{sub_label}</span>) : ''
  let sub_value_=sub_value ? (<span className={"font-normal text-sm ml-4 mb-2"}>{sub_value}</span>) : ''
  let value_ = <Loading {...{value:(<span>{value}{sub_value_}</span>), isProcessing}}/>
  return(
    <div className={s.widget+' '}>
      <div className={s._inner+'  '}>
        <div className={s._l+' pl-4 text-lg  font-semibold  mb-2 '}>{label} {sub_label_}</div> 
        <div className={s._v+' px-4 py-2 text-3xl font-bold'}>{value_}</div>    
      </div> 
    </div>
  )
}
const Widgets = ({title, sub_title, isProcessing, refreshHandler, items}) => {
  let items_=items.map((i, index)=>{
    return <Widget key={index} {...{isProcessing,...i}}/>
  })
  let loading_ = <Loading {...{value:'', isProcessing}}/>
  return(
    <div className={s.widgets+" w-full flex flex-col"}>
      <div className={"flex items-end mb-6 "}>
        <div className={""}>
          <div className={"text-lg mb-1 font-light"}>{sub_title}</div>
          <div className={"text-2xl font-semibold"}>{title}</div>
        </div> 
        <div className={"ml-6 flex-grow"}>{loading_}</div>
        <div className={""}>
          <Refresh handler={refreshHandler}/>
        </div>        
      </div>
      <div className={s._items+" px-4 py-4 w-full flex items-center"}>
        {items_}
      </div>
    </div>
  )
}

const RecentItem = (i) => {
  let {title, sub_title, status=false, info='', image, image2, type, style, url='', isProcessing} = i
  let image_=(<div className={"w-20 h-20"}><Thumb {...image}/></div>)
  let status_
  style = {width:'200px', ...style}
  if(type=='collab'){    
    status_=collab_status_tag({status, size:'sm'})
    image_=(
      <div className="flex">
        <div className={"w-16 h-16 mr-4"}><Thumb {...image}/></div>
        <div className={"w-16 h-16"}><Thumb {...image2}/></div>
      </div>
    )   
  }else if(type=='order'){
    status_=order_status_tag({status, size:'sm'})    
  }
  let content_=(
    <div className={s.recentItem+'   '}>
      <div className={s._inner+' flex flex-col text-center items-center px-4'} style={style}>
        <div className={s._l+' text-md font-semibold mb-1'}>{title}</div> 
        <div className={s._v+' text-xs font-light mb-4'}>{sub_title}</div> 
        {status!=false && <div className={s._v+' text-xs font-light mb-4'}>{status_}</div>}
        <ApproveReject {...i}/>
        <div className={s._img+' text-xs font-light p-2'}>{image_}</div> 
        {info!='' && <div className={'text-xs font-light p-2'}>{info}</div>} 
      </div> 
    </div>
  )
  if(url!='') content_=(<Link href={url}><div className={s._link}>{content_}</div></Link>)
  return content_
}

const RecentItems = ({title, sub_title,  isProcessing, items, scroller_style, url}) => {
  console.log("items", items)
  let items_=(<div className={"text-2xl opacity-25 px-6"}>No data available</div>)
  if(items.length) {
    items_=items.map((i, index)=>{
      return <SwiperSlide key={index} className={"pb-6"}><RecentItem {...{isProcessing,...i}}/></SwiperSlide>
    })
  }
  scroller_style={height:'300px', ...scroller_style}
  let slider_=(<div className={s._items+" relative p-4"}>
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className={"mySwiper"}
    >
        {items_}          
    </Swiper>
  </div>     
  )
  let loading_ = <Loading {...{value:'', isProcessing}}/>
  return(
    <div className={s.recentItems+" w-full flex flex-col"}>
      <div className={"flex items-end mb-6 "}>
        <div className={"pl-4"}>
          <div className={"text-lg mb-1 font-light"}>{sub_title}</div>
          <div className={"text-2xl font-semibold"}>{title}</div>
        </div> 
        <div className={"ml-6 flex-grow"}>{loading_}</div>
        <div className={""}>
          <Button type={"link"} size="xs" to={url}>view all</Button>
        </div>
      </div>
      {/*<div className={s._items+" w-full flex"}>     
        <div className={' flex-grow relative px-4 py-2'} style={scroller_style}>
          <Scrollbars style={{height:'100%', width:'100%'}}>
              <div className="flex px-2 py-4">{items_}</div>
          </Scrollbars>
        </div>
      </div>*/}  
      {slider_}    
    </div>
  )
}

export {
  Refresh,
  Widgets,
  RecentItems, 
  collab_status_tag, 
}
