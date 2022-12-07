import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import Guest from './guest';
import Button from '../button';
import {Accordion} from './_blocks/content_ui'
import _ from 'lodash'
import s from './faq_u.module.scss';

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

  let desc2=(
    <div>        
      <ul className="list-disc pl-4">
      <li className="mb-2">Partner with large pool of businesses.</li>
      <li className="mb-2">Promote products that you love.</li>
      <li className="mb-2">Connect with your community better.</li>
      <li className="mb-2">Achieve increased engagement.</li>
      <li className="mb-2">Get a fixed and performance-based income.</li>
      </ul>
    </div>
  )  
  let influencer_=(<Accordion {...{
    items:[
      {t:'Why is YellowCollar the best platform for influencers and businesses? ', d:desc2},
      {t:'How to sign up as an influencer with YellowCollar ?', d:(<div>Click on login or sign-up button on the website and simply input your details. Then receive a verification email to confirm. That’s it you are done.</div>)},
      {t:'How can one avail of influencer privilege discounts? ', d:'Simply, make YellowCollar your go to shopping portal because products on our platform are on discounts exclusively for you.'},
      {t:'How to send collaboration requests to brands?', d:'Once you have bought a product a collaboration request button will get active on the product page. Simply click on the button and wait for a brand to respond.'},
    ]
  }}/>)

   let desc3=(
    <div>
      <p className="mb-8">Influencers get attracted to attractive offers. So if you haven't been able to get collaboration requests or sales, you can do 2 of the following things:</p>
      <ul className="list-disc pl-4">
      <li className="mb-2">Increase the discount rate- Make them an offer they can't refuse. We recommend a 40% discount to attract influencers.</li>
      <li className="mb-4">List more products- The more products you list the greater the chance of an influencer catching your brand. This is why there is no listing fee on our platform.</li>
      </ul>
    </div>
  )
  let business_=(<Accordion {...{
    items:[
      {t:'Can a business contact the influencer without receiving a request? ', d:'No, to ensure authenticity to identify a right influencer, a business can contact influencers only once received a request.'},
      {t:'Is giving product discounts compulsory?', d:'It is recommended as it would excite an influencer to buy your product. When an influencer buys your product it’s because they will use it off camera also. This will enable of word-of-mouth marketing for your business. Therefore this discounted is a marketing cost for your company.'},
      {t:"Why haven't influencers sent collaboration requests", d:desc3},
      {t:'5-Why will an influencer will purchase a product from YellowCollar platform when they get it free in PR or  can do Barter system collaborations?', d:'Influencers still have to shop. Its not like they do not shop because they are an influencer. Influencers are also actively looking for brand collaborations. An opportunity is created for an influencer when they can reach out to a brand for a collaboration directly on a shopping portal.'},
    ]
  }}/>)
 
  return (    
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        <div className={s.inner+' pt-20 px-6 xl:px-0'}>
          <h2  className={'relative text-4xl md:text-6xl font-semibold'}>Frequently Asked Question</h2>
          {/*<div className={'text-2xl md:text-3xl font-semibold mt-16'} >Platform</div>
          <div className={'mt-6  md:mt-8 mb-20'}>{platform_} </div>*/}

          <div className={'text-2xl md:text-3xl font-semibold mt-16'} >Influencer</div>
          <div className={'mt-6  md:mt-8 mb-20'}>{influencer_} </div>

          <div className={'text-2xl md:text-3xl font-semibold mt-16'} >Business</div>
          <div className={'mt-6  md:mt-8 mb-20'}>{business_} </div>
        </div>
      </div>
    </Guest>        
  )
}
export default com
