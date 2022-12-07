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
import { Scrollbar, Navigation, Pagination} from "swiper"


import _ from 'lodash'
import {get_meta} from '../blocks/com/test_user'


//https://outlook.office365.com/owa/calendar/YellowCollarDemo@yellowcollar.club/bookings/

/*
For Collaboration, partnership, and greate success.
YellowCollar makes building and managing a creator community seamless with a tailored influencer and business platform.

Influencing made easy
Influencer marketing is no longer an optional strategy. A strong online presence is essential, and YellowCollar makes this process hassle-free. Through a combination of tech and team, our platform empowers marketers to run profitable strategies.
*/

import s from './home_guest_u.module.scss';


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
  let Animation = ({img='intro_img1.png'}) => {
    let stats=({l, v, last=false})=>{
      let c_=last==true ? '' :'mr-8'
      return(
        <div className={c_+''}>
          <div className={'text-sm mb-2'}>{l}</div>
          <div className={'text-2xl font-semibold'}>{v}</div>
        </div>
      )
    }
    return(
      <div className={s.animation+' bg-white rounded-2xl px-6 py-6'} >
        <div className="rounded-2xl mb-6 -mr-16 -mt-16" style={{backgroundColor:'#f2f2f2'}}>
          <div className={s.aimg+" relative rounded-2xl bg-cover bg-center "} style={{paddingTop:'100%', backgroundImage:'url("/page/'+img+'")'}}>
            <div className={s.insta+" absolute top-0 right-0 bg-white rounded-xl px-4 py-4 mt-6 mr-6"}><img src={'/page/Intro_insta.png'}/></div>
            <div className={s.roi+" absolute bottom-0 right-0 mb-12 -mr-6 md:-mr-12"}><img src={'/page/Intro_roi.svg'}/></div>
          </div>
          <div className={'flex items-center px-6 py-4'}>
            <div className="flex flex-grow " >
              <div className='mr-4'><img src="/images/Heart_black.svg"/></div>
              <div className='mr-4'><img src="/images/Chat_black.svg"/></div>  
              <div className='mr-4'><img src="/images/Share_black.svg"/></div>   
            </div>
            <div><img src={'/images/Blue_tick.svg'} /></div>
          </div>
        </div>
        <div className="flex">
          {stats({l:"Social reach", v:'12M'})}
          {stats({l:"Estimated Engagement", v:'520K'})}
          {stats({l:"Estimated Budget", v:'6K', last:true})}       
        </div>
      </div>
    )
  }
  /*
  <Swiper
    onSwiper={setSwiperRef}
    spaceBetween={50}
    slidesPerView={1}
    navigation={true}
    scrollbar={{
      hide: true,
    }}
    modules={[Scrollbar, Navigation]}
    onSlideChange={() => console.log('slide change')}           
  >
    <SwiperSlide>{slide({title:'Powered by the YellowCollar platform.', desc:'Get the full overview of your products, collaborations and progress.', img:dashboard})}</SwiperSlide>
    <SwiperSlide>{slide({title:'List products for free.', desc:'List your products to sell it exclusively to influencers.', img:product})}</SwiperSlide>   
    <SwiperSlide>{slide({title:'Set campaign goals & Requirements.', desc:'Tell us your requirements to help us recommend you the right influencer for your brand.', img:campaign})}</SwiperSlide>
    <SwiperSlide>{slide({title:'Monitor your product sales.', desc:'Track your sales and shipping easily without missing any orders.', img:sales})}</SwiperSlide>
    <SwiperSlide>{slide({title:'Manage Collaboration.', desc:'Manage and track your influencer collaboration and payment with comfort and ease.', img:collab})}</SwiperSlide>
  </Swiper>
  */
  let Intro = () => {
    const [swiperRef, setSwiperRef] = useState(null);
    let slide = ({t, d, img}) =>{
      return(<div className={'mx-auto flex flex-wrap items-center px-8 md:px-12 py-8 md:py-24'} style={{maxWidth:'1400px'}}>
        <div className={'w-full md:w-8/12 md:pr-24'}>
          <h1 className={'text-2xl  md:text-3xl lg:text-4xl xl:text-5xl  font-semibold mb-8'}>{t}</h1>
          <div className={'md:mr-24 text-md md:text-xl'}>{d}</div>
          {Buttons()}
        </div>
        <div className={'w-full md:w-4/12 mt-12 md:mt-0'}>            
          <div className={"w-10/12 mt-12"}>{Animation({img})}</div>
        </div>
      </div>)
    }
    return(
      <div className={'md:h-screen flex items-center  '} >        
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
          <SwiperSlide>{slide({img:'intro_img1.png', t:'A simple and efficient AI driven influencer marketing platform.', d:'Your influencer marketing technology partner to help you reduce time, effort and cost spent on influencer marketing and increase marketing results and returns.'})}</SwiperSlide>
          <SwiperSlide>{slide({img:'intro_img3.png', t:'For collaboration, partnerships, and greater success.', d:'YellowCollar makes building and managing a creator community seamless with a tailored influencer and business platform.'})}</SwiperSlide>
          <SwiperSlide>{slide({img:'intro_img2.png', t:'Influencing made easy.', d:'Influencer marketing is no longer an optional strategy. A strong online presence is essential, and YellowCollar makes this process hassle-free. Through a combination of tech and team, our platform empowers marketers to run profitable strategies.'})}</SwiperSlide>
        </Swiper>        
      </div>
    )
  } 

  let usp = () => {
    let block = ({t, d, c='#FFF6EA'}) => {
      return(
        <div className={'px-10 py-12 md:py-24 rounded-2xl mb-12'} style={{backgroundColor: c}}>
          <div className={'text-3xl md:text-4xl font-semibold mb-8'}>{t}</div>
          <div className={'text-xl'}>{d}</div>
        </div>
      )
    }
    return(
      <div className={'flex items-center bg-white relative '} >
        <div className={'mx-auto flex flex-wrap items-center px-8 md:px-12 py-12 md:py-24 relative z-10'} style={{maxWidth:'1400px'}}>
          <div className={'text-3xl lg:text-4xl xl:text-6xl  font-semibold'}>New model for influencer marketing</div>
          <div className={'flex flex-wrap mt-16 md:ml-16 md:mr-16'}>
            <div className={'w-full md:w-6/12 md:pr-12'}>
              <div className={'text-xl'}>Get the full overview of your products, collaborations and growth.</div>
              {Buttons()}
              <div className={'md:ml-16 mt-12 md:mt-24'}><div className={'bg-cover bg-center rounded-2xl'} style={{paddingTop:'125%', backgroundImage:'url("/page/Usp_img.png")'}}></div></div>
            </div>
            <div className={'w-full md:w-6/12 mt-12 md:mt-0'}>
              <div className={'mb-8'}>{block({t:'AI Driven Better Collaboration', d:'Why waste time scanning thousands of influencer profiles? Find the right influencers to promote your products through AI.'})}</div>
              <div className={'md:mr-24 mb-8'}>{block({t:'Real Time measurement dashboard ', d:'Get analytics of your sales, collaborations, influencers etc.', c:'#FFF6F7'})}</div>
            </div>
          </div>
          <div className={'md:ml-16'}>
            <div className={'flex flex-wrap mt-2 md:ml-48'}>
              <div className={'w-full md:w-6/12 md:pr-12 '}>{block({t:'Zero listing fee', d:'Now list your products for free and increase your sales by selling only to influencers.'})}</div>
              <div className={'w-full md:w-6/12 mb-8 '}>{block({t:'Gain Influencer feedback', d:'Receive valuable feedback on your products from influencers for free.', c:'#FFF6F7'})}</div>              
            </div>
            <div className={'flex flex-wrap mt-2 md:ml-48'}>              
              <div className={'w-full md:w-6/12'}>{block({t:'Enhance your brand presence', d:'A platform that will get your brand noticed among influencers and their community.', c:'#FFF6F7'})}</div>
              <div className={'w-full md:w-6/12 md:pl-12 md:-mt-8'}>{block({t:(<span>Lower CAC<br/> Higher ROI</span>), d:'Our platform helps you achieve better numbers by guiding you through your influencer marketing journey.'})}</div>
            </div>
          </div>
        </div>
        <div className={'absolute bottom-0 left-0 mb-24 z-0'}><img src={'/page/Usp_el.png'}/></div>
      </div>
    )
  }

  let Product = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false })
    const { scrollYProgress } = useScroll();
    const [swiperRef, setSwiperRef] = useState(null);
    //console.log("scrollYProgress: ", scrollYProgress)
    useEffect(() => {
      console.log("Element is in view: ", isInView)
    }, [isInView])

    const slide = ({title, desc, img, demo=false}) => {
      return(
        <div className={'flex flex-wrap items-center px-8 md:px-16 py-16 pb-20 overflow-hidden'} style={{minHeight:'600px'}}>
          <div className={'w-full md:w-5/12 md:pr-24'}>
            <h1 className={'text-3xl lg:text-5xl font-semibold mb-4 md:mb-8'}>{title}</h1>
            <div className={'md:mr-24 text-md md:text-xl'}>{desc}</div>
            {demo==true && Buttons()}            
          </div>
          <div className={'w-full md:w-7/12 mt-12 md:mt-0'}>            
            <div className={""}>{img}</div>            
          </div>
        </div>
      )
    }
    /*return2(
      <motion.div ref={ref} animate={{ x: -50 }} style={{ scale: scrollYProgress }} className={'md:h-screen flex items-center'} >        
        <div className={'mx-auto flex flex-wrap items-center px-8 md:px-12 py-24'} style={{maxWidth:'1400px'}}>
          <div className={'w-full md:w-8/12 pr-24'}>
            <h1 className={'text-4xl lg:text-5xl font-semibold mb-8'}>Powered by the YellowCollar platform.</h1>
            <div className={'md:mr-24 text-xl'}>Get the full overview of your products, collaborations and progress.</div>
            {Buttons()}
            
          </div>
          <div className={'w-full md:w-4/12 mt-12 md:mt-0'}>            
            <div className={"w-10/12 mt-12"}>{Animation()}</div>            
          </div>
        </div>
      </motion.div>
    )*/
    
    let dashboard=(<div className={'relative'}><div className={"md:ml-32 -mr-32 border-4 border-gray-900 rounded-2xl overflow-hidden"}><img src="/page/platform_dashboard.png"/></div></div>)
    let campaign=(<div className={'relative'}><div className={"overflow-hidden"}><img src="/page/platform_campaign.png"/></div></div>)
    let sales=(<div className={'relative'}><div className={" -mr-48 overflow-hidden"}><img src="/page/platform_sales.png"/></div></div>)
    let collab=(<div className={'relative'}><div className={"md:-mr-48 overflow-hidden"}><img src="/page/platform_collab.png"/></div></div>)
    let product=(<div className={'relative'}><div className={"md:ml-32 -mr-32 border-4 border-gray-900 rounded-2xl overflow-hidden"}><img src="/page/platform_product.png"/></div></div>)

    
    return(
      <div className={'py-12 md:py-24 bg-white  bottom_nav px-4 md:px-0'} style={{}}>
        <div className={'mx-auto bg-gray-100 pb-12 rounded-2xl '} style={{maxWidth:'1400px'}}>
          <Swiper
            onSwiper={setSwiperRef}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar, Navigation]}
            onSlideChange={() => console.log('slide change')}
            /*onSwiper={(swiper) => console.log(swiper)}*/
          >
            <SwiperSlide>{slide({title:'Powered by the YellowCollar platform.', desc:'Get the full overview of your products, collaborations and progress.', img:dashboard, demo:true})}</SwiperSlide>
            <SwiperSlide>{slide({title:'List products for free.', desc:'List your products to sell it exclusively to influencers.', img:product})}</SwiperSlide>   
            <SwiperSlide>{slide({title:'Set campaign goals & Requirements.', desc:'Tell us your requirements to help us recommend you the right influencer for your brand.', img:campaign})}</SwiperSlide>
            <SwiperSlide>{slide({title:'Monitor your product sales.', desc:'Track your sales and shipping easily without missing any orders.', img:sales})}</SwiperSlide>
            <SwiperSlide>{slide({title:'Manage Collaboration.', desc:'Manage and track your influencer collaboration and payment with comfort and ease.', img:collab})}</SwiperSlide>
          </Swiper>
        </div>
      </div>
    )
  } 
  
  let Faq = () => {   
    let desc1=(
      <div>
        <p className="mb-8">Influencers get attracted to attractive offers. So if you haven't been able to get collaboration requests or sales, you can do 2 of the following things:</p>
        <ul className="list-disc pl-4">
        <li className="mb-2">Increase the discount rate- Make them an offer they can't refuse. We recommend a 40% discount to attract influencers.</li>
        <li className="mb-4">List more products- The more products you list the greater the chance of an influencer catching your brand. This is why there is no listing fee on our platform.</li>
        </ul>
      </div>
    )
    let questions_=(<Accordion {...{
      items:[
        {t:'Can a business contact the influencer without receiving a request? ', d:'No, to ensure authenticity to identify a right influencer, a business can contact influencers only once received a request.'},
        {t:'Is giving product discounts compulsory?', d:'It is recommended as it would excite an influencer to buy your product. When an influencer buys your product it’s because they will use it off camera also. This will enable of word-of-mouth marketing for your business. Therefore this discounted is a marketing cost for your company.'},
        {t:"Why haven't influencers sent collaboration requests", d:desc1},
        {t:'5-Why will an influencer will purchase a product from YellowCollar platform when they get it free in PR or  can do Barter system collaborations?', d:'Influencers still have to shop. Its not like they do not shop because they are an influencer. Influencers are also actively looking for brand collaborations. An opportunity is created for an influencer when they can reach out to a brand for a collaboration directly on a shopping portal.'},
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
    <div className={s.main} style={{backgroundImage:'url("/images/Pattern.png")'}}>   
        <Intro/>
        {usp()}
        <Product/>
        <Faq />
    </div>    
  )
}
export default com
