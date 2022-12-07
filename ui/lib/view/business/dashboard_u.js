import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { APP_SET} from "/store/types";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Button from '../../button';
import {Refresh, Widgets, RecentItems, collab_status_tag} from '../_blocks/stats_ui';
import s from './dashboard_u.module.scss';
import Moment from 'moment';



const com = (props) => {  
  let {handler} = props
  props.navArgs.translucent=false 
  props.navArgs.noborder=false 

  let widgets_, recent_collabs_, recent_requests_, recent_order_items_

  const dispatch = useDispatch();  
  const {user, app} = useSelector((state) => state.pageData);

  console.log("APP", app)

  const[isStats, setStats] = useState({})  
  const[isCollabs, setCollabs] = useState([]) 
  const[isRequests, setRequests] = useState([]) 
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

      setCP(true) 
      let requests = await handler({action:'get_requests'})
      setRequests(requests)
      setCP(false) 
      d.requests= requests

      setOP(true) 
      let orders = await handler({action:'get_sales'})
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
      setRequests(d.requests)
      setOrders(d.orders)
    }    
  }, []); 

  let s={
    earnings:{amount:0}, 
    collabs:{total_items:0},  
    requests:{total_items:0},   
    orders:{total_items:0},     
     ...isStats}

  let c=isCollabs
  let cr=isRequests
  let o=isOrders
 

  console.log("Dashboard", props)
  const widgets=()=>{
    return(<Widgets {...{
      sub_title:"",
      title:"Business Stats",
      isProcessing:isSP,
      refreshHandler,
      items:[
        {label:'Sales Earnings', value:s.earnings.amount, sub_value:'Rs.'},
        {label:'Collaborations', value:s.collabs.total_items},
        {label:'Collab Requests', value:s.requests.total_items},
        {label:'Sales', value:s.orders.total_items}
      ]
    }}
    />)
  }
  const recent_collabs=()=>{
    //console.log("c", c)
    let items=[]
    if(c.length){
       items=c.map(({id, status, influencer, product})=>{      
        return {title:influencer.name, sub_title:product.title, image:influencer.image, image2:product.image, type:'collab', status,  url:'/app/collab/'+id, }
      })
    }
   
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
  const recent_requests=()=>{       
    let items=[]
    if(c.length){
       items=cr.map(({id, collab_id, match, business_id, status, influencer, product})=>{ 
         console.log("collab_id", collab_id) 
        const approveH = async() => {
          console.log("approve")
          let data=await handler({action_type:'sub', sub_action:'approve_collab_request', inData:{collab_id:id, business_id}})
          await refreshHandler()
        }
        const rejectH = async() => {
          console.log("Reject")
          let data=await handler({action_type:'sub', sub_action:'reject_collab_request', inData:{collab_id:id, business_id}})
          await refreshHandler()
        }    
        return {title:influencer.name, sub_title:product.title, image:influencer.image, image2:product.image, type:'collab', info:'Match: '+match+'%', approveH, rejectH }
      })
    }
   
    return(<RecentItems {...{
      sub_title:"Recent",
      title:"Collab Requests",
      url:'/app/collab/',
      scroller_style:{height:'360px'},
      isProcessing:isCP,
      items
    }}
    />)
  }

  const recent_order_items=()=>{
    let items=[]
    if(o.length){
      items=o.map(({item, order, influencer, product})=>{
        //return {title:product.title, sub_title:influencer.name, image:product.image, type:'order', status:item.status, url:'/app/order/'+order.id, info:item.price+' Rs.'}
        return {title:product.title, sub_title:influencer.name, image:product.image, type:'order', status:item.status, url:'/app/sales/', info:item.price+' Rs.'}
      })
    }
    return(<RecentItems {...{
      sub_title:"Recent",
      title:"Sales Items",
      url:'/app/sales/',
      scroller_style:{height:'360px'},
      isProcessing:isOP,
      items
    }}
    />)
  }

  if(s) {
    widgets_=widgets()
    recent_order_items_=recent_order_items()
  }
  if(cr) {   
    recent_requests_=recent_requests()
  }
  if(c) {   
    recent_collabs_=recent_collabs()
  }
  return (
    <Layout {...props} showShopNav={false} showFooter={true} viewType="business_app"> 
      <div className={s.main}>
        <div className={"mx-auto w-full px-4 py-12"} style={{maxWidth:'1024px'}}>
          <div className={"mb-16"}>{widgets_}</div>
          <div className={"mb-16"}>{recent_requests_}</div>
          <div className={"mb-16"}>{recent_collabs_}</div>
          <div className={"mb-16"}>{recent_order_items_}</div>
        </div>       
      </div>
    </Layout>    
  )
}
export default com
