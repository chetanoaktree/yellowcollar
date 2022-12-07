import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '../influencer/layout'
import Title from '../../title'
import Button from '../../button'
import User from '../../blocks/com/user';
import Dropdown from '../../blocks/com/dropdown';
import getStatus from '../../get/status'
import TabSwitch from '../../tab_switch'; 
import Pagination from '../../blocks/com/pagination';
import PopupSaleStatus from './popup/sale_status';
import {getDiscountedPrice} from '../../get/product'
import SalesSearch from './search/sales_search'


import {CONSTANTS, levels, getID, dot, tag, percentage_tag, 
  get_track, status_tag, order_status_options, payment_status_options,
  order_main_status_tag, get_order_status, order_address
} from '../_blocks/sale';
//import Widgets from '../../blocks/com/widgets';
//import Collabs from '../../blocks/business/collabs';
import s from './sales_u.module.scss'
import Moment from 'moment';
import { useReactToPrint } from 'react-to-print'
import PrintSale from '../../print/sale'
import {get_product_title} from '../../get/product'




const com = ({items, widgets, handler, ...props}) => { 
  
  //console.log("randomstring", randomstring(7))
  //console.log("sales2", items)
  let items_
  
  const [isData, setData]= useState([]) 
  const [isFilter, setFilter] = useState({order_status:{value:''}, start:1, end:3})
  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:3})
  const [isPrint, setPrint] = useState(false ) 

 
  const [isPopupStatus, setPopupStatus]= useState(false) 
  const [isPopupSData, setPopupSData]= useState({changeToStatus:'', item:{}}) 
  
  


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
  });
  const doo = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(()=>{
    if(isPrint)  doo()    
  }, [isPrint])


  useEffect(async () => { 
     let data = await handler({action:'get', ...isFilter}) 
     setData((prev)=>data)  
     return(()=>{
       setType(false);
     })   
  }, []); 

  useEffect(async () => { 
     let data = await handler({action:'get_total', ...isFilter}) 
     setPagiConfig(prev=>({...prev, total:data}))       
  }, []); 

  const Item=(i)=>{
    
    const {influencer, business, product, order_item}=i
    i.order_item.status = i.order_item.status ? i.order_item.status : 'awaiting_processing'

    //let performance_percent=performance(i)
    //let gradient_=gradient({status:i.status})  
    let created_at=Moment(i.order.created_at).format('MMMM Do YYYY')

    //let completed_at
    
   // if(i.status=='paid') completed_at=getEventDate({type:'paid', i})
   // let {total_amount, to_platform, to_business} = getPaymentDetails({i})
  
    //let total_amount='Rs. 1600'
    //let to_platform='Rs. 24'
    //let to_business='Rs. 1400'
    const title_=get_product_title(order_item)
    const status_=order_main_status_tag(i.order_item)
    const id_=(
      <div className={'flex md:flex-col'}>
          <div className={' mb-2'}>{status_} </div> 
          <div className={'mb-2'}>{getID(i.order)} </div>
          <div className={'w-14 mb-2 text-center opacity-25'}>Item_id : {i.order_item.id}</div>
      </div>
    )

    const profiles_=(
      <div className={s.profile}>        
        <div className={s.name_a+' flex  items-center'}>
          <User {...influencer} size="sm" className={"mr-4"}/>
          <div className={s.name}>{influencer.name}</div>
        </div> 
        {/*<div className={s.sep+' my-4'}></div>  */}
      </div>
    )

    const shipping_=(
      <div className={s.shipping}>  
        <div className={"opacity-50 mb-2"}>Shipping</div> 
        <div className={s.data}>          
          <div className={s.value}>
            {order_address(i.order)}      
          </div>
        </div> 
        <div className={"opacity-50 mb-2"}>Product</div>     
        <div className={s.data}>          
          <div className={s.value}>{title_}</div>
        </div>      
      </div>
    )
    const activity_items=i.activity.map((i, index)=>{
      let {label} = get_order_status(i)
      let created_at_=Moment(i.created_at).format('MMM Do YYYY, hh:mm A')
      return(
        <div key={index} className={s.da}>          
          <div className={s.label}>{label}</div>
          <div className={s.value}>{created_at_}</div>
        </div> 
      )
    })
    const activity_=(
      <div className={s.shipping}>  
        <div className={"opacity-50 mb-2"}>Activity</div>
        <div className={s.data_activity}> 
          {activity_items}
        </div> 
      </div>
    )

    const trigger = () => {
      let {label}=get_order_status(i.order_item)
      let cont_=(
      <div className={"flex items-center cursor-pointer"}>
        <div className={"flex-grow"}>{label}</div>
        <div><img src={"/images/Expand_down_light.svg"}/></div>
      </div>
      )     
      return(
        <Button className={""} type="hit">
           {status_tag({content:cont_, status:i.order_item.status})}
        </Button>
      )
    }
    const dropdown = () => {
      const handleStatus = (status) => {
        setPopupStatus(true)
        setPopupSData({item:i, changeToStatus:status})
        console.log("status", status)
      }
      console.log("i.order_item.status", i.order_item.status)
      const button2 = (status) => {
        if(levels[status]<=levels[i.order_item.status]) return (<div className="mb-2 opacity-25">{status_tag({status:status})}</div>)
        return (<Button type="hit" className={"mb-2"} clickHandler={()=>handleStatus(status)}>{status_tag({status:status})}</Button>)
      }
      return(
        <div className={"flex flex-col "}>          
          {button2("processing")}
          {button2("cancelled")}
          {button2("shipped")}
          {button2("delivered")}
        </div>
      )
    }
  
    const details_=(
      <div className={s.details}>        
        <Dropdown className={"mb-4"} trigger={trigger()} content={dropdown()}/> 
        <div>
          <div className={s.data}>
            <div className={s.label}>Total Amount : </div>
            <div className={s.value+' '+s.total_amount}> Rs. {i.order_item.final_price_after_discount}</div>
          </div> 
          {/*<div className={s.data}>
            <div className={s.label}>SubTotal : </div>
            <div className={s.value}> Rs. {i.order_item.subtotal}</div>
          </div>*/ }
          <div className={s.data}>
            <div className={s.label}>Amount to be received : </div>
            <div className={s.value}> Rs. {i.order_item.received_amount}</div>
          </div> 
          {/*<div className={s.data}>
            <div className={s.label}>Tax : </div>
            <div className={s.value}> Rs. {i.order.tax}</div>
          </div>*/ } 
        </div>
        {/*
        <div className={s.sep+' my-4'}></div> 
        <div className={s.data}>
          <div className={s.label}>Created : </div>
          <div className={s.value}> {created_at}</div>
        </div> 
        <div className={s.data}>
          <div className={s.label}>Performance : </div>
          <div className={s.value}> {percentage_tag(performance_percent)}</div>
        </div> */}        
      </div>
    )
    const empty_=(
      <div className={s.empty}>
        <div className={s.product_a}>{i.match_test}</div> 
      </div>
    )
    const action_=(
      <div className={s.action}>
        <Button type="action2" color="white" clickHandler={()=> {setPrint({...i.order, order_item:i.order_item, influencer:i.influencer, product:i.product})}}>Print</Button>
      </div>
    )
    
    const track_=get_track(i.order_item)
   
    return(
      <div className={s.item+' flex flex-col px-4 py-4 mb-4'}>
        <div className={s.top+ ' flex flex-wrap mb-2'}>
          <div className={s.id_a+' flex flex-col mr-2 mb-2 md:mb-0'}>
            {id_}          
          </div>
          <div className={s.profiles_a+' w-full md:w-auto mr-2 mb-2 md:mb-0'}>
            {profiles_}   
          </div>
          <div className={s.shipping_a+' w-full md:w-auto mr-2 mb-2 md:mb-0'}>
            {shipping_}
          </div>
          <div className={s.activity_a+' w-full md:w-auto flex-grow mr-2 mb-2 md:mb-0'}>
            {activity_}
          </div>
          <div className={s.details_a+' w-full md:w-auto mr-2 '}>
            {details_}
          </div> 
          
        </div>  
        <div className={s.bottom+' flex items-end'}>  
          <div className={s.track_a+' mr-2'}>{track_}</div>
          <div className={s.empty_a+' flex-grow mr-2'}>{empty_}</div>
          <div className={s.action_a+' '}>{action_}</div>
        </div> 
      </div>
    )
  } 

  /*
  if(isData) {
    items_=isData?.map((i, index)=>{
      i.influencer=i.influencer2

      let ps_
      let pc_
      if(i.order.payment[0]?.status){
        pc_=i.order.payment[0].status
        ps_=i.order.payment[0].status
      }else{
        ps_='pending'
        pc_='pending'
      }
    
      return (
        <div key={index} className={s.item+' item'} >
          <div className={s.top}>
            <h4 className={s.id}>#{i.order.id}</h4>
            <div className={s.date+' font-abhaya'}>{Moment(i.order.created_at).format('MMMM Do YYYY, h:mm a')}</div>
            <div  className={s.total}>
              <h4>Rs. {getDiscountedPrice(i.product.price, i.product.discount)}</h4>
              <div className="line-through">Rs. {i.product.price}</div>
            </div>
            <div className={s.print}><Button type="action2" color="blue" clickHandler={()=> {setPrint({...i.order, order_item:i.order_item, influencer:i.influencer, product:i.product})}}>Print</Button></div>
          </div> 
          <div className={s.middle}>
            <div className={s.status_area}>
              <div className={s.payment +' '+ps_}>{getStatus(pc_)}</div>
              <div className={s.status +' '+i.order.status+' font-able'}>{getStatus(i.order.status)}</div>
            </div>
            <div className={s.influencer}>
              <div className={s.name}>{i.influencer.name}</div><div className={s.email}>{i.influencer.email}</div>      
            </div>
            <div className={s.shipping+' font-abhaya'}>
              {i.order.details[0]?.s_address1}<br/>
              {i.order.details[0]?.s_address2} {i.order.details[0]?.s_city} {i.order.details[0]?.s_postcode}<br/>
              (257) 563-7401          
            </div>
            <div className={s.products}>
              <div className={s.product}>
                <h6 className={s.name}>{i.product.title}</h6>
                <div className={s.qty}>x {i.order_item.qty}</div>
              </div>        
            </div>
            
          </div>        
        </div>
      )
    })
  }*/

  if(isData && isData.length){
    items_=isData.map((i, index)=>{
      return(
        <Item key={index} {...i}/>
      )
    })
  }

  let order_status=isFilter.order_status? isFilter.order_status.value : '' 
  const status_opt={    
    active:order_status,
    items:[
      {label:'All', name:''},      
      {label:'Awaiting Processing', name:'awaiting_processing' },
      {label:'Processing', name:'processing'},
      {label:'Shipped', name:'shipped'},
      {label:'Delivered', name:'delivered'}, 
      {label:'Cancelled', name:'cancelled'},     
    ],   
    handler: async(i) =>{
      let next={...isFilter, start:1, order_status:{value:i.name}}      
      setFilter(next)
      let data = await pagiHandler(next)
      let total_data = await pagGetTotal(next) 
      setPagiConfig(prev=>({...prev, total:total_data}))   
    },   
    size:'md'
  } 

  const updateHandler = async (i) => {    
    console.log("i", i)   
    let data = await handler({action:'get', ...i}) 
    setData((prev)=>data)  
  }  

  const pagiHandler = async (i) => {
    console.log("pagination", i)     
    let data = await handler({action:'get', ...i}) 
    setData(data) 
  }
  const pagGetTotal = async (i) => {
    console.log("pagination", i)     
    let data = await handler({action:'get_total', ...i}) 
    return data
  }

  const refreshHandler = async () => {
    let data = await pagiHandler(isFilter)
    let total_data = await pagGetTotal(isFilter) 
  }

 
  const popupHandler = async (i) => {
    console.log("Popup", i)     
    let data = await handler(i) 
    console.log("Popup Res", data)  
    refreshHandler()   
  }
  
 
  return (
    <Layout {...props} viewType="business_app" showFooter={true} > 
      <div className={s.main}> 
        <div className={s.container}>
          <h3 className="mb-4">Sales</h3>
          <SalesSearch {...{order_status_options, payment_status_options, updateHandler}}/>    
          <div className={"flex items-center mb-4"}><TabSwitch {...status_opt}/></div> 
          <div className={"flex items-center mb-4"}>
            <div className="flex-grow"></div>
            <Pagination {...{isConfig:isPagiConfig, isFilter, setFilter, updateHandler:pagiHandler}} />
          </div>
          <div className={s.items}>                  
            {items_}
            <div style={{display:"none"}}><PrintSale ref={componentRef} {...isPrint}/></div>
          </div>
        </div>
      </div>
      <PopupSaleStatus isOpen={isPopupStatus} setOpen={setPopupStatus} isData={isPopupSData} handler={popupHandler}/>
    </Layout>    
  )
}
export default com
