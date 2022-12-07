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
import { Scrollbar, Navigation } from "swiper"


import _ from 'lodash'
import {get_meta} from '../blocks/com/test_user'



import s from './influencers_guest_u.module.scss';


const com = ({cat, handler, children,  ...props} ) => { 
  const router=useRouter()
  const {dev}=router.query   
  const {user, membership} = useSelector((state) => state.pageData); 

  let Buttons = () => {
    return(
      <div className={'flex flex-wrap mt-12'}>
        <Button  to='/auth' type="action2" color="yellow" className={'mr-4 mb-4 sm:mb-0'}><div className="flex items-center -mr-4"><span className="mr-4">Signup</span><img src="/images/Arrow2_right_light.svg"/></div></Button>
      </div>
    )
  }
  let Animation = () => {
    let stats=({l, v, last=false})=>{
      let c_=last==true ? '' :'mr-8'
      return(
        <div className={c_+''}>
          <div className={'text-sm mb-2'}>{l}</div>
          <div className={'text-2xl font-semibold'}>{v}</div>
        </div>
      )
    }
    let icons = () => {
       return(
         <div className="flex flex-grow " >
          <div className='mr-4'><img src="/images/Heart_black.svg"/></div>
          {/*<div className='mr-4'><img src="/images/Chat_black.svg"/></div>  */}
          <div className='mr-4'><img src="/images/Share_black.svg"/></div>   
        </div>
       )
    }
    let img = ({img}) =>{
      return(
        <div className="rounded-2xl" style={{backgroundColor:'#f2f2f2'}}>
          <div className={" relative rounded-2xl bg-cover bg-center "} style={{paddingTop:'140%', backgroundImage:'url("/page/'+img+'")'}}>
            <div className={s.insta+" absolute top-0 right-0 bg-white rounded-xl px-2 py-2 mt-4 mr-4"}><img src={'/page/Intro_insta.png'}/></div>            
          </div>
          <div className={'flex items-center px-6 py-4'}>
            {icons()}           
          </div>
        </div>
      )
    }
    return(
      <div className={s.animation+' bg-white rounded-2xl px-6 py-6 mt-32 ml-12 md:ml-0'} >
        <div className="rounded-2xl mb-6 -ml-12 mr-12 md:-ml-20 md:mr-20 xl:-ml-32 xl:mr-24 -mt-24" style={{backgroundColor:'#f2f2f2'}}>
          <div className={s.aimg+" relative rounded-2xl bg-cover bg-center "} style={{paddingTop:'140%', backgroundImage:'url("/page/into_i_img2.png")'}}> 
            <div className={'absolute top-0 right-0 -mr-8 md:-mr-16 xl:-mr-32'}>           
              <div className={'relative h-48'}><div className={'absolute top-0 right-0 w-32 md:w-32 xl:w-48 -mt-6 xl:-mt-12'}>{img({img:'into_i_img1.png'})}</div></div>
              <div className={'relative h-48'}><div className={'absolute top-0 right-0 w-32 md:w-32 xl:w-48 -mr-12 md:-mr-24 -mt-12'}>{img({img:'into_i_img3.png'})}</div></div>
            </div>            
          </div>
        </div>
        <div className="flex relative pl-4 pt-12 md:pt-4">
          <div className={s.roi+" absolute bottom-0 left-0 mb-0 -ml-24 md:-ml-28 "}><img src={'/page/intro_performance.svg'}/></div>
          {stats({l:"Total Earnings", v:'17K'})}
          {stats({l:"Approved Collaborations", v:'120'})}
          {stats({l:"Live Campaigns", v:'86', last:true})}       
        </div>
      </div>
    )
  }

  let intro = () => {
    return(
      <div className={'md:h-screen flex items-center'} >
        <div className={'mx-auto flex flex-wrap items-center px-8 md:px-12 py-24'} style={{maxWidth:'1400px'}}>
          <div className={'w-full md:w-8/12 pr-24'}>
            <h1 className={'text-4xl lg:text-5xl xl:text-6xl font-semibold mb-8 md:mr-12'}>Level up your Influencing Game.</h1>
            <div className={'md:mr-24 text-xl'}>Grow your personal brand with ease to turn your passion into profession.</div>
            {Buttons()}
          </div>
          <div className={'w-full md:w-4/12 mt-12 md:mt-0'}>            
            <div className={"w-10/12 mt-12"}>{Animation()}</div>
          </div>
        </div>
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
          <div className={'text-4xl lg:text-5xl xl:text-6xl font-semibold'}>The golden standard of influencer culture.</div>
          <div className={'flex flex-wrap mt-16 md:ml-16 md:mr-16'}>
            <div className={'w-full md:w-6/12 md:pr-12'}>
              <div className={'text-xl'}>Join our community to grow yours.</div>
              {Buttons()}
              <div className={'lg:ml-16 mt-12 md:mt-24 mb-12'}><div className={'bg-cover bg-center rounded-2xl'} style={{paddingTop:'125%', backgroundImage:'url("/page/usp_i.png")'}}></div></div>
            </div>
            <div className={'w-full md:w-6/12 mt-12 md:mt-0'}>
              <div className={'mb-8'}>{block({t:'Easily connect with businesses', d:'Communicate, collaborate and partner with the brands you love.', c:'#eafbff'})}</div>
              <div className={'lg:mr-24 mb-8'}>{block({t:'Influencer Privilege Discounts', d:'Don’t just shop, rather shop and avail influencer privilege discounts.'})}</div>
            </div>
          </div>
          <div className={'md:ml-16'}>
            <div className={'flex flex-wrap mt-2 lg:ml-48'}>
              <div className={'w-full md:w-6/12 md:pr-12 '}>{block({t:'Incentivize your passion', d:'Use your passion and get rewarded for making quality content.', c:'#eafbff'})}</div>
              <div className={'w-full md:w-6/12 mb-8 lg:-mt-12'}>{block({t:'Real time dashboard', d:'Track, Manage and Analyse your collaborations.'})}</div>
            </div>
          </div>
        </div>
        <div className={'absolute bottom-0 left-0 mb-24 z-0'}><img src={'/page/Usp_el2.png'}/></div>
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

    const slide = ({title, desc, img}) => {
      return(
        <div className={'flex flex-wrap items-center px-8 md:px-16 py-16 pb-20 overflow-hidden'} style={{minHeight:'600px'}}>
          <div className={'w-full md:w-5/12 md:pr-24'}>
            <h1 className={'text-3xl lg:text-5xl font-semibold mb-4 md:mb-8'}>{title}</h1>
            <div className={'md:mr-24 text-md md:text-xl'}>{desc}</div>            
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
    
    let dashboard=(<div className={'relative'}><div className={"md:ml-32 -mr-32 border-4 border-gray-900 rounded-2xl overflow-hidden"}><img src="/page/platform_dashboard2.png"/></div></div>)
    let campaign=(<div className={'relative'}><div className={"overflow-hidden"}><img src="/page/platform_campaign.png"/></div></div>)
    let sales=(<div className={'relative'}><div className={" -mr-48 overflow-hidden"}><img src="/page/platform_sales.png"/></div></div>)
    let collab=(<div className={'relative'}><div className={s.shadow+" rounded-2xl md:-mr-48 overflow-hidden"}><img src="/page/platform_collab2.png"/></div></div>)
    let product=(<div className={'relative'}><div className={"md:ml-32 -mr-32 border-4 border-gray-900 rounded-2xl overflow-hidden"}><img src="/page/platform_product.png"/></div></div>)
    let chat=(<div className={'relative'}><div className={s.shadow+" rounded-2xl overflow-hidden "}><img src="/page/platform_chat2.png"/></div></div>)

    
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
            <SwiperSlide>{slide({title:'Powered by the YellowCollar platform.', desc:'Get the full overview of your products, collaborations and progress.', img:dashboard})}</SwiperSlide>
            <SwiperSlide>{slide({title:'Easy collaboration with businesses.', desc:'A new quick and efficient way to collaborate with businesses.', img:collab})}</SwiperSlide>
            <SwiperSlide>{slide({title:'Easy communication with businesses.', desc:'Directly communicate with business on our platform.', img:chat})}</SwiperSlide>   
            {/*<SwiperSlide>{slide({title:'Generate, Track and Manage Collaborations.', desc:'For the first time ever, sell your products exclusively to influencers.', img:collab})}</SwiperSlide>  */}          
          </Swiper>
        </div>
      </div>
    )
  } 
  
  let Faq = () => {  
     let desc1=(
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
    let questions_=(<Accordion {...{
      items:[
        {t:'Why is YellowCollar the best platform for influencers and businesses? ', d:desc1},
        {t:'How to sign up as an influencer with YellowCollar ?', d:(<div>Click on login or sign-up button on the website and simply input your details. Then receive a verification email to confirm. That’s it you are done.</div>)},
        {t:'How can one avail of influencer privilege discounts? ', d:'Simply, make YellowCollar your go to shopping portal because products on our platform are on discounts exclusively for you.'},
        {t:'How to send collaboration requests to brands?', d:'Once you have bought a product a collaboration request button will get active on the product page. Simply click on the button and wait for a brand to respond.'},
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
          {intro()}
          {usp()}
          {<Product/>}
          <Faq />
      </div>  
    </Guest>  
  )
}
export default com
