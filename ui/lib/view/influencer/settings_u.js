import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {NotificationManager} from 'react-notifications'
import Link from 'next/link'
import Layout from './layout';
import Title from '../../title';
import Input from '../../input2';
import Select from '../../select';
import Textarea from '../../textarea';
import Button from '../../button';
import User from '../../blocks/com/user';
import Sm from '../../blocks/com/sm';
import s from './settings.module.scss';

import {AddImage} from '../_blocks/ui'

import {get_instagram} from './instagram'



import { FacebookProvider, Login, LoginButton, Initialize  } from 'react-facebook';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';


const new_change = (admin_action) =>{
  let change={fixed_fee_story:'', fixed_fee_reel :'', fixed_fee_video:'', fixed_fee_post:''}
  if(!admin_action) return change
  if(admin_action.status=='done') return change
  let {oldMeta, newMeta} = (admin_action && admin_action.meta) ? admin_action.meta : {}

  oldMeta={...{fixed_fee_story:0, fixed_fee_reel:0, fixed_fee_video:0, fixed_fee_post:0}, ...oldMeta}
  newMeta={...{fixed_fee_story:0, fixed_fee_reel:0, fixed_fee_video:0, fixed_fee_post:0}, ...newMeta}

  if(oldMeta.fixed_fee_story != newMeta.fixed_fee_story)  change.fixed_fee_story=newMeta.fixed_fee_story
  if(oldMeta.fixed_fee_reel != newMeta.fixed_fee_reel)  change.fixed_fee_reel=newMeta.fixed_fee_reel
  if(oldMeta.fixed_fee_video != newMeta.fixed_fee_video)  change.fixed_fee_video=newMeta.fixed_fee_video
  if(oldMeta.fixed_fee_post != newMeta.fixed_fee_post)  change.fixed_fee_post=newMeta.fixed_fee_post
  return change
}

