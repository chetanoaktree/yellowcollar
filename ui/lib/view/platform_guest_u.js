import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux"
import Guest from './guest'
import Title from '../title'
import Button from '../button'
import TestUser from '../blocks/com/test_user'
import {Accordion} from './_blocks/content_ui'


import { motion, useScroll, useInView } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Navigation, Pagination } from "swiper"



import _ from 'lodash'
import {get_meta} from '../blocks/com/test_user'

//https://outlook.office365.com/owa/calendar/YellowCollarDemo@yellowcollar.club/bookings/

import s from './platform_guest_u.module.scss';


const com = ({cat, handler, children,  ...props} ) => { 
  const router=useRouter()
  const {dev}=router.query   
  const {user, membership} = useSelector((state) => state.pageData); 

  let Buttons = () => {
    return(
      <div className={'flex flex-wrap mt-12'}>
        <Button to='https://outlook.office365.com/owa/calendar/YellowCollarDemo@yellowcollar.club/bookings/' target='blank' type="action2" color="yellow" size="md" className={'mr-4 mb-4 sm:mb-0'}><div className="flex items-center -mr-4"><span className="mr-4">Get a demo </span><img src="/images/Arrow2_right_light.svg"/></div></Button>
        <Button to="/auth" type="action2" color="black" className={'mr-4 mb-4 sm:mb-0'}><div className="flex items-center  -mr-4"><span className="mr-4">Signup</span><img src="/images/Arrow2_right.svg"/></div></Button>
      </div>
    )
  }
 
  let Animation = () => {    
    return(
      <div className={s.animation+' mt-12 md:mt-32 md:ml-12 md:-mr-12 '} >
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="relative md:-mr-32 -mt-12 md:-mt-20">
            <div className={"relative"} style={{zIndex:1}}>  
              <img src={"/page/gr_product.svg"}/>                                          
            </div>
            <div className={"hidden md:block relative mt-16 -ml-12"} style={{zIndex:1}}>  
              <img src={"/page/gr_status.svg"}/> 
              <img className={"hidden md:block absolute top-0 left-0 ml-40 -mt-12"} src={"/page/Info_status.svg"}/>                                        
            </div>
          </div>
          <div className={"relative -mx-16 md:mx-0"} >  
            <img src={"/page/gr_collab_status.svg"}/> 
            <img className={"hidden md:block absolute top-0 left-0 ml-48 -mt-12"} src={"/page/info_collab.svg"}/>                    
          </div>
          <div className={"relative md:-ml-24 md:-mt-32"} style={{zIndex:1}}>  
            <img src={"/page/gr_order_status.svg"}/> 
            <img className={"hidden md:block absolute top-0 left-0 -ml-20 mt-12"} src={"/page/Info_order.svg"}/>                      
          </div>
        </div>        
      </div>
    )
  }

  let Intro = () => {
    const [swiperRef, setSwiperRef] = useState(null);
    let slide = ({t, d, img}) =>{
      return(
        <div className={'flex flex-col items-center text-center pb-12 px-24'}>
          <h1 className={'text-2xl  md:text-3xl lg:text-5xl xl:text-6xl font-semibold mb-8 md:w-10/12 mx-auto'}>{t}</h1>
          <div className={'text-md md:text-xl'}>{d}</div>
          
        </div>
      )
    }
    return(
      <div className={'flex items-center pt-0 md:pt-24'} >
        <div className={'mx-auto w-full flex flex-wrap items-center px-8 md:px-12 py-24'} style={{maxWidth:'1400px'}}>
          <div className={'w-full md:w-10/12 mx-auto' } >
            <div className={''}>
            <Swiper
              onSwiper={setSwiperRef}
              spaceBetween={50}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              /*scrollbar={{
                hide: true,
              }}*/
              modules={[Scrollbar, Navigation, Pagination]}
              onSlideChange={() => console.log('slide change')}           
            >
            <SwiperSlide>{slide({t:'Your gateway to the creator economy.', d:'Your influencer marketing technology partner in building your brand with and finding your top performers on social media.'})}</SwiperSlide>
            {/*<SwiperSlide>{slide({t:'Enhance your brand presence.', d:'A platform that will get your brand noticed among influencers and their community.'})}</SwiperSlide>*/}
            <SwiperSlide>{slide({t:'Increase your sales.', d:'Sell your products exclusively to influencers and get valuable feedback.'})}</SwiperSlide>
            <SwiperSlide>{slide({t:'Connect with the right influencer community.', d:'Our AI recommends you which influencer and influencer community is best suited for your business for a promotion.'})}</SwiperSlide>
            <SwiperSlide>{slide({t:'Ensure quality content.', d:'On our platform influencers are incentivized to generate quality content.'})}</SwiperSlide>
            {/*<h1 className={'text-4xl lg:text-5xl xl:text-6xl font-semibold mb-8 md:w-10/12 mx-auto'}>Your gateway to the creator economy.</h1>
            <div className={'text-xl'}>Your influencer marketing technology partner in building your brand with and finding your top performers on social media.</div>
            {Buttons()}     */} 
            </Swiper>  
            </div>
            <div className='flex justify-center'>{Buttons()}  </div>        
          </div>
          <div className={'mt-12 -mb-48 relative z-10 -mx-8 overflow-hidden md:overflow-visible md:pl-12'}>            
            <div className={""}>{Animation()}</div>
          </div>
        </div>
      </div>
    )
  } 

  let usp = () => {
    let dashboard=(<div className={'relative'}><div className={s.shadow+" rounded-2xl overflow-hidden"}><img src="/page/platform_dashboard.png"/></div></div>)
    let campaign=(<div className={'relative'}><div className={"overflow-hidden"}><img src="/page/platform_campaign.png"/></div></div>)
    let sales=(<div className={'relative'}><div className={"overflow-hidden"}><img src="/page/platform_sales.png"/></div></div>)
    let collab=(<div className={'relative'}><div className={"overflow-hidden"}><img src="/page/platform_collab.png"/></div></div>)
    let product=(<div className={'relative'}><div className={s.shadow+" rounded-2xl overflow-hidden"}><img src="/page/platform_product.png"/></div></div>)
    let chat=(<div className={'relative'}><div className={s.shadow+" rounded-2xl overflow-hidden"}><img src="/page/platform_chat.png"/></div></div>)
    let ai_match=(<div className={'relative'}><div className={s.shadow+" rounded-2xl overflow-hidden"}><img src="/page/platform_ai_match.png"/></div></div>)

    

    let shape = ({c}) => {
      return(
        <div className={'absolute top-0 right-0 left-0 bottom-0 mt-6 mb-6 flex justify-center items-center'}  style={{zIndex:0}}>
          <div className={'rounded-2xl w-10/12 md:w-6/12 h-full'} style={{backgroundColor: c}}></div>
        </div>
      )
    }
    let cont = ({t, d}) =>{
      return(
        <div className={''}>
          <div className={'text-3xl md:text-4xl font-semibold mb-4 md:mb-8'}>{t}</div>
          <div className={'text-md md:text-xl'}>{d}</div>
        </div>
      )
    }
    let block = ({t, d, c='#FFF6EA', img}) => {
      return(
        <div className={'relative md:px-10 py-12 md:py-24 rounded-2xl mb-12'} >
          <div className={'relative flex flex-wrap items-center'} style={{zIndex:1}}>
            <div className={'relative w-full md:w-7/12 md:pr-12 order-1 md:order-0'}>
              {img}
            </div>
            <div className={'relative w-full md:w-5/12 order-0 mb-8 md:mb-0 md:order-1'}>
              {cont({t,d})}
            </div>
          </div>
          {shape({c})}
        </div>
      )
    }
    let blocktop = ({t, d, c='#FFF6EA', img}) => {
      return(
        <div className={'relative md:px-10 py-12 md:py-24 rounded-2xl mb-12'} >
          <div className={'relative flex flex-wrap items-center'} style={{zIndex:1}}>
            <div className={'relative w-full md:w-5/12 mb-8 md:mb-0'}>
              {cont({t,d})}
            </div>
            <div className={'relative w-full md:w-7/12 md:pl-12'}>
              {img}
            </div>
          </div>
          {shape({c})}
        </div>
      )
    }
    
    return(
      <div id={"features"} className={'flex items-center bg-white relative '} >
        <div className={'mx-auto flex flex-wrap items-center px-8 md:px-12 px-12 md:px-24 pt-48 relative z-10'} style={{maxWidth:'1400px'}}>          
          <div className={'mb-8'}>{block({img:dashboard, t:'Powered by the YellowCollar platform.', d:'Why waste time scanning thousands of influencer profiles? Find the right influencers to promote your products through AI.'})}</div>
          <div id={"list_ai_match"} className={''}></div>
          <div className={'mb-8'}>{blocktop({img:ai_match, t:'AI Based influencer recommendation.', d:'To help you reduce time spent on analyzing numerous influencers, our AI suggests how well your business matches with an influencer.', c:'#eafbff'})}</div>
          <div id={"campaign"} className={''}></div>
          <div className={'mb-8'}>{block({img:campaign, t:'Customize your Campaign goals and requirements.', d:'This will help our AI understand your requirements to suggest the right influencer for you.'})}</div>
          <div id={"manage_sales"} className={''}></div>
          <div className={'mb-8'}>{blocktop({img:sales, t:'Generate, Track and Manage Sales.', d:'For the first time ever, sell your products exclusively to influencers.', c:'#eafbff'})}</div>
          <div id={"manage_collabs"} className={''}></div>
          <div className={'mb-8'}>{block({img:chat, t:'Easy communication with influencers.', d:'Directly communicate with influencer on our platform.'})}</div>
          <div id={"manage_collabs"} className={''}></div>
          <div className={'mb-8'}>{blocktop({img:collab, t:'Easy collaboration with influencers.', d:'A new quick and efficient way to collaborate with influencers.', c:'#eafbff'})}</div>
        </div>        
      </div>
    )
  }
  
  let Faq = () => {   
    let questions_=(<Accordion {...{
      items:[
        {t:'End-to-end campaign management ?', d:'description'},
        {t:'Assess your match with the influencers ?', d:'description'},
        {t:'Promote posts Social ads ?', d:'description'},
        {t:'Enjoy sales and better market reach out ?', d:'description'},
      ]
    }}/>)
    return(
      <div className={'flex items-center bg-white relative '} >
        <div className={'mx-auto flex flex-wrap items-center px-8 md:px-12 py-12 md:py-24 relative z-10'} style={{maxWidth:'1020px'}}>          
          <div className={'relative text-3xl md:text-4xl xl:text-6xl font-semibold'}>People usually ask us <div className={'ml-16 -mt-3 text-8xl absolute top-0 left-0 opacity-10'}>FAQ</div></div>
         <div className={'mt-12  md:mt-16 '}>{questions_} </div>
          <div className={"mt-12"}>
            <Button type="default" color="white" to={'/faq'} ><div className={"text-xl flex items-center px-8"}><div>See all FAQs</div> <img className="ml-12" src={"/images/Arrow_right_light.svg"}/></div></Button>
          </div>        
        </div>            
      </div>
    )
  }

  return ( 
    <Guest {...props} viewType="guest">      
      <div className={s.main} style={{backgroundImage:'url("/images/Pattern.png")'}}>   
          <Intro/>
          {usp()}          
          <Faq />
      </div>  
    </Guest>  
  )
}
export default com
