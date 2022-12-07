import React, { useState } from "react";

import Link from 'next/link'
import Title from '../../title'
import Button from '../../button'
import Input from '../../input2'
import getShortUrl from '../../get/short_url'
import {get_goal as GetGoal} from '../../get/collab'
import {collab_levels} from '../../get/constants'

import AddImage from './add_images'

import {tag, Loading} from '../../view/_blocks/ui'
import s from './collab_event.module.scss'
import Moment from 'moment'
import _ from 'lodash'

const check_valid = (userType, i, item) => {
   if(i.type=="request"){
    if(item.status=="requested"){
      if(userType=="business"){
        return false
      }
    }else{
      return false
    }    
  }  
  if(userType=="business"){
    if(i.type=="performance_video"){
      return false
    } 
  }  
  return true
}

const com = ({index, item, userType, handler, ikHandler, user, influencerAcceptHandler, influencerRejectHandler, paidHandler, initPaymentPaidHandler, priceHandler, performanceHandler, i}) => {
  item.influencer=item.influencer2
  let init_fixed_fee=item.influencer?.init_fixed_fee ? item.influencer?.init_fixed_fee : 0
  let treshold_amount=item.treshold_amount
  let {meta}=i

  const [isP, setP]=useState(false)
  const [isData, setData]=useState({...item})
  //console.log("user", user)

  if(!check_valid(userType, i, item)) return(<></>)
  

  const inputHandler = (v, n) => {
    setData(prev => {
      return {...prev, [n]:v}
    })
  }
  const metaHandler = (v, n) => {
    setData(prev => {
      let next = {...prev}
      next.meta = next.meta ? next.meta : {}
      next.meta[n]=v
      return next
    })
  }
  const shareUrlHandler = (v, n) => {
    setData(prev => {
      let next = {...prev}
      next.share_url = next.share_url ? next.share_url : {}
      next.share_url[n]=v
      return next
    })
  }
  //if(item.status!="requested" && (i.type=="request" && userType=="business")) return(<></>)

  const Performance=()=>{
    return (<div className={s.action_area}><Button type="action" color="blue" clickHandler={(e) => performanceHandler(i, item, e)}>Performance?</Button></div>)
  }
  const FinalPerformance=()=>{
    return (<div className={s.action_area}><Button type="action" color="blue" clickHandler={(e) => performanceHandler(i, item, e)}>Final Performance Insight</Button></div>)
  }

  const InfluencerSign=()=>{
    return(
      <div className={"mt-8"}>        
        <div className={s.regards}>Regards,</div>
        <div className={s.from}>{item.influencer?.name}</div>        
      </div>
    )
  }
  const BusinessSign=()=>{
    item.business.company_name= item.business.company_name ? item.business.company_name : item.business.name
    return(
      <div  className={"mt-8"}>        
        <div className={s.regards}>Best,  </div>
        <div className={s.from}>Team {item.business.company_name}</div>        
      </div>
    )
  }
  const BusinessHead=()=>{
    return(
      <div className={s.hi}>Hi {item.business.name} Team, </div>
    )
  }
  const InfluencerHead=()=>{
    return(
      <div className={s.hi}>Hi {item.influencer?.name}, </div>
    )
  }

  
 //console.log("collab--", item)
  const Request1=()=>{
    return(
      <div>
        <BusinessHead/>
        <p>My name is {item.influencer.name}, I am a {item.influencer.profession} with over 60k followers on iInstagram. </p>
        <p>I have recently tried your product, and would love to collaborate with you to help promote your product.</p>
        <p>Please let me know, if this is something that interests you.  </p>
        <InfluencerSign />   
        <p></p>
        {item.status=="accepted" && <p>Invitation to collaborate <span className={s.status}>accepted.</span></p>}
      </div>
    )
  }
  const Request=()=>{
    return(
      <div>
        <p>Request pending.</p> 
      </div>
    )
  }
  


  const BusinessAccept=()=>{    
    return(
      <div>
        <InfluencerHead/>        
        <p>Thanks for getting in touch, we really like your profile and recognise you as a good match for our brand. We would love to collaborate with you. </p>
        <p>Details of this collaboration would follow shortly after this message.</p>        
        <BusinessSign/>
      </div>
    )
  }
  const BusinessAccept_Backup=()=>{    
    return(
      <div>
        <InfluencerHead/>
         {/*<p>Thanks for getting in touch, we would love to collaborate with you. </p>
        <p>We would like to begin with a single post collaboration for the upcoming week, would that be something that is possible?</p>*/}
        <p>We would wish to collaborate with you Sharing across the final details.</p>        
        <BusinessSign/>
      </div>
    )
  }
  const Collaborate=()=>{ 
    let goal=''
    let goalA=[] 
    goal=GetGoal(item) 
    /*
    if(i.meta && i.meta.goal) {   
      
      if(i.meta.goal=="both") {
        goal="Awareness & Sales" 
      }else {
        goal=i.meta.goal
      }
    }*/
    const action_=()=>{
      return(
        <div className={s.details_action}>         
          <Button type="action2" color="light_gray" clickHandler={influencerRejectHandler}>Reject</Button>
          <Button type="action2" color="blue" clickHandler={influencerAcceptHandler}>Accept</Button>
        </div>
      )
    }    
    return(
      <div>
        <div className={"flex items-center mb-4"}><img className={"mr-2"} src="/images/Order_light.svg"/>Collaboration Details</div>
        <div className={"ml-8"}>
          <div>Initial Payment: Rs {item.meta.base}</div>
          <div>Objective: {goal}</div>
          {/*<div>Post Type: {i.meta.post_type}</div>*/}
          <div>Requirement: {i.meta.requirement}</div>          
          {(item.status=="business_accepted" && userType=="influencer") && <div>Do you wish to accept:</div>} 
          {(item.status=="collaborate" && userType=="influencer") && action_()} 
        </div>           
      </div>
    )
  }
  const InfluencerAccept=()=>{    
    return(
      <div>
        <BusinessHead/>
        <p>I accept your collaboration.</p>    
        <InfluencerSign />          
      </div>
    )
  }
  const InfluencerReject=()=>{
    return(
      <div>
        <BusinessHead/>
        <p>I reject your collaboration.</p>       
        <InfluencerSign />     
      </div>
    )
  }
  const InitPayment=()=>{    
    return(
      <div>          
        <div className={"flex items-center mb-4"}><img className={"mr-2"} src="/images/Order_light.svg"/>Payment Details</div>
        <div className={"ml-8"}>       
          <p>Initial Payable Amount - Rs {item.meta.base}</p>
          {userType=="business" && 
          <div>
            <p>Platform fee - Rs {item.init_platform_fee_}</p>
            <p>Total - Rs {item.total_init_payment_}</p>
          </div>
          }
          {(userType=="business" && item.status=="init_payment") && <div  className={s.action_area}>
            <Button type="action" color="blue" clickHandler={(e) => initPaymentPaidHandler()}>Make Payment</Button>
          </div> }                  
        </div>
      </div>
    )
  }
   const InitPaymentPaid=()=>{
    return(
      <div> 
        <div className={s.payment_status+" flex items-center"}><img className={"mr-2"} src="/images/Check_ring_light.svg" />Inital Payment Done</div> 
        <div className={"ml-8 flex flex-col items-start mt-4"}>       
          <p>Rs {item.init_fixed_fee}</p>                          
        </div>                            
      </div>
    )
  }
  const InfluencerMessage=()=>{
    return(
      <div>
        <BusinessHead/>
        <p>{i.content}</p>
        <InfluencerSign />      
      </div>
    )
  }
  const BusinessMessage=()=>{
    return(
      <div>
        <InfluencerHead/>
        <p>{i.content}</p>
        <BusinessSign/> 
      </div>
    )
  }  
  const shareLink=()=>{
    let {share_url} = isData
    let {product_url, short_code} = share_url ? share_url :{}
    let short_url_=getShortUrl(short_code)
    let level=collab_levels[item.status]
    let max_level=collab_levels['live']
   

    const shortUrlH=(v, e, n)=>{
      console.log("Short_url", v)
      shareUrlHandler(v, n)
    }
    const updateH= async()=>{ 
      setP("update_short_url")     
      let data=await handler({action:'update_short_url', collab_id:item.id, inData:{product_url}})
      if(data.short_code) shareUrlHandler(data.short_code, 'short_code')
      console.log("update_short_url", data)
      setP(false)  
    }

    let b_content_ = ''
    let link_=(<div className={'mb-4 ml-8'}><Link href={short_url_} ><a  target="_blank">{tag({label:short_url_, color:'blue'})}</a></Link></div>)
    if(level<max_level){
      b_content_=(<div className={'ml-8'} style={{minWidth:'400px', maxWidth:'100%'}}>
        <Input  className={"mb-4"} name={'product_url'} value={product_url} changeHandler={shortUrlH} placeholder={"Enter product url"}/>
        <Button className={"mb-4"} isProcessing={isP=='update_short_url' ? true : false} type={'action2'} clickHandler={updateH} >Update</Button>
      </div>)
    } 

    let content_
    if(userType=="business"){
      content_=(
        <div>
          <div className={"mb-4"}>Share Product Url</div>
          {short_code && link_}
          {b_content_}
        </div>
      )
    }else{
      content_=(
        <div>
          <div className={"mb-4"}>Product Url for promotion</div>         
          {short_code && link_}
        </div>
      )
    }
    return content_
  }    

  const Live=()=>{   
    return(
      <div>        
        <div className={s.status_area}>Promotion is now <span className={s.status}>{i.type}</span>!</div>       
        {item.status=="live" && <Performance/>}
      </div>
    )
  }
  const PerformanceVideo=()=>{    
    let {performance_video_id, performance_video=false} = item.meta
    let level=collab_levels[item.status]
    let max_level=collab_levels['completed']
    const uploadH =async () =>{
      let data= await handler({action:'upload_performance_video', event_id:i.id, performance_video_id:'hjsdfnmfjkfd78'})
      console.log("Performance Video", data)
    }
    const ikHandler2= async (j)=>{ 
     
      let ikd= await ikHandler(j)  
      console.log("ikHandler2", ikd)
      if(ikd && ikd.image && ikd.image.image_id) {
        let inData={performance_video_id:ikd.image.image_id, performance_video_path_:ikd.image.path_}
        let data = await handler({action:'upload_performance_video', collab_id:item.id, event_id:i.id, inData})       
      }
      
      return ikd 
    }
    
    let d={image_id:'', image:{}}
    let play_button_=(<Button className={"mb-4"} type="action2" color="white" to={performance_video.path_} target={"_blank"}><div className={"flex items-center"}><img className={"mr-2"} src={'/images/Play.svg'} /><span>Play Video</span></div></Button>)
    let upload_button_config= performance_video_id ?  {color:'', type:'text2'} : {color:'white', type:'action2'}
    let upload_button_text= performance_video_id ? 'Change Video' : 'Upload Video'
    let custom_button_=(<Button {...upload_button_config}><div className={"flex items-center"}><img className={"mr-2"} src={'/images/Export.svg'} /><span>{upload_button_text}</span></div></Button>)
   
    return(
      <div>        
        <div className={"mb-4"}>Performance Video </div>
        {(performance_video_id!==false && performance_video!=false) && play_button_}  
        {(level < max_level) && <AddImage custom_button={custom_button_} type="user" image_id={d.image_id} image={d.image} user={user} handler={ikHandler2}/>  }        
      </div>
    )
  }
  const Amount=()=>{
    const breakdown= () =>{

    }
    return(
      <div>
        <p>Total Payable Amount - Rs {i.content}</p>
        <div className={s.action_area}><Button type="action" color="blue" clickHandler={(e) => priceHandler(i, item, e)}>Check Breakdown</Button></div>   
        {i.meta.isPaid && <div className={s.status_area}>Payment <span className={s.status}>Completed</span>!</div>}   
      </div>
    )
  }
  const Completed=()=>{
    return(
      <div>        
        <div>Promotion <span className={s.status}>{i.type}</span>! Check results now.</div>  
        {(item.status=="completed" || item.status=="paid") && <FinalPerformance/>}       
      </div>
    )
  }
  const PaymentDetails=()=>{
    return(
      <div>        
        <div className={"flex items-center mb-4"}><img className={"mr-2"} src="/images/Order_light.svg"/>Payment Details</div>
        <div className={"ml-8 flex flex-col items-start"}>       
          <p>Balance Amount - Rs {item.balance_fee}</p>
          {userType=="business" && <p>Platform Fee - Rs {item.platform_fee}</p>}
          {userType=="business" && <p>Total Balance - Rs {item.total_balance_fee}</p>}
          {(userType=="business" && item.status=="completed") && <div  className={s.action_area+' ml-4'}><Button type="action" clickHandler={(e) => paidHandler()}>Make Final Payment</Button></div> }                  
        </div>             
      </div>
    )
  }
  const Paid=()=>{
    return(
      <div>        
        <div className={s.payment_status+" flex items-center"}><img className={"mr-2"} src="/images/Check_ring_light.svg" />Final Payment Done</div>  
        <div className={"ml-8 flex flex-col items-start mt-4"}>               
          <p>Rs {item.variable}</p>    
          <div className={s.action_area}><Button type="action" color="blue" clickHandler={(e) => priceHandler(i, item, e)}>Check Breakdown</Button></div>                                 
        </div>         
      </div>
    )
  }

  let date=Moment(i.created_at).format('MMM Do YYYY, h:mm:ss a');

  //var jun = Moment(i.created_at);
  //jun.tz("2013-11-18 11:55", "Asia/Taipei")
  //jun.tz('America/Los_Angeles').format('ha z');
  //date = Moment(i.created_at).format('MMMM Do YYYY, h:mm:ss a');
  //date = Moment(i.created_at, "Asia/Tokyo").format('MMMM Do YYYY, h:mm:ss a');
  //console.log("DATE", jun)
  //let date=''
  let c_=s[i.type];
  let position_left=s.left
  let position_right=s.right
  if(userType=='business'){
    position_left=s.right
    position_right=s.left
  }

  if(i.type=='request'){
    c_+=' '+position_right
  }else if(i.type=='influencer_accept'){
    c_+=' '+position_right
  }else if(i.type=='influencer_reject'){
    c_+=' '+position_right
  }else if(i.type=='init_payment'){
    c_+=' '+position_right
  }else if(i.type=='init_payment_paid'){
    c_+=' '+position_left
  }else if(i.type=='business_accept'){
    c_+=' '+position_left   
  }else if(i.type=='collaborate'){
    c_+=' '+position_left    
  }else if(i.type=='influencer_message'){
    c_+=' '+position_right
  }else if(i.type=='business_message'){
    c_+=' '+position_left
  }else if(i.type=='share_link'){
    c_+=' '+position_left
  }else if(i.type=='live'){
    c_+=' '+position_right
  }else if(i.type=='performance_video'){
    c_+=' '+position_right
  }else if(i.type=='completed'){
    c_+=' '+position_right
  }else if(i.type=='payment_details'){
    c_+=' '+position_right
  }else if(i.type=='amount'){
    c_+=' '+position_left
  }else if(i.type=='paid'){
    c_+=' '+position_left
  }
  
  return(
    <div className={s.event+'  animate__animated animate__fadeIn '+c_} key={index}>
      <div className={s.event_inner} >
        <div>
          <div>
          {/*i.id*/}        
          {i.type=="request" && <Request></Request>}
          {i.type=="influencer_accept"  && <InfluencerAccept ></InfluencerAccept>}
          {i.type=="influencer_reject"  && <InfluencerReject ></InfluencerReject>}
          {i.type=="init_payment"  && <InitPayment ></InitPayment>}
          {i.type=="init_payment_paid"  && <InitPaymentPaid ></InitPaymentPaid>}      
          {i.type=="collaborate" && <Collaborate ></Collaborate>}    
          {i.type=="business_accept" && <BusinessAccept ></BusinessAccept>}
          {i.type=="influencer_message" && <InfluencerMessage ></InfluencerMessage>}
          {i.type=="share_link" && shareLink()}
          {i.type=="live" && <Live></Live>}
          {i.type=="performance_video" && <PerformanceVideo></PerformanceVideo>}
          {i.type=="business_message" && <BusinessMessage ></BusinessMessage>}            
          {i.type=="completed" && <Completed ></Completed>}
          {i.type=="payment_details" && <PaymentDetails ></PaymentDetails>}
          {i.type=="amount"  && <Amount ></Amount>}
          {i.type=="paid"  && <Paid ></Paid>}
          </div>
          <div className={s.date}>{date}</div>
        </div>        
      </div>
    </div>
  )
}
export default com