import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import Guest from './guest';
import Button from '../button';
import {Accordion} from './_blocks/content_ui'
import _ from 'lodash'
import Moment from 'moment'
import s from './blog_u.module.scss';



const com = (props ) => { 
  let {slug='', title='', content='', duration='', date='', image='', category='general', handler, children}=props
  const router=useRouter()
  const {dev}=router.query
  const {user, membership} = useSelector((state) => state.pageData);
  console.log("USER2", user) 


 
  
  let belief = ({s, t, p, date, category, i, a}) => {
    return(
      <div className={'px-6 md:px-12'}>
        <Button className="block" type="hit_down" to={"/blog/"+s}><div className={s.img+' cursor-pointer bg-center bg-cover rounded-2xl mb-6'} style={{paddingTop:'100%', backgroundImage:'url("/blog/'+i+'")'}}></div></Button>
        <div className={'mb-6 text-sm flex items-center'}>
          <div className={'mr-6 opacity-50'}>{date}</div>  
          <div className={'text-primary-500 bg-yellow-100 rounded-full px-4'}>{category}</div>  
        </div>  
        <Button type="hit_down" to={"/blog/"+s}><div className={'cursor-pointer text-xl font-semibold mb-4'}>{t}</div></Button> 
        <div className={'text-sm opacity-50'}>by {a}</div>  
      </div>
    )
  }


  let beliefs=[
    {s:'for-businesses-yellow-collar-101', t:'For Businesses: Yellow Collar 101', p:'Overview', i:'b101_01.png', date:'26-10-2022', category:'business', a:'YellowCollar'},
    {s:'claim-your-ticket-to-fame', t:'Claim your ticket to fame', p:'Overview', i:'b_claim_your_ticket_01.png', date:'27-10-2022', category:'influencer', a:'YellowCollar'},
    {s:'industry_insights_on_how_yellow_collar_is_unique_for_the_influencers', t:'Importance of YellowCollar in the industry today', p:'Overview', i:'b_industry_insights_01.png', category:'influencer', date:'28-10-2022', category:'influencer', a:'YellowCollar'},
    //{s:'create_influencer_account_in_instagram', t:'Step by step guide to create influencer account in instagram', p:'Overview', i:'team_member_01.png', date:'22-4-2023', category:'Instagram', a:'YellowCollar'},
   // {s:'convert_personal_to_business_account_in_instagram', t:'Convert personal account to business account in instagram', p:'Overview', i:'team_member_02.png', date:'22-4-2023', category:'Instagram', a:'YellowCollar'},
   //{s:'how_to_improve_brand_roi', t:'How to improve the brand ROI in easily?', p:'Overview', i:'team_member_03.png', date:'22-4-2023', category:'Brand', a:'YellowCollar'},
  ]
  let article = () => {
    return(
      <div className={s.inner+' pt-20 px-6 xl:px-0'}>
        <div className={s.head+' w-full xl:w-7/12'}>
          <h2  className={'relative text-4xl md:text-5xl font-semibold leading-normal mb-12'} style={{lineHeight:'1.2'}}>{title}</h2>
          <div className={s.img+' bg-center bg-cover rounded-2xl mb-6 overflow-hidden'}>
            <img src={"/blog/"+image}/>
          </div>           
        </div>
        <div className={s.content+' flex flex-wrap items-center py-12 border-b border-gray-200'}>
          <div className={'w-4/12 md:w-3/12'}>
            <div className={'text-gray-800 flex items-center'}>
              <div className={'w-16 rounded-xl overflow-hidden mr-4'}><img src="/favicon.png"/></div>
              <div className={''}>
                <div>YellowCollar</div>
                <div className={'opacity-50 text-md'}>Admin</div>
              </div>
            </div>
          </div>
          <div className={'flex-grow flex flex-col items-center md:items-start md:w-6/12'}>
            <div className={'text-primary-500 bg-yellow-100 rounded-full px-4 mb-2'}>{category}</div>
            <div className={'text-gray-500 px-4'}>{date}</div>
          </div>
          <div className={'md:w-3/12'}>{duration}</div>
        </div>          
        <div className={s.content+' flex flex-wrap'}>
          <div className={'w-full md:w-3/12'}></div>
          <div className={'w-full md:w-6/12 '}>
            <div className={'mt-12'} >
              {content}
            </div>
          </div>
          <div className={'w-full md:w-3/12'}></div>
        </div>
        <div className={'w-full md:w-6/12 border-b border-gray-200 py-12'}></div>
        <div className={"mt-24"}>
          <div className={"text-2xl md:text-5xl font-semibold mb-12"}>Most Recent Posts</div>
          <div className={'mt-6  md:mt-8 mb-20 flex flex-wrap -mx-6 md:-mx-12'}>
            {beliefs.map((i, index)=>{
              return(
                <div key={index} className={'w-6/12 md:w-3/12 mb-12'}>{belief(i)}</div>
              )
            })}
          </div>
        </div>
        <div className={'w-full md:w-6/12 border-b border-gray-200 pb-12'}></div>
      </div>
    )
  }
  let articles = () => {
    return(
      <div className={s.inner+' px-6 xl:px-0'}>        
        <div className={"mt-24"}>
          <div className={"text-2xl md:text-5xl font-semibold mb-12"}>Most Recent Posts</div>
          <div className={'mt-6  md:mt-8 mb-20 flex flex-wrap -mx-6 md:-mx-12'}>
            {beliefs.map((i, index)=>{
              return(
                <div key={index} className={'w-full md:w-4/12 mb-12'}>{belief(i)}</div>
              )
            })}
          </div>
        </div>
        <div className={'w-full md:w-6/12 border-b border-gray-200 pb-12'}></div>
      </div>
    )
  }
  return (    
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        {slug!='' && article()}
        {slug=='' && articles()}
      </div>
    </Guest>        
  )
}
export default com
