import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input';
import User from '../../blocks/com/user';
import TabSwitch from '../../tab_switch'; 
import SignupCodesSearch from './search/signup_codes_search'
import {extract_items} from '../../../../components/get/search';
import { usePage } from "../../hooks/usePage";

import s from './signup_codes_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'

import{CopyToClipboard} from 'react-copy-to-clipboard'

import {CONSTANTS, get_id, tag} from '../_blocks/ui';



const com = (props) => { 
  let {handler} = props

  const dispatch = useDispatch();  
  const {data} = useSelector((state) => state.pageData); 

  //STATES 
  const [isData, setData]= useState([]) 
  const [isType, setType] = useState(true)
  const [isProcess, setProcess] = useState('')

  //Vars 
  let items_

  useEffect(async () => { 
     let data = await handler({action:"get"}) 
     setData((prev)=>data)  
     return(()=>{
       setType(false);
     })   
  }, []); 
  
  //console.log("isCopy", isCopy)
  //console.log("isData", isData)
  //Handlers 
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

  const Copy = ({code}) => {
    const [isCopy, setCopy] = useState('')
    const copyHandler = () => {
      setCopy(code)
      setTimeout(()=>{
        setCopy('')
      }, 3000)
    }
    return(    
      <Button className={s.copy+' ml-2'}>  
        <CopyToClipboard onCopy={copyHandler} text={code}>
          <div className={'flex items-center'}>
            <div className={"flex-grow"}><img src="/images/Copy_alt_light.svg"/></div>
            {isCopy && <div className={s.copied+' ml-2'}>copied</div>}
          </div>
        </CopyToClipboard> 
      </Button>     
    )
  }
  const Limit = ({id, limit_}) => {
    const [isLimit, setLimit] = useState(limit_)
    const changeHandler = async (v, n) => {
      setLimit(v) 
      await handler({action:"update_limit", id, limit_:v})     
    }
    return(    
      <div className={s.copy+' ml-2 flex items-center'}>  
        <div className={"mr-2 opacity-50"}>Limit</div>
        <Input name={"limit"} value={isLimit} changeHandler={changeHandler}/>
      </div>     
    )
  }

  
  
  const user = ({user_id, fullname, email}) => {
    return(
      <div className={s.user}>
        {/*<div className={s._id+' mr-4'}>{user_id}</div>*/}
        <div className={s._name+' mr-4'}>{fullname}</div>
        <div className={s._email}>{email}</div>     
      </div>
    )
  }
    
  const Item=(i)=>{
    const {code, users=[], meta, limit_}=i
    let usage=users.length
    let stats = 'Not Used'
    let stats_color = 'grey'
    if(usage>=limit_){
      stats = 'Full'
      stats_color='red'
    }else if(usage>0){
      stats = `Used ${usage} times`
      stats_color='green'
    }
    let stats_ = tag({label:stats, size:"md", color:stats_color})
    if(!users) users=[]
    const users__=users.map((i, index) => {
      return <div key={index}>{user(i)}</div>
    })
    
   
    const code_ = (
      <div className={s.code+ ' flex items-center'}>
        <div className={"flex-grow"}>{code}</div> <Copy code={code}/>
      </div>
    )
    const users_ = (
      <div className={s.users}>
        <div className={"opacity-25"}>Users</div>
        <div>{users__}</div>
      </div>
    )
    const details_ = (
      <div className={s.details}>
        <div className={"text-center"}>{stats_}</div>
      </div>
    )

    return(
      <div className={s.item}> 
        <div className={s.id_a+' flex flex-col mr-2'}>          
          {get_id(i)} 
        </div>
        <div className={s.code_a +' '}>
          {code_}
        </div>        
        <div className={s.users_a+' flex-grow mr-2'}>
          {users_}   
        </div>
        <div className={s.input_a+' mr-2'}>
          <Limit {...i}/>
        </div>
        <div className={s.details_a+' mr-2'}>
          {details_}   
        </div>          
      </div>
    )
  }
  if(isData && isData.length){
    items_=isData.map((i, index)=>{
      //console.log("i", i)
      return(
        <Item key={index} {...i}/>
      )
    })
  }

  const updateHandler = async (i) => { 
    //console.log("i", i)
    let data = await handler({action:'get', ...i}) 
    setData((prev)=>data)  
  }  
  const collab_status_options=[
    {label:'All', value:''},    
    {label:'Pending', value:'pending'},  
    {label:'Declined', value:'declined'}, 
    {label:'Approved', value:'approved'},   
  ]
  return (
    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main}> 
        <div className={s.container}>
          <h3 className={"mb-4"}>Signup Codes</h3>
          <SignupCodesSearch {...{collab_status_options, updateHandler}}/>
          <div className={s.content}>           
            {items_}
          </div> 
        </div>     
      </div>            
    </Layout>    
  )
}
export default com
