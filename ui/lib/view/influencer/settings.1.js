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

const com = ({item,  handler, saveHandler, ...props}) => {
  let user=props.user
  //console.log('user2', user)
 // console.log('profile2', item)
  //console.log('props', props)
  //const collabs_=123

  const[isFacebookConnected, setFacebookConnected] = useState(false)
  const[isProcessing, setProcessing] = useState(false)
  const[isData, setData] = useState({})
  const[isDetails, setDetails] = useState({})
  const[isLive, setLive] = useState({instagramUserId:'', follower_count:0, username:'', profile_picture_url:'', verified:false})
  //console.log('isData', isData)

  let instagram_url
  let facebook_url


  const get_instagram_id = async (accessToken, data) => {

    let instagramUserId
    let facebookUserId
    let facebookUsername

    const fb = await axios({       
      url: "https://graph.facebook.com/v14.0/me/accounts?fields=id,name,username,instagram_business_account&access_token=" + accessToken,
      method: "get",
    });
    console.log("fb details", fb.data)
    let fb_data
    if(fb_data=fb.data.data[0]){
      instagramUserId = fb_data.instagram_business_account.id; 
      facebookUserId = fb_data.id;
      facebookUsername = fb_data.username;
    }
    
    //console.log("instagramUserId", instagramUserId) 
    if(instagramUserId){
      //console.log("inst data", data)
      let meta=data.meta ? data.meta : {}
      meta={...{instagramUserId:'', facebookUserId:'', facebookUsername:''}, ...meta}
      //console.log("inst meta", meta)
      meta.instagramUserId=instagramUserId      
      meta.facebookUserId=facebookUserId  
      meta.facebookUsername=facebookUsername      
      data={...data, meta:meta}            
    }
    return data
  }
  const get_instagram_details =async (accessToken, instagramUserId)=>{    
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
        return {...prev, follower_count:data.followers_count, username:data.username, profile_picture_url:data.profile_picture_url, verified:true}
      })
    }
  } 

  const fb = async (data) =>{    
    /*let fb_user_={}
    let fb_user=localStorage.getItem('fb_user');
    if(typeof fb_user==='object'){
      fb_user_= JSON.parse(fb_user)
      //console.log("fb_user", JSON.parse(fb_user))
    }*/
    //console.log("profile", fb_user_)
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
        data=get_instagram_id(accessToken, data)          
      }
      await get_instagram_details(accessToken, data.meta.instagramUserId)       
      
    }    
    return data
  } 

  const saveHandler2= async ()=>{
    setProcessing(true)
    await handler({action:'update_influencer', data:isData, details:isDetails, influencer_id:item.id})
    setProcessing(false)
  }
  let content_=(<div>Loading</div>)

  useEffect(async () => { 
    if(item && item.email){
      console.log("item", item)
      let data={
        email:item.email,
        name:item.name,
        init_fixed_fee:item.init_fixed_fee,
        profession:item.profession,
        //meta:item.meta ? item.meta : {instagramUserId:'',facebookUsername:'', facebookUserId:'', accessToken:''},
        meta:item.meta ? item.meta : {},
        desc:item.desc
      }
      //const data=cloneDeep(item)
      const details=cloneDeep(item.influencer2_details)
      //delete data.influencer2_details
      //data=await fb(data) 
      console.log("data effect", data)  
      setData(data) 
      setDetails(details)
      
      console.log("data data", data)
    }
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
  const connect_instagram=(facebook_connected)=>{
    const connectHandler=()=>{
      console.log("connect")
      data={...isData}
      data=await fb(isData) 
    }
    return(
      <div className="mb-12">
        {facebook_connected && <Button clickHandler={connectHandler} type="action2" color="blue">Get My Instagram Details</Button>}  
      </div>
    )
  }
  const connect_facebook=(facebook_connected)=>{
    const connectHandler=()=>{
      console.log("connect")
    }
    const handleResponse = async (data) => {
      console.log(data)    
      //localStorage.setItem('fb_user', JSON.stringify(data));  
      let d={facebook_connected:true, facebook_email:data.profile.email, facebook_name:data.profile.name, facebook_accessToken:data.tokenDetail.accessToken}
      console.log("d", d)    
      await handler({action:'connect_facebook', influencer_id:item.id, meta:d})
      //router.push('/app/shop/')
      setData(prev => {   
        let next={...prev, meta:{...prev.meta, ...d}}   
        return next
      })/**/
    }
    const handleError = (error) => {
      console.log(error)
    }
    return(
      <div className="mb-12"> 
        {!facebook_connected && <FacebookProvider appId2="434958935229217" appId="1194804817999553">
          <Login
            scope="email"
            onCompleted={handleResponse}
            onError={handleError}
          >
            {(props) => {
              let { loading, handleClick, error, data }=props
              //console.log("props", props)
              return (
                <Button clickHandler={handleClick} type="action2" color="blue">Connect to Facebook</Button>    
              )
            }}
          </Login>        
        </FacebookProvider>}
        {facebook_connected && <div>Facebook is Connected</div>}        
      </div>
    )
  }
  
  
  if( isData && isData.email){
    let {facebook_connected}=isData.meta
    let instagram_url="https://instagram.com/"+isLive.username
    let facebook_url='https://facebook.com/'+isData.meta.facebookUsername

    

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

      {connect_facebook(facebook_connected)}
      {connect_instagram(facebook_connected)}
      

      <div className={s.input_group}>
          <div className={s.input+' '+s.verified+' '+s.instagram}>
            <div className={s.label_area}>
              <h6 className={s.label}>Instagram</h6>
              {isLive.verified && <div className={s.status+' font-abhaya'}>Verified</div>}
            </div>
            {/*<div className={s.value}><input placeholder="instagram_url" onChange={(e)=>detailsHandler("instagram_url", e)} value={isDetails.instagram_url}/></div>*/}
            <div className={s.value+' px-4 py-2'}>{instagram_url}</div>
          </div> 
          <div className={s.count+' '+s.has_value}>
            <div className={s.count_label}>Follower Count</div>
            <div className={s.count_value}>{isLive.follower_count}</div>
          </div>
        </div>

        <div className={s.input_group}>
          <div className={s.input+' '+s.verified+' '+s.instagram}>
            <div className={s.label_area}>
              <h6 className={s.label}>Facebook</h6>
              <div className={s.status+' font-abhaya verified'}>Verified</div>
            </div>
            {/*<div className={s.value}><input placeholder="facebook_url" onChange={(e)=>detailsHandler("facebook_url", e)} value={isDetails.facebook_url}/></div>*/}
            <div className={s.value+' px-4 py-2'}>{facebook_url}</div>
          </div> 
          <div className={s.count+' '+s.no_value}>
            <div className={s.count_label}>Follower Count</div>
            <div className={s.count_value}>Unknown</div>
          </div>
        </div>

        <div className={s.input_group}>
          <div className={s.input+' '+s.verification_pending+' '+s.instagram}>
            <div className={s.label_area}>
              <h6 className={s.label}>Twitter</h6>
               <div className={s.status+' font-abhaya verified'}>Verification Pending</div>
            </div>
            <div className={s.value}><input placeholder="twitter_url" onChange={(e)=>detailsHandler("twitter_url", e)} value={isDetails.twitter_url}/></div>
          </div> 
          <div className={s.count+' '+s.has_value}>
            <div className={s.count_label}>Follower Count</div>
            <div className={s.count_value}>5k</div>
          </div>
        </div>

        <div className={s.input}>
          <div className={s.label_area}>
            <h6 className={s.label}>Initial Fixed Fee</h6>                    
          </div>
          <div className={s.value}><input placeholder="fixed fee" onChange={(e)=>dataHandler("init_fixed_fee", e)} value={isData.init_fixed_fee} /></div>
        </div>
      </div>
    )
  }
  

  const dataHandler=(name, e )=>{
    setData({...isData, [name]:e.target.value})
  }
  const detailsHandler=(name, e)=>{
    setDetails({...isDetails, [name]:e.target.value})
  }  
  
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
                <Button isProcessing={isProcessing} type="action2" clickHandler={saveHandler2}>Save</Button>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </Layout>    
  )
}
export default com
