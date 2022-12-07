import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input2';
import User from '../../blocks/com/user';
import TabSwitch from '../../tab_switch'; 
import TransactionsSearch from './search/transactions_search'
import {extract_items} from '../../../../components/get/search';

import {InputText as InputText_, InputSlate as InputSlate_, DisplayText as DisplayText_} from './pages/ui/ui';

import InfoEdit from './pages/page_info_edit';
import CatEdit from './pages/page_cat_edit';
import HomeEdit from './pages/page_home_edit';

import s from './pages_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'

const com = ({handler, imageHandler, ikHandler, ...props}) => { 

  const dispatch = useDispatch();  
  //const pageData = useSelector((state) => state.pageData);  
  const {data, user} = useSelector((state) => state.pageData);   
  //console.log("for user", pageData)
  //STATES 
  
  const [isData, setData]= useState([]) 
  const [isType, setType] = useState('home')
  const [isView, setView] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isProcess, setProcess] = useState('')

  useEffect(async () => { 
    let isMounted = true    
    let data = await handler({action:'get', type:'home'}) 
    //console.log("init Data", data)
    if(isMounted) setData((prev)=>data)
    return () => {
      isMounted = false;
    };
  }, []); 

  const refresh= async()=>{
    let data = await handler({action:'get', type:isType}) 
    setData((prev)=>data)     
  } 
  const decline= async(i)=>{
    //setProcess("reject")
    await handler({action:"decline", ...i})   
    //refresh()      
  }
  const view= async(i)=>{
    console.log("view", i)
    //setProcess("reject")   
    let data=await handler({action:"view", ...i}) 
    setView((prev)=>data)  
    //refresh()      
  }
  const update_view_item= async(v, n, for_='')=>{
    console.log(n,v)
    //setProcess("reject")   
    //let data=await handler({action:"update_view", ...i}) 
    setView((prev)=>{
      let next={...prev}
      if(for_=="meta"){
        next.meta = next.meta ? next.meta : {}
        next.meta[n]=v
      }else{
        next[n]=v
      }     
      return next
    })  
    //refresh()      
  } 
  

  
  const update_view= async(v, n)=>{    
    setProcess("update")   
    let data=await handler({action:"update_view", type:isType, ...isView})   
    await refresh()   
    setProcess(false)      
  }


  const processing=(action)=>{
    return action==isProcess ? true : false
  }
 
  const HomeItem=(i)=>{
    const {id, name, title, desc, meta}=i    
    return(
      <div className={s.item}>
        <div className={s.view} onClick={()=>view(i)}>
          <img className={s.arrow} src="/images/Arrow_right_light.svg"/>
          <div className={s.text}>{id}</div>  
        </div>        
        <div className={s.name_a}>          
          <h6 className={s.name}>{title}</h6>
        </div>          
      </div>
    )
  }
  const InfoItem=(i)=>{
    const {id, name, title, desc, meta}=i    
    return(
      <div className={s.item}>
        <div className={s.view} onClick={()=>view(i)}>
          <img className={s.arrow} src="/images/Arrow_right_light.svg"/>
          <div className={s.text}>{id}</div>  
        </div>        
        <div className={s.name_a}>          
          <h6 className={s.name}>{title}</h6>
        </div>          
      </div>
    )
  }  
  const CatItem=(i)=>{
    const {id, name, slug, desc, meta}=i    
    return(
      <div className={s.item}>
        <div className={s.view} onClick={()=>view({...i, type:'category'})}>
          <img className={s.arrow} src="/images/Arrow_right_light.svg"/>
          <div className={s.text}>{id}</div>  
        </div>        
        <div className={s.name_a}>          
          <h6 className={s.name}>{name}</h6>
        </div>          
      </div>
    )
  }
  const BackBar=()=>{    
    return(
      <div className={s.backBar}>  
        <div className={s.left}>         
          <div className={s.back} onClick={()=>setView(false)}>
            <img className={s.arrow} src="/images/Arrow_left_light.svg"/>          
          </div>   
          <h5>{isType=="category" ? isView.name : isView.title}</h5>           
        </div>    
        <div className={s.right}> 
          <Button className="mr-2" type="text2" color="action_blue" target="_blank" to={"/"+isView.name}>View</Button> 
          <Button className="mr-2" clickHandler={()=>setView(false)} type="action2" size="md" color="white">Close</Button>         
          <Button isProcessing={isProcess == "update" ? true : false} clickHandler={update_view} type="action2" size="md">Update</Button>
        </div>    
      </div>
    )
  }  
  let InputText=({label, name, value, for_=''})=>{   
    return InputText_({label, name, value, for_, update_item:update_view_item, })
    return(
      <div className={s.text_a}>
        <div className={s.label+' w-3/12'}>{label}</div>
        <div className={s.input+' w-9/12'}><Input name={name} value={value} changeHandler={(v,e,n)=>update_view_item(v, n, for_)}/></div>          
      </div> 
    )
  }  
  let InputSlate=({label, name, value, for_=''})=>{   
    return InputSlate_({label, name, value, for_, update_item:update_view_item})
    return(
      <div className={s.text_a}>
        <div className={s.label+' w-3/12'}>{label}</div>
        <div className={s.input+' w-9/12'}><Input name={name} value={value} changeHandler={(v,e,n)=>update_view_item(v, n, for_)}/></div>          
      </div> 
    )
  }  
  
  let DisplayText=({label, name, value, for_=''})=>{  
    return DisplayText_({label, name, value})  
    return(
      <div className={s.text_a}>
        <div className={s.label+' w-3/12'}>{label}</div>
        <div className={s.input+' w-9/12'}><div className={'px-5 py-4'}>{value}</div></div>          
      </div> 
    )
  }  
  let Meta=()=>{ 
    let {title, desc, keywords} = isView.meta ? isView.meta : {}    
    return(
      <div className={s.section}>        
        <h5>Meta</h5>  
        {InputText({label:"Title", name:"title", value:title, for_:'meta'})}
        {InputText({label:"Description", name:"desc", value:desc, for_:'meta'})} 
        {InputText({label:"Keywords", name:"keywords", value:keywords, for_:'meta'})}
      </div>
    )
  }
  let OpenGraph=()=>{     
    let {og_title, og_desc} = isView.meta ? isView.meta : {}    
    return(
      <div className={s.section}>        
        <h5>Open Graph</h5>  
        {InputText({label:"Title", name:"og_title", value:og_title, for_:'meta'})}
        {InputText({label:"Description", name:"og_desc", value:og_desc, for_:'meta'})} 
      </div>
    )
  }
  let items_
  if((isData || isView) && !isLoading) {
    if(isView!=false){
      
      let i_={...isView, s, InputText, InputSlate, DisplayText, update_view_item, update_view, imageHandler, ikHandler, Meta, user, OpenGraph }

      if(isType=="home"){
        items_=(isType=="home" && <HomeEdit {...i_}/>)
      }else{
        items_=(
          <div>           
            {isType=="info" && <InfoEdit {...i_}/>}
            {isType=="category" && <CatEdit {...i_}/>}            
          </div>
        )
      }  
    }else{
      if(isType=="home"){
        items_=((!isLoading && isType=="home") && <HomeItem {...{s, ...isData[0]}}/>)
      }else{
        items_=isData.map((i, index)=>{      
          return(
            <div key={index}>           
              {isType=="info" && <InfoItem {...i}/>}
              {isType=="category" && <CatItem {...i}/>}
            </div>
          )
        })
      }    
    }    
  }

  const type_opt={
    items:[
      {label:'Home', name:'home', isActive:isType == 'home' ? true : false},
      {label:'Categories', name:'category', isActive:isType == 'category' ? true : false},
      {label:'Docs', name:'info', isActive:isType == 'info' ? true : false}
    ],
    handler: async(i) =>{
      //console.log(i)
      setLoading(true)
      setType( prev => i.name )      
      let data = await handler({action:'get', type:i.name}) 
      setData((prev)=>data) 
      setLoading(false) 
    }
  }  

  const updateHandler = async (i) => {    
    i=extract_items(i, [
      {find:'collab_status', get:'collab_status', get_type:'object'},
      {find:'business', get:'business_name', get_type:'string'},
      {find:'business_id', get:'business_id', get_type:'string'},
      {find:'influencer', get:'influencer_name', get_type:'string'},
      {find:'influencer_id', get:'influencer_id', get_type:'string'},
      {find:'product', get:'product_name', get_type:'string'},
      {find:'product_id', get:'product_id', get_type:'string'}
    ]) 
    console.log("i", i)
    let data = await getData(i) 
    setData((prev)=>data)  
  }  
  const collab_status_options=[
    {label:'All', value:''},    
    {label:'Pending', value:'pending'},  
    {label:'Declined', value:'declined'}, 
    {label:'Approved', value:'approved'},   
  ]
  //console.log("data", isData)
  return (
    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main}>        
        <h3 className={"mb-4"}>
          {!isView ? 'Pages' : 'Edit Page'}
        </h3>
        {!isView && <div className={"flex items-center mb-4"}><TabSwitch {...type_opt}/></div>} 
        {isView && <BackBar/>}      
        {/*<TransactionsSearch {...{collab_status_options, updateHandler}}/>*/}
        <div className={s.content}>          
          {items_}
        </div>  
      </div> 
    </Layout>    
  )
}
export default com