const com = ({item,  handler, saveHandler, ikHandler, ...props}) => {
  //let user=props.user
  //console.log('user2', user)
 // console.log('profile2', item)
  //console.log('props', props)
  //const collabs_=123
  const {user} = useSelector((state) => state.pageData);
  
  const[isFacebookConnected, setFacebookConnected] = useState(false)
  const[isInstagramConnected, setInstagramConnected] = useState(false)
  const[isProcessing, setProcessing] = useState(false)

  
  const[isFixed, setFixed] = useState({})
  const[isData, setData] = useState({})
  const[isDetails, setDetails] = useState({})
  const[isLive, setLive] = useState({instagramUserId:'', follower_count:0, facebook_follower_count:0, twitter_follower_count:0, username:'', profile_picture_url:'', facebook_verified:false, verified:false})
  //console.log('isData', isData)

  let instagram_url
  let facebook_url


  const saveHandler2= async ()=>{    
    setProcessing('save')
    let d_=await handler({action:'update_influencer', data:isData, inFixed:isFixed, details:isDetails, influencer_id:item.id})
    process(d_)
    setProcessing(false)
    NotificationManager.info('Profile Saved');
  }
  let content_=(<div>Loading</div>)

  const process = (i) =>{
    if(i && i.email){
      console.log("i", i)
      i.meta = i.meta ? i.meta : {}
      
      let meta={  
        fixed_fee_story:'',
        fixed_fee_reel:'',
        fixed_fee_video:'',
        fixed_fee_post:'',         
        facebook_connected:'',
        facebook_id:'',
        facebook_name:'',
        instagram_connected:'',
        insights_video_id:'',
        insights_video_path_:''
      }      
      let data={
        email:i.email,
        name:i.name,
        init_fixed_fee:i.init_fixed_fee,
        profession:i.profession,
        //meta:i.meta ? i.meta : {instagramUserId:'',facebookUsername:'', facebookUserId:'', accessToken:''},
        meta:{...meta, ...i.meta},       
        desc:i.desc,
        admin_action:i.admin_action ? i.admin_action : {},
        details:i.details,
        image_id:i.image_id ? i.image_id : '',
        image:i.image? i.image: {} ,
      }
      //const data=cloneDeep(i)
      const details=cloneDeep(i.influencer2_details)
      //delete data.influencer2_details
      //data=await fb(data) 
      console.log("details", details)  
      setData(data) 
      setDetails(details)
      setFixed(data.meta)
      
      console.log("data data", data)
    }
  }

  useEffect(async () => { 
    process(item)
  }, [item]);

  const info=()=>{    
    return(
      <div className="mb-12">
        <div className="mb-4">Please follow below steps to improveme you collaboration match with the brands.</div>
        <ul className="list-disc list-inside mb-8">
          <li>Step 1: Enter all required information about you.</li>
          <li>Step 2: Connect to your facebook account</li>
          <li>Step 3: Connect to your instagram account</li>
        </ul>        
      </div>
    )
  }

  const Instagram = () =>{
    let {instagram, instagram_connected, instagram_status_message}=isData.meta ? isData.meta : {}
    if(!instagram) instagram={username:'', follower_count:'', verified:false }
    let {username, follower_count, verified}=instagram
    let connected=false
    if(username) {  
      connected=true    
      instagram_url="https://instagram.com/"+username
    }
    return(
      <div className={s.input_group+' w-full flex items-start mt-2 mb-4'}>
        <div className={s.input+' '+s.verified+' '+s.instagram+' flex-grow'}>          
          {!connected && <div className={s.value}><input placeholder="instagram_url" onChange={(e)=>detailsHandler("instagram_url", e)} value={isDetails.instagram_url}/></div>}
          {connected && <div className={s.value+' px-4 py-2'}>{instagram_url}</div>}
          <div className={s.label_area}>            
            {verified && <div className={s.status+' font-abhaya'}>Verified</div>}
          </div>
        </div> 
        {follower_count!=0 && 
        <div className={s.count+' '+s.has_value}>
          <div className={s.count_label}>Follower Count</div>
          <div className={s.count_value}>{follower_count}</div>
        </div>}
      </div>
    )
  }

  const Facebook = () =>{
    let {facebook_name, facebook_connected}=isData.meta    
    let connected=false
    let facebook_url
    if(facebook_name) {  
      connected=true          
      facebook_url='https://facebook.com/'+facebook_name
    }
    return(
      <div className={s.input_group+' w-full flex mt-4 mb-4'}>
        <div className={s.input+' '+s.verified+' '+s.instagram+' flex-grow'}>          
          {!connected && <div className={s.value}><input placeholder="facebook_url" onChange={(e)=>detailsHandler("facebook_url", e)} value={isDetails.facebook_url}/></div>}
          {connected && <div className={s.value+' px-4 py-2'}>{facebook_url}</div>}
          <div className={s.label_area}>           
            {isLive.facebook_verified!==false && <div className={s.status+' font-abhaya verified'}>Verified</div>}
          </div>
        </div> 
        {/*isLive.facebook_follower_count!=0 && <div className={s.count+' '+s.no_value}>
          <div className={s.count_label}>Follower Count</div>
          <div className={s.count_value}></div>
        </div>*/}
      </div>
    )
  }

       
  
  
  const connect_facebook=(facebook_connected)=>{
    const connectHandler=()=>{
      console.log("connect")
    }
    const handleResponse = async (data) => {
      setProcessing('facebook_connect')
      console.log("facebook data", data)    
      //localStorage.setItem('fb_user', JSON.stringify(data));  
      let d_={facebook_connected:true, facebook_id:data.profile.id, facebook_email:data.profile.email, facebook_name:data.profile.name, facebook_accessToken:data.tokenDetail.accessToken}
      console.log("d_", d_)    
      await handler({action:'update_meta', influencer_id:item.id, meta:{...isData.meta, ...d_}})
      //router.push('/app/shop/')
      setData(prev => {   
        let next={...prev, meta:{...prev.meta, ...d_}}   
        return next
      })/**/
      setProcessing(false)
    }
    const handleError = (error) => {
      console.log(error)
    }
    return(
      <div className="mb-6 border-b border-gray-900 border-opacity-10"> 
        <FacebookProvider appId2="434958935229217" appId="1194804817999553">
          <Login
            scope="email"
            onCompleted={handleResponse}
            onError={handleError}
          >
            {(props) => {
              let { loading, handleClick, error, data }=props
              //console.log("props", props)
              return (
                <div >
                  {!facebook_connected && 
                    <div>
                      <Button clickHandler={handleClick} type="action2" color="yellow">Connect to Facebook</Button>
                    </div>
                  }  
                  {facebook_connected && 
                    <div className={"flex items-center"}>
                      <div><div className="mr-4 bg-gray-900 bg-opacity-5 inline-block px-4 py-2 rounded-xl">Facebook : Connected</div></div>
                      <Button isProcessing={isProcessing=='facebook_connect' ? true : false} clickHandler={handleClick} type="action2" color="white">ReConnect again</Button>
                    </div>
                  }     
                </div>  
              )
            }}
          </Login>        
        </FacebookProvider>
        {facebook_connected && <Facebook/>}
      </div>
    )
  }

  const connect_instagram=({facebook_connected, instagram_connected, instagram_status_message})=>{
    const connectHandler=async ()=>{
      console.log("connect")
      setProcessing('instagram_connect')
      let data={...isData}
      data=await get_instagram(isData, setLive) 
      await handler({action:'update_meta', influencer_id:item.id, meta:data.meta})
      setData(data) 
      setProcessing(false)
    }
    return(
      <div className="">        
        {(facebook_connected && !instagram_connected && !instagram_status_message) && <Button clickHandler={connectHandler} type="action2" color="yellow">Get My Instagram Details</Button>} 
        {instagram_connected && 
          <div className="mt-1 flex items-center">            
            <div><div className="mr-4 bg-gray-900 bg-opacity-5 inline-block px-4 py-2 rounded-xl">Instagram : Connected</div></div>
            <Button isProcessing={isProcessing=='instagram_connect' ? true : false} clickHandler={connectHandler} type="action2" color="white">Refresh</Button>
          </div>
        } 
        {instagram_status_message && 
          <div className="mt-1">
            <div className="mb-4 opacity-50">Instagram : {instagram_status_message}</div>
            <Button isProcessing={isProcessing=='instagram_connect' ? true : false} clickHandler={connectHandler} type="action2" color="white">Check Again</Button>
          </div>
        } 
        {instagram_connected && <Instagram/>}
      </div>
    )
  }
  
  


  if( isData && isData.email){
    let {facebook_connected, instagram_connected, instagram_status_message}=isData.meta
    let connected_instagram_url=false
    let instagram_url
    if(isLive.username) {
      connected_instagram_url=true
      instagram_url="https://instagram.com/"+isLive.username
    }else{
      instagram_url="https://instagram.com/"+isLive.username
    }
    let facebook_url='https://facebook.com/'+isData.meta.facebook_name

    let change= new_change(isData.admin_action)
    
    console.log("isData", isData)
  }
  

  const dataHandler=(name, e )=>{
    setData({...isData, [name]:e.target.value})
  }
  const metaHandler=(name, e )=>{
    setData((prev)=>{
      let next={...prev}
      next.meta[name]=e.target.value
      return next    
    })
  }
  const fixedHandler=(name, e )=>{
    setFixed((prev)=>{
      let next={...prev}
      next[name]=e.target.value
      return next    
    })
  }
  const detailsHandler=(name, e)=>{
    setDetails(prev=>{     
      return {...prev, [name]:e.target.value}
    })
  }  
  props.navArgs.translucent=false 
  props.navArgs.noborder=false

  let d={
    name:'',
    image_id:'',
    image:{},
    email:'',
    id:'',
    details:{
      desc:''
    },
    meta:{
      facebook_connected:'',
      facebook_id:'',
      facebook_name:'',
      instagram_connected:'',
      insights_video_id:'',
      insights_video_path_:'',
      categories:{value:''},
      instagram_url:'',
      bank_name:'',
      bank_account_no:'',
      bank_ifsc_code:'',
      gst_no:'',
      cin_no:'',
      website:'',
      fixed_fee_story:'',
      fixed_fee_reel:'',
      fixed_fee_video:'',
      fixed_fee_post:'',
    },   
    admin_action:{},   
  } 
  d={...d, ...isData}
  let {facebook_connected, instagram_connected, instagram_status_message}=d.meta
  console.log("isData", isData)

  let ch= new_change(isData.admin_action)

  const PerformanceVideo=()=>{    
    let {insights_video_id, insights_video_path_=false} = (d && d.meta) ? d.meta : {}

    const ikHandler2= async (j)=>{      
      let ikd= await ikHandler(j)  
      console.log("ikHandler2", ikd)
      if(ikd && ikd.image && ikd.image.image_id) {
        let inData={insights_video_id:ikd.image.image_id, insights_video_path_:ikd.image.path_}
        let data = await handler({action:'upload_insights_video', inData})       
      }      
      return ikd 
    }
    
    let d_={image_id:'', image:{}}
    let play_button_=(<Button className={""} type="action2" color="white" to={insights_video_path_} target={"_blank"}><div className={"flex items-center"}><img className={"mr-2"} src={'/images/Play.svg'} /><span>Play Video</span></div></Button>)
    let upload_button_config= insights_video_id ?  {color:'', type:'text2'} : {color:'white', type:'action2'}
    let upload_button_text= insights_video_id ? 'Change Video' : 'Upload Video'
    let custom_button_=(<Button {...upload_button_config}><div className={"flex items-center"}><img className={"mr-2"} src={'/images/Export.svg'} /><span>{upload_button_text}</span></div></Button>)
   
    return(
      <div className={"flex items-center"}> 
        {(insights_video_id!==false && insights_video_path_!=false) && play_button_}  
        <AddImage custom_button={custom_button_} type="user" image_id={d_.image_id} image={d_.image} user={user} handler={ikHandler2}/>       
      </div>
    )
  }


  const ikHandler2= async (i)=>{   
    let data= await ikHandler(i)  
    console.log("ikHandler2", data) 
    if(data.image) {
      changeHandler(data.image.image_id, 'image_id')
      changeHandler(data.image, 'image')
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
    setDetails((prev)=>{
       let next={...prev, [n]:v}         
      return next
    })
  }
  const changeFixedHandler = (v, n) => {
    setFixed((prev)=>{
      let next={...prev, [n]:v}         
      return next
    })
  } 

  return (
    <Layout {...props} showShopNav={false} showFooter={true} viewType="business_app"> 
      <div className={s.main+' mb-8'}>
        <div className={s.inner+' w-full mx-auto flex py-24 px-6 '} style={{maxWidth:'1024px'}}>
          <div className={'w-3/12'}>
            <AddImage type="user" image_id={d.image_id} image={d.image} user={user} product_id={d.id} handler={ikHandler2}/>
            <div className={"text-sm mt-8 mr-8 opacity-75"}>{info()}  </div> 
          </div>
          <div className={'w-9/12'}>
            {content_}                
            <Input c={'mb-2'} l="Full Name" value={d.name} type="text" name="name" changeHandler={(v, e, n)=>changeHandler(v, n)} placeholder="Full Name"/>
            <Input c={'mb-2'} l="Profession" value={d.profession} type="text" name="profession" changeHandler={(v, e, n)=>changeHandler(v, n)} placeholder="Profession"/>
            <Input c={'mb-2'} l="Instagram url" value={d.meta.instagram_url} type="text" name="instagram_url" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="Instagram url"/>
            <div className={"mb-2"}>
              <Textarea c={'mb-2'} l="Description" value={isDetails.desc} type="text" name="desc" changeHandler={(v, e, n)=>changeDetailsHandler(v, n)} placeholder="description"></Textarea>
            </div> 
            <div className={'pt-12 pb-6 font-bold'}>Instagram &amp; Facebook Integration Details</div>
            <div className={s.outline+' '}>
              {connect_facebook(facebook_connected)}
              {connect_instagram({facebook_connected, instagram_connected, instagram_status_message})} 
            </div>             
            {/*<div className={'pt-12 pb-6 font-bold'}>Bank Details</div>
            <Input c={'mb-2'} l="Bank Name" value={d.meta.bank_name} type="text" name="bank_name" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="bank name"/>
            <Input c={'mb-2'} l="Account Number" value={d.meta.bank_account_no} type="text" name="bank_account_no" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="account no"/>
            <Input c={'mb-2'} l="IFSC code" value={d.meta.bank_ifsc_code} type="text" name="bank_ifsc_code" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="ifsc code"/>*/}

            <div className={'pt-12 pb-6 font-bold'}>Contact Details</div>
            <div className={'flex items-center  mb-4'}><span>email : </span> <div className={"rounded-full ml-4 px-4 py-1 bg-gray-900 bg-opacity-5 inline-block"}>{d.email}</div></div>
            <Input c={'mb-2'} l="GST No." value={d.meta.mobile} type="text" name="mobile" changeHandler={(v, e, n)=>changeMetaHandler(v, n)} placeholder="mobile"/>            

            <div className={'pt-12 pb-6 font-bold'}>Fixed fee Details</div>
            <Input c={'mb-2'} l="Story" value={isFixed.fixed_fee_story} type="text" name="fixed_fee_story" changeHandler={(v, e, n)=>changeFixedHandler(v, n)} placeholder="story"/>
            {ch.fixed_fee_story && <div className={s.change_value}>New value change {ch.fixed_fee_story} in review</div>}
            <Input c={'mb-2'} l="Reel" value={isFixed.fixed_fee_reel} type="text" name="fixed_fee_reel" changeHandler={(v, e, n)=>changeFixedHandler(v, n)} placeholder="reel"/>
            {ch.fixed_fee_reel && <div className={s.change_value}>New value change {ch.fixed_fee_reel} in review</div>}
            <Input c={'mb-2'} l="Video" value={isFixed.fixed_fee_video} type="text" name="fixed_fee_video" changeHandler={(v, e, n)=>changeFixedHandler(v, n)} placeholder="video"/>
            {ch.fixed_fee_video && <div className={s.change_value}>New value change {ch.fixed_fee_video} in review</div>}
            <Input c={'mb-2'} l="post" value={isFixed.fixed_fee_post} type="text" name="fixed_fee_post" changeHandler={(v, e, n)=>changeFixedHandler(v, n)} placeholder="post"/>
            {ch.fixed_fee_post && <div className={s.change_value}>New value change {ch.fixed_fee_post} in review</div>} 
            <div className={'pt-12 pb-6 font-bold'}>Insights Video Upload</div>
            <div className={s.outline+' '}>
              <PerformanceVideo/>
            </div>               
          </div>
        </div>
        
        <div className={s.actionbar+" fixed bottom-0 left-0 right-0 mb-4 mx-4 px-12 py-6 flex justify-center items-center"}>
            <Button className={"mr-4"} type="action2" to='/app/profile' color="white">Close</Button>
            <Button isProcessing={isProcessing? true : false} type="action2" color="yellow" clickHandler={saveHandler2}>Save</Button>
        </div>
      </div>
    </Layout> 
  )
}
export default com
