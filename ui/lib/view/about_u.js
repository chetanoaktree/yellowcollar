import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import Guest from './guest';
import Button from '../button';
import {Accordion} from './_blocks/content_ui'
import _ from 'lodash'
import s from './about_u.module.scss';

const com = (props ) => { 
  let {cat, handler, children}=props
  const router=useRouter()
  const {dev}=router.query
  const {user, membership} = useSelector((state) => state.pageData);
  console.log("USER2", user)
  let content=''
  let platform_=(<Accordion {...{
    items:[
      {t:'End-to-end campaign management ?', d:'description'},
      {t:'Assess your match with the influencers ?', d:'description'},
      {t:'Promote posts Social ads ?', d:'description'},
      {t:'Enjoy sales and better market reach out ?', d:'description'},
    ]
  }}/>)

  let member = ({t, p, d, i}) => {
    return(
      <div className={s.member+' px-12'}>
        <div className={s.img+' bg-center bg-cover rounded-4xl mb-6 -mx-4'} style={{paddingTop:'100%', backgroundImage:'url("/page/'+i+'")'}}></div>
        <div className={'text-xl font-semibold'}>{t}</div>
        <div className={'text-lg opacity-50 mb-6'}>{p}</div>
        {/*<div className={'text-sm mt-4 mb-8 -mx-4'}>
          <ul className={'bg-gray-100 px-4 py-4 rounded-2xl'}>{
            p.map((i, index)=>{
              return(<li key={index} className={'mb-4'}>{i}</li>)
            })
          }
          </ul>
        </div>*/}
        <div className={' bg-gray-100 px-4 py-2 -mx-4  rounded-2xl'}>{d}</div>
      </div>
    )
  }
  let belief = ({t, p, d}) => {
    return(
      <div className={'px-12'}>
        <div className={'text-xl font-semibold mb-8 bg-yellow2 px-6 py-1 rounded-full inline-block'}>{t}</div>        
        <div className={'h-12'}>{/*d*/}</div>
      </div>
    )
  }
  let members=[
    {t:'Ayush Raniwala', i:'tm_1.png', p:'Co-Founder',
      p1:[
        'CO-FOUNDER YELLOWCOLLAR', 
        'GRADUATED FROM ESADE BUSINESS SCHOOL, BARCELONA, SPAIN & NMIMS, MUMBAI, INDIA',
        'PREVIOUSLY CO-FOUNDED SKINSLAYER TECHNOLOGY LLP, SINERGIE SOLUTIONS & FINIC'
        ], 
      d:'A tech guru with an immense fascination for computers and marketing, Ayush is a programmer turned entrepreneur. Coming from a Marwadi business family, Ayush has always had a keen interest in business which led him to start out at an early age and build and scale multiple startups.'},
    {t:'Manan Kedia', i:'tm_2.png', p:'Co-Founder',
      p1:[
        'CO-FOUNDER YELLOWCOLLAR',
        'GRADUATED FROM ESADE BUSINESS SCHOOL, BARCELONA, SPAIN, UCD SMURFIT BUSINESS SCHOOL, DUBLIN, IRELAND & VIT, VELLORE, INDIA ​',
        'PREVIOUSLY CO-FOUNDED PROWVIERE & SINERGIE SOLUTIONS'
        ],
      d:'A solutions architect with a passion for entrepreneurship, Manan is a finance guru, who has previously worked as a product manager and consultant for multiple startups and multinationals, with an early knack for investing Manan has also spent significant time in his CFA studies.'},
    {t:'Shanav Jalan', i:'tm_3.png', p:'Co-Founder',
      p1:[
        'CO-FOUNDER YELLOWCOLLAR',
        'GRADUATED FROM CRANFIELD UNIVERSITY, CRANFIELD, UNITED KINGDOM & NMIMS, MUMBAI, INDIA',
        'PREVIOUSLY CONSULTED DIGIBOXX & CO-FOUNDED SINERGIE SOLUTIONS'
        ], 
      d:'A strategic and creative thinker with a goal to make a difference in the world as an entrepreneur. Shanav is a peoples person and his expertise lie in business growth, marketing,  sales and product solutions. He has previously worked and consulted with multiple start ups.'}
  ]
  let beliefs=[
    {t:'Making a difference', p:'Overview', d:'Get the full overview of your products,  and progress. Get the full overview of your products,  and progress. Get the full overview of your products, collaborations and progress.'},
    {t:'Authenticity', p:'Overview', d:'Get the full overview of your products,  and progress. Get the full overview of your products,  and progress. Get the full overview of your products, collaborations and progress.'},
    {t:'Perseverance', p:'Overview', d:'Get the full overview of your products,  and progress. Get the full overview of your products,  and progress. Get the full overview of your products, collaborations and progress.'},
    {t:'Learning', p:'Overview', d:'Get the full overview of your products,  and progress. Get the full overview of your products,  and progress. Get the full overview of your products, collaborations and progress.'},
  ]
  return (    
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        <div className={s.inner+' pt-20 px-6 xl:px-0'}>
          {/*<h2  className={'relative text-4xl md:text-5xl font-semibold leading-normal'} style={{lineHeight:'1.2'}}>YellowCollar was inspired by the idea that businesses &amp; influencers should demand more from technology.</h2>*/}
          <div className={'mx-4 md:mx-24'}>
            {/*<div className={'text-lg md:text-xl font-semibold mt-16 w-full xl:w-8/12'} >Platform features- Chat with businesses directly. Simple and faster collaborations. Authentic and result oriented platform
  Search for the products and brands you like Combined experience of shopping and collaboration.</div>*/}
            <div id={"team"} className={''}></div>
            <div className={'mt-12'} >
              <p className={'text-3xl md:text-4xl font-semibold mb-2'}>Vision</p>
              <p className={'text-xl bg-yellow2 px-4 rounded-full inline-block -ml-2'}>To create a win-win solution for influencers and businesses.</p> 
            </div>
            <div className={'mt-4  md:mt-8 mb-20  flex flex-wrap '}>              
              <p>Today, implementing a structure in the influencer marketing industry to optimize the user journey and how this industry operates is of paramount importance. Furthermore, its vital to validate influencing as a ‘real’ job so nobody looks down to it.</p>
            </div>
            <div className={'mt-12'} >
              <p className={'text-3xl md:text-4xl font-semibold mb-2'}>Mission</p>
              <p className={'text-xl bg-yellow2 px-4 rounded-full inline-block -ml-2'}>To introduce an online marketplace designed to initiate authentic influencer and business collaborations.</p> 
            </div>
            <div className={'mt-6  md:mt-8 mb-20 flex flex-wrap '}>
              <p className={'mb-8'}>In order to make a difference in this industry, we had to modernize the very first step in this process i.e., making contact. We found it more efficient to be able to make direct contact on a platform where products were bought instead of a social media. This also makes a collaboration genuine because someone who has bought or has an intent to purchase your product will definitely use your product. </p>
              <p>The second layer was to match the right influencer with the right brand which is done by our AI. It understands the brands requirements, the influencers profile and most importantly the influencers community to see if the influencers community is the right fit for the brand. 
Lastly, we needed content creation to be authentic, genuine and rich which is easily achievable through incentivization.</p>
            </div>

            <div className={'text-3xl md:text-4xl font-semibold mt-32'} >Team</div>
            <div className={'mt-6  md:mt-8 mb-20 flex flex-wrap -mx-12'}>
              {members.map((i, index)=>{
                return(
                  <div key={index} className={'w-full md:w-4/12 mb-12'}>{member(i)}</div>
                )
              })}
            </div>
            <div id={"believe"} className={''}></div>
            <div className={'text-3xl md:text-4xl font-semibold mt-32'} >We believe</div>
            <div className={'mt-6  md:mt-8 mb-20 flex flex-wrap -mx-12'}>
              {beliefs.map((i, index)=>{
                return(
                  <div key={index} className={'w-full md:w-6/12 mb-12'}>{belief(i)}</div>
                )
              })}
            </div>

          </div>
          <div className={'w-full md:w-6/12 border-b border-gray-200 pb-12'}></div>
        </div>
      </div>
    </Guest>        
  )
}
export default com
