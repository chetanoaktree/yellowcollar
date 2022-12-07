import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from './layout';
import Title from '../../title';
import Input from '../../input';
import Button from '../../button';
import User from '../../blocks/com/user';
import Sm from '../../blocks/com/sm';
import s from './settings.module.scss';


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

const com = ({item,  handler, saveHandler, ...props}) => {
  let user=props.user
  //console.log('user2', user)
 // console.log('profile2', item)
  //console.log('props', props)
  //const collabs_=123
  
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




  const get_instagram_id = async (accessToken, data) => {
    console.log("fb input", data.meta) 

    let instagramUserId
    let facebookUserId
    let facebookUsername

    const fb = await axios({       
      url: "https://graph.facebook.com/v14.0/"+data.meta.facebook_id+"/accounts?fields=id,name,username,instagram_business_account&access_token=" + accessToken,
      method: "get",
    });
    console.log("fb details", fb.data)
    let fb_data
    if(fb_data=fb.data.data[0]){
      instagramUserId = fb_data.instagram_business_account.id;       
    }
    
    //console.log("instagramUserId", instagramUserId) 
    let meta=data.meta ? data.meta : {}
    if(instagramUserId){      
      meta={...{instagramUserId:''}, ...meta}     
      meta.instagramUserId=instagramUserId       
    }else{
     meta={...meta, instagram_connected:false, instagram_status:'busineess_account_not_exist', instagram_status_message:'Busineess Account Not Exist'}         
    }
    data.meta=meta
    return data
  }
  const get_instagram_details = async (accessToken, instagramUserId, data2)=>{       
    const { data } = await axios({
      //url: "https://graph.facebook.com/v14.0/me?fields=id,name&access_token=" + accessToken,
      //url: "https://graph.facebook.com/v14.0/17841449935442501?fields=business_discovery.username(immutly){followers_count,media_count}&access_token=" + accessToken,
      //url: "https://graph.facebook.com/v14.0/17841449935442501?fields=followers_count,media_count,username,profile_picture_url&access_token=" + accessToken,
      url: "https://graph.facebook.com/v14.0/"+instagramUserId+"?fields=followers_count,media_count,username,profile_picture_url&access_token=" + accessToken,
      method: "get",
    });
    console.log("data instagram", data)
    if(data && data.username){      
      setLive(prev => {
        let next= {...prev, follower_count:data.followers_count, username:data.username, profile_picture_url:data.profile_picture_url, facebook_verified:true, verified:true}
        data2.meta.instagram=next
        data2.meta.instagram_connected=true
        return next
      })
    }
    return data2
  } 

  const get_instagram = async (data) =>{  
  
    if(data.meta && data.meta.facebook_accessToken){
      const accessToken = data.meta.facebook_accessToken;
      //const userId = fb_user_.profile.id;
      
      /*const fb2 = await axios({       
        url: "https://graph.facebook.com/v14.0/me/accounts?fields=id,name,username,picture,instagram_business_account&access_token=" + accessToken,
        method: "get",
      });
      console.log("fb2", fb2.data)
      const fb2 = await axios({       
        url: "https://graph.facebook.com/v14.0/{user-id}/accounts?access_token=" + accessToken,
        //url: "https://graph.facebook.com/v14.0/oauth/client_code?client_id=1194804817999553&client_secret=cd8e036889b13ccc7013f7de5b37f215&redirect_uri=https://localhost:3000&access_token=" + accessToken,
        method: "get",
      });
      console.log("fb2", fb2.data)*/
      
      if(data.meta.instagramUserId!=''){
        data = await get_instagram_id(accessToken, data)            
      }
      if(data.meta.instagramUserId){
        data = await get_instagram_details(accessToken, data.meta.instagramUserId, data)  
      }
    }    
    return data
  } 

  const saveHandler2= async ()=>{
    setProcessing('save')
    let d=await handler({action:'update_influencer', data:isData, inFixed:isFixed, details:isDetails, influencer_id:item.id})
    process(d)
    setProcessing(false)
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
        instagram_connected:''
      }
      let data={
        email:i.email,
        name:i.name,
        init_fixed_fee:i.init_fixed_fee,
        profession:i.profession,
        //meta:i.meta ? i.meta : {instagramUserId:'',facebookUsername:'', facebookUserId:'', accessToken:''},
        meta:{...meta, ...i.meta},
        desc:i.desc,
        admin_action:i.admin_action ? i.admin_action : {}
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
  
  const connect_facebook=(facebook_connected)=>{
    const connectHandler=()=>{
      console.log("connect")
    }
    const handleResponse = async (data) => {
      setProcessing('facebook_connect')
      console.log("facebook data", data)    
      //localStorage.setItem('fb_user', JSON.stringify(data));  
      let d={facebook_connected:true, facebook_id:data.profile.id, facebook_email:data.profile.email, facebook_name:data.profile.name, facebook_accessToken:data.tokenDetail.accessToken}
      console.log("d", d)    
      await handler({action:'update_meta', influencer_id:item.id, meta:{...isData.meta, ...d}})
      //router.push('/app/shop/')
      setData(prev => {   
        let next={...prev, meta:{...prev.meta, ...d}}   
        return next
      })/**/
      setProcessing(false)
    }
    const handleError = (error) => {
      console.log(error)
    }
    return(
      <div className="mb-12"> 
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
                <div>
                  {!facebook_connected && 
                    <div>
                      <Button clickHandler={handleClick} type="action2" color="blue">Connect to Facebook</Button>
                    </div>
                  }  
                  {facebook_connected && 
                    <div>
                      <div className="mb-4">Facebook : Connected</div>
                      <Button isProcessing={isProcessing=='facebook_connect' ? true : false} clickHandler={handleClick} type="action2" color="white">ReConnect again</Button>
                    </div>
                  }     
                </div>  
              )
            }}
          </Login>        
        </FacebookProvider>
           
      </div>
    )
  }

  const connect_instagram=({facebook_connected, instagram_connected, instagram_status_message})=>{
    const connectHandler=async ()=>{
      console.log("connect")
      setProcessing('instagram_connect')
      let data={...isData}
      data=await get_instagram(isData) 
      await handler({action:'update_meta', influencer_id:item.id, meta:data.meta})
      setData(data) 
      setProcessing(false)
    }
    return(
      <div className="">        
        {(facebook_connected && !instagram_connected && !instagram_status_message) && <Button clickHandler={connectHandler} type="action2" color="blue">Get My Instagram Details</Button>} 
        {instagram_connected && 
          <div className="mt-4">
            <div className="mb-4">Instagram : Connected</div>
            <Button isProcessing={isProcessing=='instagram_connect' ? true : false} clickHandler={connectHandler} type="action2" color="white">Refresh</Button>
          </div>
        } 
        {instagram_status_message && 
          <div className="mt-4">
            <div className="mb-4">Instagram : {instagram_status_message}</div>
            <Button isProcessing={isProcessing=='instagram_connect' ? true : false} clickHandler={connectHandler} type="action2" color="white">Check Again</Button>
          </div>
        } 
      </div>
    )
  }
  
  const Instagram = () =>{
    let {instagram, instagram_connected, instagram_status_message}=isData.meta
    if(!instagram) instagram={username:'', follower_count:'', verified:false }
    let {username, follower_count, verified}=instagram
    let connected=false
    if(username) {  
      connected=true    
      instagram_url="https://instagram.com/"+username
    }
    return(
      <div className={s.input_group}>
        <div className={s.input+' '+s.verified+' '+s.instagram}>
          <div className={s.label_area}>
            <h6 className={s.label}>Instagram</h6>
            {verified && <div className={s.status+' font-abhaya'}>Verified</div>}
          </div>
          {!connected && <div className={s.value}><input placeholder="instagram_url" onChange={(e)=>detailsHandler("instagram_url", e)} value={isDetails.instagram_url}/></div>}
          {connected && <div className={s.value+' px-4 py-2'}>{instagram_url}</div>}
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
      <div className={s.input_group}>
        <div className={s.input+' '+s.verified+' '+s.instagram}>
          <div className={s.label_area}>
            <h6 className={s.label}>Facebook</h6>
            {isLive.facebook_verified!==false && <div className={s.status+' font-abhaya verified'}>Verified</div>}
          </div>
          {!connected && <div className={s.value}><input placeholder="facebook_url" onChange={(e)=>detailsHandler("facebook_url", e)} value={isDetails.facebook_url}/></div>}
          {connected && <div className={s.value+' px-4 py-2'}>{facebook_url}</div>}
        </div> 
        {/*isLive.facebook_follower_count!=0 && <div className={s.count+' '+s.no_value}>
          <div className={s.count_label}>Follower Count</div>
          <div className={s.count_value}></div>
        </div>*/}
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

    //let change= new_change(isData.admin_action)
    
    console.log("admin_action", isData)
    content_= (
      <div>  
      
      <div className={s.input}>
        <h6 className={s.label}>Your Fullname</h6>
        <div className={s.value}><input placeholder="company name" onChange={(e)=>dataHandler("name", e)} value={isData.name} /></div>
      </div> 
      <div className={s.input}>
        <h6 className={s.label}>Profession</h6>
        <div className={s.value}><input placeholder="profession" onChange={(e)=>dataHandler("profession", e)} value={isData.profession} /></div>
      </div> 
      {info()}   

      <div className={s.input+' '+s.bio}>
        <h6 className={s.label}>Bio</h6>
        <div className={s.value}><textarea placeholder="bio"  onChange={(e)=>detailsHandler("desc", e)} value={isDetails.desc}></textarea></div>
      </div>
      <div className="rounded-2xl px-10 py-8 mb-12" style={{backgroundColor:'#f2f2f2'}}>
        {connect_facebook(facebook_connected)}
        {connect_instagram({facebook_connected, instagram_connected, instagram_status_message})}
      </div>
      
        {/*
        <div className={s.input_group}>
          <div className={s.input+' '+s.verified+' '+s.instagram}>
            <div className={s.label_area}>
              <h6 className={s.label}>Instagram</h6>
              {isLive.verified && <div className={s.status+' font-abhaya'}>Verified</div>}
            </div>
            {!connected_instagram_url && <div className={s.value}><input placeholder="instagram_url" onChange={(e)=>detailsHandler("instagram_url", e)} value={isDetails.instagram_url}/></div>}
            {connected_instagram_url && <div className={s.value+' px-4 py-2'}>{instagram_url}</div>}
          </div> 
          {isLive.follower_count!=0 && 
          <div className={s.count+' '+s.has_value}>
            <div className={s.count_label}>Follower Count</div>
            <div className={s.count_value}>{isLive.follower_count}</div>
          </div>}
        </div>
        */}
        <Instagram/>
        <div className={s.input_group}>
          <div className={s.input+' '+s.verified+' '+s.instagram}>
            <div className={s.label_area}>
              <h6 className={s.label}>Facebook</h6>
              {isLive.facebook_verified!==false && <div className={s.status+' font-abhaya verified'}>Verified</div>}
            </div>
            {/*<div className={s.value}><input placeholder="facebook_url" onChange={(e)=>detailsHandler("facebook_url", e)} value={isDetails.facebook_url}/></div>*/}
            <div className={s.value+' px-4 py-2'}>{facebook_url}</div>
          </div> 
          {isLive.facebook_follower_count!=0 && <div className={s.count+' '+s.no_value}>
            <div className={s.count_label}>Follower Count</div>
            <div className={s.count_value}></div>
          </div>}
        </div>

        {/*<div className={s.input_group}>
          <div className={s.input+' '+s.verification_pending+' '+s.instagram}>
            <div className={s.label_area}>
              <h6 className={s.label}>Twitter</h6>
               <div className={s.status+' font-abhaya verified'}>Verification Pending</div>
            </div>
            <div className={s.value}><input placeholder="twitter_url" onChange={(e)=>detailsHandler("twitter_url", e)} value={isDetails.twitter_url}/></div>
          </div> 
          {isLive.twitter_follower_count!=0 && <div className={s.count+' '+s.has_value}>
            <div className={s.count_label}>Follower Count</div>
            <div className={s.count_value}></div>
          </div>}
        </div>*/}

        {/*<div className={s.input}>
          <div className={s.label_area}>
            <h6 className={s.label}>Initial Fixed Fee</h6>                    
          </div>
          <div className={s.value}><input placeholder="fixed fee" onChange={(e)=>dataHandler("init_fixed_fee", e)} value={isData.meta.init_fixed_fee} /></div>
        </div>*/}
        {/*<div className="rounded-2xl px-10 py-8 mb-12" style={{backgroundColor:'#f2f2f2'}}>
          <h5 className={s.label}>Initial Fixed Fee</h5>
          <div className={s.input}>
            <div className={s.label_area}>
              <h6 className={s.label}>Story</h6>                    
            </div>
            <div className={s.value}><input placeholder="Story fixed fee" onChange={(e)=>fixedHandler("fixed_fee_story", e)} value={isFixed.fixed_fee_story} /></div>
            {change.fixed_fee_story && <div className={s.change_value}>New value change {change.fixed_fee_story} in review</div>}
          </div>
          <div className={s.input}>
            <div className={s.label_area}>
              <h6 className={s.label}>Reel</h6>                    
            </div>
            <div className={s.value}><input placeholder="Reel fixed fee" onChange={(e)=>fixedHandler("fixed_fee_reel", e)} value={isFixed.fixed_fee_reel} /></div>
            {change.fixed_fee_reel && <div className={s.change_value}>New value change {change.fixed_fee_reel} in review</div>}
          </div>
          <div className={s.input}>
            <div className={s.label_area}>
              <h6 className={s.label}>Video</h6>                    
            </div>
            <div className={s.value}><input placeholder="Video fixed fee" onChange={(e)=>fixedHandler("fixed_fee_video", e)} value={isFixed.fixed_fee_video} /></div>
            {change.fixed_fee_video && <div className={s.change_value}>New value change {change.fixed_fee_video} in review</div>}
          </div>
          <div className={s.input}>
            <div className={s.label_area}>
              <h6 className={s.label}>Post</h6>                    
            </div>
            <div className={s.value}><input placeholder="Post fixed fee" onChange={(e)=>fixedHandler("fixed_fee_post", e)} value={isFixed.fixed_fee_post} /></div>
            {change.fixed_fee_post && <div className={s.change_value}>New value change {change.fixed_fee_post} in review</div>}
          </div>
        </div>*/}
        
      </div>
    )
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
  return (
    <Layout {...props}> 
      <div className={s.main}>
        <div className={s.inner+' w-full'}>

          <div className={s.head+' flex flex-wrap items-start md:flex-nowrap py-12'}>
            <div className={s.left+' w-48'}>
              <div className={s.user}><User {...{...user, profile_pic_full:isLive.profile_picture_url}} size="lg"/></div>            
            </div>
            <div className={s.right+' w-full md:w-auto flex-grow pl-12'}>              
              {content_}              
              <div className="flex justify-center pt-12 mb-24">
                <Button isProcessing={isProcessing=='save' ? true : false} type="action2" clickHandler={saveHandler2}>Save</Button>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </Layout>    
  )
}
export default com
