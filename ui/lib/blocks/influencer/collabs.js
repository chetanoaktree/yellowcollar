import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Title from '../../title';
import Button from '../../button';
import Performance from '../../blocks/com/performance';
import s from './collabs.module.scss';
import Moment from 'moment';
import { useRouter } from 'next/router';



const com = ({showHeading=true, items, item, user, refreshHandler, rejectHandler, acceptHandler, collabAgainHandler, performanceHandler,...props}) => {
  if(!items) return (<div></div>)
  //console.log("user2", user)
  const myRef = useRef(null)
  const [isMessage, setMessage]= useState("")
  const [isPerformance, setPerformance]= useState(false)
  const router = useRouter(); 
  
  let collabs_
  let collab_
  let accept_
  console.log("items", items)
  const acceptHandler2 = async (i) => {
    console.log("i", i)
    await acceptHandler({action:'influencer_accept', collab_id:i.id, influencer_id:user.id})
    refreshHandler()
  }
  const rejectHandler2 = async (i) => {
    console.log("reject", i)
    await rejectHandler({action:'influencer_reject', collab_id:i.id, influencer_id:user.id})
    refreshHandler()
  }
  
  const collabAgainHandler2 = async (i) => {
    console.log("collab_again", i)
    let collab=await collabAgainHandler({action:'collab_again', collab_id:i.id, product_id:i.product_id, influencer_id:i.influencer_id,  business_id:user.id})
    router.push({
        pathname: '/app/collab/'+collab.id,         
    });  
  }
  const performanceHandler2 = (collab) => {
    console.log("performance", collab)
    setPerformance(true)
    //performanceHandler({action:'performance', collab_id:i.id, business_id:user.id})
  } 
  if(items){
    collabs_=items.map((i, index)=>{
      i.influencer=i.influencer2
      let actions_
      console.log("indicator", i)
      if(i.status=="requested"){
        actions_=(
          <>
            <div>Collaboration Request Sent.</div>
          </>
        )
      }else if(i.status=="business_accepted"){
        actions_=(
          <>
            <Button type="action2" color="black" className="mr-2" clickHandler={()=>rejectHandler2(i)}>Reject</Button>
            <Button type="action2" clickHandler={()=>acceptHandler2(i)}>Accept</Button>
          </>
        )
      }else if(i.status=="influencer_accepted"){
        actions_=(
          <>
            <div>Collaboration Request Accepted.</div>
          </>
        )
      }else if(i.status=="paid"){
        actions_=(
          <>            
            <Button type="action2" clickHandler={()=>collabAgainHandler2(i)}>Collaborate Again?</Button>
          </>
        )
      }else if(i.status=="live"){
        actions_=(
          <>            
            <Button type="action2" color="white" clickHandler={()=>performanceHandler2(i)}>Check Performance</Button>
          </>
        )
      }
      

      return (
        <div className={s.item_area} key={index}>
          <div className={s.item}>
            <Link href={"/app/collab/"+i.id}>
              <div className={s.view} ><img src="/images/Arrow_right_light.svg"/></div>
            </Link>
            <div className={s.user_area}>
              <Link className={s.image_area} href="https://www.instagram.com/yellowcollarclub">
                <a className={s.image_area}  target="_blank">
                  <img className={s.image} src={"/db_images/"+i.business.profile_pic}/>
                  {i.status == "requested" && <div className={s.indicator}></div>}
                  <div className={s.instagram}><img src={"/images/Instagram.svg"}/></div>
                </a>
              </Link>
              <div>
                <div className={s.name}>{i.business.name}</div>
                <div className={s.product} >{i.product.title}</div>
              </div>
            </div>            
            <div className={s.last_collab_area}>
              <div className={s.last_collab}>Collaborated before: {Moment(i.product.previouslyCollaboratedOn).format('DD.MM.YYYY')}</div>
            </div>            
            <div className={s.action_area+' ml-4 '}>
              {actions_}
            </div>
          </div>
        </div> 
      )
    })
  }
  
  const headings_=(
    <div className={s.headings}>
      <div className={s.user_area}></div>      
      <div className={s.last_collab_area}>Last<br/>Collaboration</div>      
      <div className={s.action_area+' ml-4'}>Collaborate?</div>
    </div>
  )
  return (
    <div className={s.items}>
      {showHeading && headings_}
      {collabs_} 
      <Performance isOpen={isPerformance} setOpen={setPerformance}></Performance>
    </div>
  )
}
export default com
