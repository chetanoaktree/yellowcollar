import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input2'; 
import TabSwitch from '../../tab_switch'; 
import { usePage } from "../../hooks/usePage";

import s from './subscriptions_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


const com = ({updateHandler, getData,  ...props}) => { 

  const dispatch = useDispatch();  
  const {data} = useSelector((state) => state.pageData); 

  //INIT VALUES
  let init={    
    level0:{
      name:'',
      title:'',
      desc:'',
      monthly:{
        per_month:'',
        price:'',
        save:'',
      },
      yearly:{
        per_month:'',
        price:'',
        save:'',
      },
      per_month:'',
      price:'',
      save:'',
      meta:{}
    },
    level1:{
      name:'',
      title:'',
      desc:'',
      monthly:{
        per_month:'',
        price:'',
        save:'',
      },
      yearly:{
        per_month:'',
        price:'',
        save:'',
      },
      per_month:'',
      price:'',
      save:'',      
      meta:{}
    },
    level2:{
      name:'',
      title:'',
      desc:'',
      monthly:{
        per_month:'',
        price:'',
        save:'',
      },
      yearly:{
        per_month:'',
        price:'',
        save:'',
      },
      per_month:'',
      price:'',
      save:'',
      meta:{}
    }
  }
  const influencer_meta_init=[
    {
      title:'Promotional Requests',
      name:'promotional_requests', 
      type:'', 
    },
    {
      title:'Platform Fee (on total amount)',
      name:'platform_fee_order',
      type:'%', 
    }, 
    {
      title:'Success Fee (on total amount)',
      name:'platform_fee_collab', 
      type:'%', 
    },   
     
  ]
  const business_meta_init=[
    {
      title:'Partnership fee',
      name:'platform_fee_collab',
      type:'%', 
    },
    {
      title:'Sales commission',
      name:'platform_fee_sale',
      type:'%',  
    },
  ]
  let business_init={...init}
  let influencer_init={...init}
  
  //const [isFullData, setFullData] = useState({business:{level0:{title:''}}, influencer:{level0:{title:''}}})

  useEffect(async () => { 
     let data = await getData() 
     setTestData((prev)=>data)     
  }, []); 

  

  const page=usePage() 

  
  
  //STATES 
  
  const [isTestData, setTestData]= useState({
    business:{
      level0:{
        title:'', name:'',desc:'', 
        meta:{platform_fee_sale:'', platform_fee_collab:''}, 
        monthly:{price:'', per_month:'', save:''}, 
        yearly:{price:'', per_month:'', save:''}, 
      },
      level1:{
        title:'',  name:'',desc:'', 
        meta:{platform_fee_sale:'', platform_fee_collab:''}, 
        monthly:{price:'', per_month:'', save:''}, 
        yearly:{price:'', per_month:'', save:''}, 
      },
      level2:{
        title:'',  name:'',desc:'', 
        meta:{platform_fee_sale:'', platform_fee_collab:''}, 
        monthly:{price:'', per_month:'', save:''}, 
        yearly:{price:'', per_month:'', save:''}, 
      },
    }, 
    influencer:{
      level0:{
        title:'',  name:'',desc:'', 
        meta:{platform_fee_sale:'', platform_fee_collab:''}, 
        monthly:{price:'', per_month:'', save:''}, 
        yearly:{price:'', per_month:'', save:''}, 
      },
      level1:{
        title:'',  name:'',desc:'', 
        meta:{platform_fee_sale:'', platform_fee_collab:''}, 
        monthly:{price:'', per_month:'', save:''}, 
        yearly:{price:'', per_month:'', save:''}, 
      },
      level2:{
        title:'',  name:'',desc:'', 
        meta:{platform_fee_sale:'', platform_fee_collab:''}, 
        monthly:{price:'', per_month:'', save:''}, 
        yearly:{price:'', per_month:'', save:''}, 
      },
    }
  })
  const [isFullData, setFullData]= useState({business:business_init, influencer:influencer_init})
  const [isData, setData]= useState(init)
  const [isMeta, setMeta]= useState(influencer_meta_init)
  const [isType, setType] = useState('influencer')
  const [isDuration, setDuration] = useState('monthly')

  //console.log("isData :"+isType, isData)
 

  //SWITCH OPTIONS
  const duration_opt={
    items:[
      {label:'Monthly', name:'monthly', isActive:isDuration == 'monthly' ? true : false},
      {label:'Yearly', name:'yearly', isActive:isDuration == 'yearly' ? true : false}
    ],
    handler: (i) =>{
      setDuration( prev => i.name )
    }
  }  
  const type_opt={
    items:[
      {label:'Influencer', name:'influencer', isActive:isType == 'influencer' ? true : false},
      {label:'Business', name:'business', isActive:isType == 'business' ? true : false}
    ],
    handler: (i) =>{
      setType( prev => { 
        let meta = i.name=="influencer" ? influencer_meta_init : business_meta_init 
        //let data = i.name=="influencer" ? influencer_init : business_init          
        /*setFullData((p)=>{
          let d={}
          _.forEach(isData, (v, k)=>{
            d[k]=v
          })
         return {...p, [prev]:d}
        })
        console.log("isDataType", isData)
        const copy = {...isData, sd:'bar'}
        dispatch({
          type: PAGE_DATA_SET,
          payload: isData,
        });*/
        //setData(data)
        /*setTestData((prev)=>{
          let next=test(prev, 'level0', 'pree', isData['level0'].title)
          return next
        })*/
        setMeta(meta)
            
        return i.name
      })
    }
  }  

  // HANDLERS
  const updateHandler2=()=>{
    updateHandler(isTestData)
  }

  const handler=(prev, level, name, value, inner=false)=>{ 
    let type_={...prev[isType]}      
    let level_=type_[level]
    if(inner=='duration'){
      level_[isDuration][name]=value
    }else if(inner=='meta'){
      level_['meta'][name]=value
    }else{
      level_[name]=value
    }  
    type_[level]=level_
    let next={...prev, [isType]:type_}
    console.log("next", next)    
    return next
  }
  const test=(prev, level, name, value, inner=false)=>{ 
    let type_=prev[isType] ? prev[isType] : {level0:{}, level1:{}, level2:{}}    
    let level_=type_[level]
    if(inner=='duration'){
      level_[isDuration][name]=value
    }else if(inner=='meta'){
      level_['meta'][name]=value
    }else{
      level_[name]=value
    }  
    type_[level]=level_
    let next={...prev, [isType]:type_}
    console.log("next", next)    
    return next
  }
  const test2=()=>{ 
    setTestData((prev)=>{
      let next=test(prev, 'level0', 'pree', isData['level0'].title)
      return next
    })
  }
  
  const inputHandler=(level, value, name)=>{    
    //console.log("level", level)
    //console.log("name", name)
    //console.log("value", value)
    setTestData((prev)=>{
      let next=handler(prev, level, name, value, false)     
      return next
    })
  }

  const metaHandler=(level, value, name)=>{
    //console.log("level", level)
    //console.log("name", name)
    //console.log("value", value)
    setTestData((prev)=>{
      let next=handler(prev, level, name, value, 'meta')     
      return next
    })
  }
  const priceHandler=(level, value, name)=>{
    //console.log("level", level)
    //console.log("name", name)
    //console.log("value", value)
    setTestData((prev)=>{
      let next=handler(prev, level, name, value, 'duration')     
      return next
    })
  }

  const i0=(v, n)=>inputHandler('level0', v, n)
  const i1=(v, n)=>inputHandler('level1', v, n)
  const i2=(v, n)=>inputHandler('level2', v, n)

  const m0=(v, n)=>metaHandler('level0', v, n)
  const m1=(v, n)=>metaHandler('level1', v, n)
  const m2=(v, n)=>metaHandler('level2', v, n)

  const p0=(v, n)=>priceHandler('level0', v, n)
  const p1=(v, n)=>priceHandler('level1', v, n)
  const p2=(v, n)=>priceHandler('level2', v, n)

  // CONTENT
  const meta_=isMeta.map((i, index)=>{
    //console.log("meta", i)
    return(
      <div key={index} className={s.row}>
        <div className={s.label}>{i.title}</div>
        <div className={s.input}><Input name={i.name} value={isFullData[isType].level0['meta'][i.name]} changeHandler={(v, e, n)=>m0(v, n)}/></div>
        <div className={s.input}><Input name={i.name} value={isFullData[isType].level1['meta'][i.name]} changeHandler={(v, e, n)=>m1(v, n)}/></div>
        <div className={s.input}><Input name={i.name} value={isFullData[isType].level2['meta'][i.name]} changeHandler={(v, e, n)=>m2(v, n)}/></div>
        {isType}-{isDuration}-{i.name}-{isFullData[isType].level0['meta'][i.name]}
      </div>
    )
  })

  const set = (label, name, type) =>{
    let out0
    let out1
    let out2
    if(isType=="influencer"){
      out0=(<div><Input name={name} value={isTestData['influencer'].level0[name]} changeHandler={(v, e, n)=>i0(v, n)}/></div>)
      out1=(<div><Input name={name} value={isTestData['influencer'].level1[name]} changeHandler={(v, e, n)=>i1(v, n)}/></div>)
      out2=(<div><Input name={name} value={isTestData['influencer'].level2[name]} changeHandler={(v, e, n)=>i2(v, n)}/></div>)
    }else{
      out0=(<div><Input name={name} value={isTestData['business'].level0[name]} changeHandler={(v, e, n)=>i0(v, n)}/></div>)
      out1=(<div><Input name={name} value={isTestData['business'].level1[name]} changeHandler={(v, e, n)=>i1(v, n)}/></div>)
      out2=(<div><Input name={name} value={isTestData['business'].level2[name]} changeHandler={(v, e, n)=>i2(v, n)}/></div>)
    }
    
    return(
      <div className={s.row}>
        <div className={s.label}>
          <div>{label}</div>  
          <div>{type}</div> 
        </div>
        <div className={s.input}>{out0}</div>
        <div className={s.input}>{out1}</div>
        <div className={s.input}>{out2}</div>
      </div>
    )
  }
  const priceSet = (label, name, type) =>{
    return(
      <div className={s.row}>
        <div className={s.label}>
          <div>{label}</div>  
          <div>{type}</div> 
        </div>
        <div className={s.input}><Input name={name} value={isTestData[isType].level0[isDuration][name]} changeHandler={(v, e, n)=>p0(v, n)}/></div>
        <div className={s.input}><Input name={name}  value={isTestData[isType].level1[isDuration][name]} changeHandler={(v, e, n)=>p1(v, n)}/></div>
        <div className={s.input}><Input name={name}  value={isTestData[isType].level2[isDuration][name]} changeHandler={(v, e, n)=>p2(v, n)}/></div>
      </div>
    )
  }
  const metaSet = (label, name, type) =>{
    return(
      <div className={s.row}>
        <div className={s.label}>
          <div>{label}</div>  
          <div>{type}</div> 
        </div>
        <div className={s.input}><Input name={name} value={isTestData[isType].level0['meta'][name]} changeHandler={(v, e, n)=>m0(v, n)}/></div>
        <div className={s.input}><Input name={name}  value={isTestData[isType].level1['meta'][name]} changeHandler={(v, e, n)=>m1(v, n)}/></div>
        <div className={s.input}><Input name={name}  value={isTestData[isType].level2['meta'][name]} changeHandler={(v, e, n)=>m2(v, n)}/></div>
      </div>
    )
  }
  return (
    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main}>        
        <h3>Subscriptions</h3>
        <div className={s.content}>
          <div className={s.top_a}>
            <TabSwitch {...type_opt}/>
            <TabSwitch {...duration_opt}/>            
          </div>
          <div className={s.main_a}>
            {set("Title", 'title')}
            {set("Name", 'name')}
            {set("Description", 'desc')}
            {priceSet("Price", 'price', "Rs")} 
            {priceSet("Per Month", 'per_month', "Rs")} 
            {priceSet("Save", 'save', "Rs")}             
            <div className={s.meta}>
              {isType=='business' && metaSet("Partnership fee", 'platform_fee_collab', '%')}
              {isType=='business' && metaSet("Sales commission", 'platform_fee_sale', '%')}
              {isType=='influencer' && metaSet("Promotional requests", 'promotional_requests', '')}
              {isType=='influencer' && metaSet("Platform Fee", 'platform_fee_order', '%')}
              {isType=='influencer' && metaSet("Success Fee (on total amount)", 'platform_fee_collab', '%')}
              
              {/*meta_*/}
            </div>
          </div>
          <div className={s.bottom_a}>
            <div></div>
            <Button clickHandler={updateHandler2} type="action" >Update</Button>
            {/*<Button clickHandler={test2} type="action" >Test</Button>*/}
          </div>
        </div>               
        {/*<div>TestData: {JSON.stringify(isTestData)}</div>*/}        
      </div>            
    </Layout>    
  )
}
export default com


/*
options table
keys
influencer_subscriptions_free  -  used if influencer doesnt have the subscription
influencer_subscriptions_free  -  used if business doesnt have the subscription
subscriptions_influencer - used in influencer subscription page
business_influencer - used in business subscription page
subscriptions - for admin subscriotions page
*/

