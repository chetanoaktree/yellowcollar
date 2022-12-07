import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Select from '../../select';
import User from '../../blocks/com/user';
import Pagination from '../../blocks/com/pagination';
import TabSwitch from '../../tab_switch'; 
import Search from './search/influencers_search'

import {variable, performance} from './action';
import { usePage } from "../../hooks/usePage";

import EditInfluencerDemographic from './popups/edit_influencer_demographic';

import {PlayVideoBtn, VideoPopup, tag, percentage_tag, collab_status_tag} from '../_blocks/ui';


import {Details} from '../_blocks/data_ui';
import {CONSTANTS, status_options} from '../_blocks/influencer';

import s from './influencers_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'



const com = ({handler, ...props}) => { 

  const dispatch = useDispatch();  
  const {data} = useSelector((state) => state.pageData); 

  const levels={
    requested:1,
    business_accepted:2,
    influencer_accepted:3,
    collaborate:3,
    init_payment:3,
    init_payment_paid:5,
    share_link:6,
    live:7,
    completed:8,
    paid:9,
  }
  
  //STATES   
  const [isData, setData]= useState([])  
  const [isFilter, setFilter] = useState({status:{value:''}, start:1, end:3})
  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:3})
  const [isProcess, setProcess] = useState('')  

  const [isItem, setItem]= useState({})
  const [isEditInfluencerDemographic, setEditInfluencerDemographic]= useState(false)
  

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

  const approve= async(i)=>{
    setProcess("approve"+i.id)
    await handler({action:"approve", ...i})
    let data = await getData() 
    setData((prev)=>data)  
    setProcess("")
  }
  const decline= async(i)=>{
    setProcess("reject"+i.id)
    await handler({action:"decline", ...i})
    let data = await getData() 
    setData((prev)=>data)  
    setProcess("")
  }

 

  const processing=(action)=>{
    return action==isProcess ? true : false
  }
  // HANDLERS
  const updateHandler2=()=>{
    approveHandler(isTestData)
  }

  const editInfluencerDemographicHandler= async (item)=>{
    setItem(item)
    setEditInfluencerDemographic(true)
  }

  const Item=(i)=>{
    console.log("i", i)
    let [isV, setV]= useState(false) 
    let {influencer, business, product, match, meta={}}=i 
    let {mobile, profession, instagram_url, instagramUsername, insights_video_id='', insights_video_path_ } = meta ? meta : {}
    instagram_url = instagramUsername ? instagramUsername : instagram_url

    let created_at=Moment(i.created_at).format('MMM Do YYYY') 
    let facebook_link=i.meta ? i.meta.facebookUsername : ''
    facebook_link=(<a target="_blank" href={"https://facebook.com/"+facebook_link}>{facebook_link}</a>)
    let status_=tag({label:i.status, size:'sm', color: i.status=='active' ? 'green' : 'orange'})
    const id_=(
      <div className={s.id}>
        <div className={s.inf_Id}> {i.id}</div>
        <div className={"mt-2 inline-block"}>{status_}</div>
      </div>
    )
    const profile_=(
      <div className={s.profile}>
        <div className={s.influencer_a+' flex items-center mb-2'}>
          <User {...i} size="sm" className={"mr-4"}/>
          <div>            
            <div className={s.name}>{i.name}</div>
            <div className={s.profession}>{i.profession}</div>  
            <div className={s.email}>{i.email}</div>  
            <div className={s.init_fixed_fee}>Rs. {i.init_fixed_fee}</div>  
            
          </div>           
        </div> 
        <div className={s.inner_a+' flex items-center '}>
          {insights_video_id!='' && <div className={"mr-4"}><PlayVideoBtn {...{path_:insights_video_path_, setV}}/></div>}    
          <Button type="text2" color="action_blue" size="xs" className={''} clickHandler={()=>editInfluencerDemographicHandler(i)}>Demographics</Button>                
        </div>
      </div>
    )
    const details_=(
      <div className={s.details+' text-xs'}>
        <h6 className={'mb-2'}>Details</h6>      
        <Details {...{
          items:[
            {label:'Member Since', value:created_at},
            {label:'Mobile', value:mobile},
            {label:'Profession', value:profession},
            {label:'Facebook', value:facebook_link},
            {label:'Instagram', value:instagram_url},
          ]
        }}/>  
      </div>
    )
    let orders_list_
    if(i.orders){
      orders_list_=i.orders.map((j, index)=>{        
        let status2=tag({label:j.status, size:'sm', color: i.status=='active' ? 'green' : 'orange'})
        let date2=Moment(j.created_at).format('MMM Do YYYY')
        return(
          <div key={index} className={s.order_item+' flex '}>
            <div className={'flex-grow'}>
              <div className={s.date2+' mb-1'}>{date2}</div>
              <div className={s.id2}>#{j.id}</div>
            </div>
            <div className={'flex flex-col items-end'}>
              <div className={s.amount+' mb-1'}> {j.total} Rs.</div>
              <div className={s.title}> {status2}</div>
            </div>
          </div> 
        )
      })
    }
    const orders_=(
      <div className={s.details}>
        <h6 className={'mb-2'}>Recent Orders</h6>
        {orders_list_}
      </div>
    )

    let collabs_list_
    if(i.collabs){
      collabs_list_=i.collabs.map((j, index)=>{
        let match=percentage_tag(j.match)        
        let status2=collab_status_tag({status:j.status, size:'sm'})        
        let date2=Moment(j.created_at).format('MMM Do YYYY')
        return(
          <div key={index} className={s.order_item+' flex '}>
            <div className={'flex-grow flex flex-col items-start'}>
              <div className={s.date2+' mb-1'}>{date2}</div>
              <div  className={'flex items-center'}>
                <div className={s.id2+' mr-2'}>#{j.id}</div>     
                <div className={s.amount+' '}> {match} </div> 
              </div>
            </div>
            <div className={'flex flex-col items-end'}>                       
              <div className={s.title}> {status2}</div>
            </div>
          </div> 
        )
      })
    }
    const collabs_=(
      <div className={s.details}>
        <h6 className={'mb-2'}>Recent Collabs</h6>
        {collabs_list_}
      </div>
    )
    
    return(
      <div>
        <div className={s.item+' flex px-4 py-4 mb-4'}>
          <div className={s.id_a+' pr-2'}>
            {id_}
          </div>
          <div className={s.profile_a +' w-3/12 pr-2'}>
            {profile_}
          </div>
          <div className={s.details_a+' w-3/12 pr-2'}>
            {details_}
          </div>
          <div className={s.orders_a+' w-3/12 pr-2'}>
            {orders_}
          </div>
          <div className={s.collabs_a+' w-3/12 pr-2'}>
            {collabs_}
          </div>
         </div>
         <VideoPopup isOpen={isV} setOpen={setV} src={insights_video_path_}/>          
      </div>
    )
  }  
  let items_

  if(isData && isData.length){
    items_=isData.map((i, index)=>{
      return(
        <Item key={index} {...i}/>
      )
    })
  }
  const updateHandler = async (i) => {    
    console.log("i", i)   
    let data = await handler({action:'get', ...i}) 
    setData((prev)=>data)  
  }  
  let status2=isFilter.status? isFilter.status.value : '' 
  const status_opt={    
    active:status2,
    items:[
      {label:'All', name:''},      
      {label:'Active', name:'active'},
      {label:'Blocked', name:'blocked'},     
    ],    
    handler: async(i) =>{
      let next={...isFilter, status:{value:i.name}}      
      setFilter(next)
      let data = await pagiHandler(next)
      let total_data = await pagGetTotal(next) 
      setPagiConfig(prev=>({...prev, total:total_data}))   
    },   
    size:'md'
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

  return (
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main}>   
        <div className={s.container}>     
          <h3 className={"mb-4"}>Influencers</h3>          
          <Search {...{status_options, updateHandler}}/>          
          <div className={"flex items-center mb-4"}><TabSwitch {...status_opt}/></div> 
          <div className={"flex items-center mb-4"}>
            <div className="flex-grow"></div>
            <Pagination {...{isConfig:isPagiConfig, isFilter, setFilter, updateHandler:pagiHandler}} />
          </div>
          <div className={s.content}>            
            {items_}
          </div>
        </div>  
      </div> 
      <EditInfluencerDemographic isOpen={isEditInfluencerDemographic} setOpen={setEditInfluencerDemographic} item={isItem} influencer_id={isItem.id} getHandler={handler} />           
    </Layout>    
  )
}
export default com
