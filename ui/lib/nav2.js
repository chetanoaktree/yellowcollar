//import seo from '../seo';
import React, { useState, useEffect } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useRouter } from 'next/router'
import Link from 'next/link'
import s from './nav2.module.scss'
import Button from './button'
import Notifications from './blocks/com/notifications'
import Cart from './blocks/com/cart'

import {get_thumb_src} from './get/image'

const com = (props) => {
  let {home='/', user, viewType, fullWidth, influencerHome, translucent, logoText, logoImg, noborder, isLogged, userType, logoutHandler, items, loggedItems, actionHref}=props
  const {asPath, pathname} = useRouter()  
  const router = useRouter() 
  //console.log("nav props", props)
  let items_='12'
  let UserProfileBtn=false

  const [isUserPopup, setUserPopup] = useState(false)
  //console.log("Nav User", user)
  //const userBtn = isLogged === true ? (<Button clickHandler={logoutHandler} type="action">Log Out</Button>) : (<Button to="/login" type="action">Log In</Button>)
  //const userBtn = isLogged === true ? (<Button clickHandler={logoutHandler} type="action">Log Out</Button>) : (<Button to={actionHref} type="action" target="_blank">Get Started</Button>)
  
  const getStarted = (<Button to={actionHref} type="action" target="_blank">Get Started</Button>)
  const loginSignup = (<Button to={'/auth'} type="action" >Login</Button>)
  const logoutBtn = (<Button className="block" clickHandler={logoutHandler} type="text" size="sm" color="white">Log Out</Button>) 
 //console.log("Trigger", Notifications)
 //const home_ = isLogged === true ? influencerHome : home
 const home_ = isLogged === true ? home : home 
 let picSrc
 let userItems
 let pic
  if(userType=="admin"){
    home_="/admin/dashboard"
    userItems=(<div className={s.links}>   
      <Link href="/admin/dashboard"><a className={s.link} >Dashboard</a></Link>
      <Link href="/admin/orders"><a className={s.link} >Orders</a></Link>     
      <Link href="/admin/collab_requests"><a className={s.link} >Collab Requests</a></Link>
      <Link href="/admin/collaborations"><a className={s.link} >Collaborations</a></Link>
      <Link href="/admin/transactions"><a className={s.link} >Transactions</a></Link> 
      <Link href="/admin/invoices"><a className={s.link} >Invoices</a></Link>
      <Link href="/admin/settlements"><a className={s.link} >Settlements</a></Link> 
      <Link href="/admin/subscriptions"><a className={s.link} >Subscriptions</a></Link>      
      <Link href="/admin/influencers"><a className={s.link} >Influencers</a></Link>
      <Link href="/admin/businesses"><a className={s.link} >Businesses</a></Link>
      <Link href="/admin/products"><a className={s.link} >Products</a></Link>
      <Link href="/admin/coupons"><a className={s.link} >Coupons</a></Link>
      <Link href="/admin/signup_codes"><a className={s.link} >Signup Codes</a></Link>
      <Link href="/admin/variable"><a className={s.link} >Variable</a></Link>
      <Link href="/admin/pages"><a className={s.link} >Pages</a></Link>                        
    </div>)
    pic=(<div className={s.user_trigger} onClick={() => setUserPopup(true)}><img src="/images/User_light.svg"/></div>)
  }else{
    if(userType=="new_user"){
      userItems=(<div className={s.links}>
        <Link href="/onboarding/"><a className={s.link} >OnBoarding</a></Link>              
        <Link href="/app/feedback/"><a className={s.link} >Feedback</a></Link> 
      </div>)

    }else if(userType=="user"){
      userItems=(<div className={s.links}>                 
        <Link href="/feedback/"><a className={s.link} >Feedback</a></Link> 
      </div>)

    }else if(userType=="business"){
      userItems=(<div className={s.links}>
        <Link href="/app/"><a className={s.link} >Dashboard</a></Link> 
        <Link href="/app/subscription"><a className={s.link} >Subscription</a></Link> 
        <Link href="/app/collab"><a className={s.link} >Collaborations</a></Link>
        <Link href="/app/sales"><a className={s.link} >Sales</a></Link> 
        <Link href="/app/inventory"><a className={s.link} >Inventory</a></Link>         
        <Link href="/app/profile"><a className={s.link} >Profile</a></Link>          
        <Link href="/app/feedback"><a className={s.link} >Feedback</a></Link>                       
      </div>)
    }else{
      userItems=(<div className={s.links}>
        <Link href="/app/"><a className={s.link} >Dashboard</a></Link>  
        <Link href="/app/subscription"><a className={s.link} >Subscription</a></Link>            
        <Link href="/app/collab"><a className={s.link} >Collaborations</a></Link>
        <Link href="/app/orders"><a className={s.link} >My Orders</a></Link>   
        <Link href="/app/profile"><a className={s.link} >Profile</a></Link> 
        <Link href="/app/feedback"><a className={s.link} >Feedback</a></Link>                       
      </div>)
    }
    
    if(user && user.profile_pic){
      picSrc='/db_images/'+ user.profile_pic;
    }else{
      picSrc='/images/User_light.svg'      
    }
    if(user && user.image) picSrc=get_thumb_src(user.image)
    pic=(<div className={s.user_trigger} onClick={() => setUserPopup(true)}><div className={"p-2"} style={{backgroundImage:'url("'+picSrc+'")'}}></div></div>)
  }
  if(isLogged === true){
    UserProfileBtn=()=>{
      return (
        <div className={s.user}>
          {pic}
          {isUserPopup && (
            <div className={s.user_content_area} >
              <ClickAwayListener onClickAway={() => setUserPopup(false)}>
                <div className={s.user_content}>
                    {userItems}              
                    <div className={s.action_area}>{logoutBtn}</div>
                </div>
              </ClickAwayListener>
            </div>
          )}
        </div>
      )
    }
  }
  

  let c_
  if(fullWidth==true) c_+=' '+s.fullWidth
  if(viewType) c_+=' '+s[viewType]
  if(noborder==true) c_+=' '+s['noborder']
  if(translucent==true)  c_+=' '+s['translucent']
  
  
  if(items){
    items_=items.map(({label, to, match}, index)=>{
      let c2_=asPath === to ? s.active : ''
      if(asPath === to){
        c2_=s.active
      }else if(match && match.includes(pathname)){
        c2_=s.active 
      }else{
        c2_=''
      }
      
      return(
        <Link key={index} href={to}>
          <div className={s.item+' '+c2_} >
            {label}
          </div>
        </Link>
      )
    })
    return (
      <div className={s.main+' '+c_}>
        <div className={s.inner}>
          <div className={s.left}>
            <Link href={home_}><div className={s.logo}><img src={logoImg}/></div></Link>             
          </div>{noborder}
          <div className={s.middle}>
            <div className={s.menu+" hidden md:flex"}>
              {items_}
            </div>   
          </div>
          <div className={s.right}>   
            {(isLogged && userType=="influencer") && <Cart viewType={viewType}/>} 
            {isLogged && <Notifications viewType={viewType}/>}
            {UserProfileBtn!==false && <UserProfileBtn/>}
            {/*UserProfileBtn===false && getStarted*/}
            {UserProfileBtn===false && loginSignup}
          </div>
        </div>
        <div className={s.menu_res+" flex flex-wrap md:hidden px-2 bg-gray-900 bg-opacity-5"}>
          {items_}
        </div>
      </div>
    )
  }else{
    return (<div>loading...</div>)
  }
}
export default com
