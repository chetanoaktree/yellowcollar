import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {NotificationManager} from 'react-notifications'
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Input from '../../input2';
import Select from '../../select';
import Button from '../../button';
import Textarea from '../../textarea';
import User from '../../blocks/com/user';
import Sm from '../../blocks/com/sm';
import AddImage from '../../blocks/com/add_images';

import s from './settings_u.module.scss';


import { FacebookProvider, Login, LoginButton, Initialize  } from 'react-facebook';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';

const com = ({handler, ikHandler, getCategoriesOptions, ...props}) => { 
  //console.log('user2', user)
 // console.log('profile2', item)
  //console.log('props', props)

  let categoryOptions=[]
  
  const[isData, setData] = useState({})
  const[isCategoriesOptions, setCategoriesOptions] = useState([]) 
  const[isProcessing, setProcessing] = useState(false)

  const {user} = useSelector((state) => state.pageData);

  let d={
    name:'',
    company_name:'',
    desc:'',
    image_id:'',
    image:{},
    details:{
      desc:'',
      ...isData.details ? isData.details : {}
    },
    meta:{
      instagram_url:'',
      website:'',
      categories:[],
      bank_name:'',
      bank_ifsc_code:'',
      bank_account_no:'',
      gst_no:'',
      cin_no:'',
      ...isData.meta ? isData.meta : {}
    },
    ...isData
  }
 
  console.log("d", d)

  useEffect(async()=>{
    let categoriesOptions = await getCategoriesOptions()
    let data=await handler({action:'get_business'})
    setData(data)
    setCategoriesOptions(categoriesOptions)
  }, [])

  let content_=(<div>Loading</div>)

  const saveHandler= async ()=>{    
    setProcessing('save')
    console.log("isData", isData)
    await handler({action:'update_business', ...isData})
    setProcessing(false)
    NotificationManager.info('Profile Saved');    
  }
  

  const ikHandler2= async (i)=>{   
    let data= await ikHandler(i)  
    console.log("ikHandler2", data) 
    if(data.image) {
      changeHandler(data.image.image_id, 'image_id')
      setData(prev=>({...prev, image:data.image}))
    }
    return data 
  }

  const changeHandler = (v, n) => {
    setData((prev)=>{
      let next={...prev}      
      next[n]=v      
      return next
    })
  }
  const changeMetaHandler = (v, n) => {
    setData((prev)=>{
      let next={...prev} 
      next.meta= next.meta ? next.meta : {}   
      next.meta[n]=v      
      return next
    })
  }
  const changeDetailsHandler = (v, n) => {
    setData((prev)=>{
      let next={...prev} 
      next.details= next.details ? next.details : {}   
      next.details[n]=v      
      return next
    })
  }

  

  props.navArgs.translucent=false 
  props.navArgs.noborder=false 
  return (
    <Layout {...props} showShopNav={false} showFooter={true} viewType="business_app"> 
      <div className={s.main+' mb-48'}>
        <div className={s.inner+' w-full mx-auto flex py-24 px-6 '} style={{maxWidth:'1024px'}}>
          <div className={'w-3/12'}>
            <AddImage type="user" image_id={d.image_id} image={d.image} user={user} product_id={d.id} handler={ikHandler2}/>
          </div>
          <div className={'w-9/12'}>
            <Input c={'mb-2'} l="Full Name" value={d.name} type="text" name="name" changeHandler={(v, e, n)=>changeHandler(v, n)} placeholder="Full Name"/>            
            <Input c={'mb-2'} l="Instagram url" value={d.meta.instagram_url} type="text" name="instagram_url" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="Instagram url"/>
            <Input c={'mb-2'} l="Website" value={d.meta.website} type="text" name="website" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="enter website"/>
            <div className={"mb-2"}>
              <Select label="Categories" name="categories" value={d.meta.categories} isMulti options={isCategoriesOptions} placeholder="select categories"  changeHandler={(v, n)=>{changeMetaHandler(v, n)}}/>
            </div>
            <div className={"mb-2"}>
              <Textarea c={'mb-2'} l="Description" value={d.details.desc} type="text" name="desc" changeHandler={(v, e, n)=>changeDetailsHandler(v, n)} placeholder="description"></Textarea>
            </div>
            <div className={'pt-12 pb-6 font-bold'}>Bank Details</div>
            <Input c={'mb-2'} l="Bank Name" value={d.meta.bank_name} type="text" name="bank_name" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="bank name"/>
            <Input c={'mb-2'} l="Account Number" value={d.meta.bank_account_no} type="text" name="bank_account_no" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="account no"/>
            <Input c={'mb-2'} l="IFSC code" value={d.meta.bank_ifsc_code} type="text" name="bank_ifsc_code" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="ifsc code"/>

            <div className={'pt-12 pb-6 font-bold'}>Company Details</div>
            <Input c={'mb-2'} l="Company Name" value={d.company_name} type="text" name="company_name" changeHandler={(v, e, n)=>changeHandler(v, n)} placeholder="Company Name"/>
            <Input c={'mb-2'} l="GST No." value={d.meta.gst_no} type="text" name="gst_no" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="gst no."/>
            <Input c={'mb-2'} l="CIN No." value={d.meta.cin_no} type="text" name="cin_no" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="cin no."/>
            <Input c={'mb-2'} l="image_id." value={d.image_id} type="text" name="image_id" changeHandler={(v, e, n)=>changeHandler(v, n)} placeholder="image_id"/>
          </div>           
        </div>
        <div className={s.actionbar+" fixed bottom-0 left-0 right-0 mb-4 mx-4 px-12 py-6 flex justify-center items-center"}>
            <Button className={"mr-4"} type="action2" to='/app/profile' color="white">Close</Button>
            {(d && d.id) && <Button isProcessing={isProcessing? true : false} type="action2" color={"yellow"} clickHandler={saveHandler}>Save</Button>}
        </div>
      </div>
      
    </Layout>    
  )
}
export default com
