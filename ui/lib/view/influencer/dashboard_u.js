import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { APP_SET} from "/store/types";
import Link from 'next/link'
import Layout from './layout';
import Button from '../../button';
import {Refresh, Widgets, RecentItems, collab_status_tag} from '../_blocks/stats_ui';
import s from './dashboard_u.module.scss';
import Moment from 'moment';



const com = (props) => {  
  let {handler} = props
  props.navArgs.translucent=false 
  props.navArgs.noborder=false 

  let widgets_, recent_collabs_, recent_order_items_

  const dispatch = useDispatch();  
  const {app} = useSelector((state) => state.pageData);

  console.log("APP", app)

  const[isStats, setStats] = useState({})  
  const[isCollabs, setCollabs] = useState([]) 
  const[isOrders, setOrders] = useState([]) 
  const[isSP, setSP] = useState(false)
  const[isCP, setCP] = useState(false)  
  const[isOP, setOP] = useState(false) 

  const refreshHandler = async () =>{
     let d=app.dashboard ? app.dashboard : {}  
     setSP(true)   
      let stats = await handler({action:'get_live_stats'})
      setStats(stats)
      setSP(false)  
      d.stats= stats

      setCP(true) 
      let collabs = await handler({action:'get_collabs'})
      setCollabs(collabs)
      setCP(false) 
      d.collabs= collabs

      setOP(true) 
      let orders = await handler({action:'get_orders'})
      setOrders(orders)
      setOP(false)
      d.orders= orders

      dispatch({
        type: APP_SET,
        payload: {dashboard:d},
      });  
  }
  useEffect(async () => {
    let d=app.dashboard ? app.dashboard : {}    
    if(!app.dashboard) {        
      await refreshHandler()
    }else{
      setStats(d.stats)
      setCollabs(d.collabs)
      setOrders(d.orders)
    }    
  }, []); 

  let s={
    earnings:{amount:0}, 
    collabs:{total_items:0},    
    orders:{total_items:0},     
     ...isStats}

  let c=isCollabs
  let o=isOrders
 

  console.log("Dashboard", props)
  const widgets=()=>{
    return(<Widgets {...{
      sub_title:"",
      title:"Influencer Stats",
      isProcessing:isSP,
      refreshHandler,
      items:[
        {label:'Earnings', value:s.earnings.amount, sub_value:'Rs.'},
        {label:'Collaborations', value:s.collabs.total_items},
        {label:'Orders', value:s.orders.total_items}
      ]
    }}
    />)
  }
  const recent_collabs=()=>{
    let items=c.map(({id, status, business, product})=>{
      business.company_name = business.company_name ? business.company_name : business.name
      return {title:business.company_name, sub_title:product.title, image:business.image, image2:product.image, type:'collab', status,  url:'/app/collab/'+id, }
    })
    return(<RecentItems {...{
      sub_title:"Recent",
      title:"Collaborations",
      url:'/app/collab/',
      scroller_style:{height:'360px'},
      isProcessing:isCP,
      items
    }}
    />)
  }

  const recent_order_items=()=>{
    let items=o.map(({item, order, business, product})=>{
      business.company_name = business.company_name ? business.company_name : business.name
      return {title:product.title, sub_title:business.company_name, image:product.image, type:'order', status:item.status, url:'/app/order/'+order.id, info:item.price+' Rs.'}
    })
    return(<RecentItems {...{
      sub_title:"Recent",
      title:"Order Items",
      url:'/app/orders/',
      scroller_style:{height:'360px'},
      isProcessing:isOP,
      items
    }}
    />)
  }

  if(isStats) {
    widgets_=widgets()
    recent_order_items_=recent_order_items()
  }
  if(isCollabs) {   
    recent_collabs_=recent_collabs()
  }
  return (
    <Layout {...props} showShopNav={false} showFooter={true} viewType="influencer_app"> 
      <div className={s.main}>
        <div className={"mx-auto w-full px-4 py-12"} style={{maxWidth:'1024px'}}>
          <div className={"mb-16"}>{widgets_}</div>
          <div className={"mb-16"}>{recent_collabs_}</div>
          <div className={"mb-16"}>{recent_order_items_}</div>
        </div>       
      </div>
    </Layout>    
  )
}
export default com
