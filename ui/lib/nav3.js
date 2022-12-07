//import seo from '../seo';
import React, { useState, useEffect } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useRouter } from 'next/router'
import Link from 'next/link'
import s from './nav3.module.scss'
import Button from './button'
import Notifications from './blocks/com/notifications'
import Cart from './blocks/com/cart'
import {MenuItem, MenuItems, Expand, DropDown} from './view/_blocks/menu_ui'

import {get_thumb_src} from './get/image'

const com = (props) => {
  let {
    home='/', user, viewType, fullWidth, influencerHome, translucent, logoText, logoImg, noborder, isLogged, userType, logoutHandler, items, loggedItems, actionHref,
    platformItems, solutionsItems, resourcesItems, companyItems, influencerItems
  }=props
  const {asPath, pathname} = useRouter()  
  const router = useRouter() 
  //console.log("nav props", props)
  let items_='12'
  let UserProfileBtn=false
  

  const [isUserPopup, setUserPopup] = useState(false)
  
  //console.log("asPath", asPath)
  //const userBtn = isLogged === true ? (<Button clickHandler={logoutHandler} type="action">Log Out</Button>) : (<Button to="/login" type="action">Log In</Button>)
  //const userBtn = isLogged === true ? (<Button clickHandler={logoutHandler} type="action">Log Out</Button>) : (<Button to={actionHref} type="action" target="_blank">Get Started</Button>)
  
  const getStarted = (<Button to={actionHref} type="action2" target="_blank">Get Started</Button>)  
  const menuTriggerBtn = (<Button clickHandler={()=>{}} className={s.menuTrigger+" ml-1 sm:ml-2 py-4 px-4 lg:hidden "}  type="hit_area" color=""><div className={s.icon}><img src="/images/Menu_trigger.svg"/></div></Button>)
  const demoBtn = (<Button to={'/get_demo'} className={"ml-1 sm:ml-2 "} type="action2" size="sm" color="black"><span className={''}>Get a demo</span></Button>)
  const loginSignup = (<Button to={'/auth'} className={"block"} type="action2" size="sm" color="yellow">Login</Button>)
  const logoutBtn = (<Button className="block" clickHandler={logoutHandler} type="text" size="sm" color="white">Log Out</Button>) 
  const creatorsBtn = (<Button className="" to={'/influencers'}  type="action2" size="sm" color="blue_pink">For creators</Button>) 
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
  
  
  let MenuItems_ = () => {
    
    return(
      <div className={"flex mr-24"}>
        <DropDown {...{items:(<MenuItems items={platformItems}/>), trigger:(<Link href='/platform'>Platform</Link>), hoverable:true}} />
        {/*<DropDown {...{items:(<MenuItems items={solutionsItems}/>), trigger:'Solutions'}}/>*/}
        <DropDown {...{items:(<MenuItems items={companyItems}/>), trigger:(<Link href='/about'>Company</Link>), hoverable:true}}/>
        <DropDown {...{items:(<MenuItems items={resourcesItems}/>), trigger:'Resources', hoverable:true}}/>
      </div>
    ) 
  }
  let menuItems2 = () => {
    let items_=(
      <div className={"mr-4 whitespace-nowrap w-full px-6 py-3 "}>
        <Expand {...{items:(<MenuItems items={platformItems}   c={'py-2 px-2'}/>), trigger:'Platform'}} />
        {/*<Expand {...{items:(<MenuItems items={solutionsItems}   c={'py-2 px-2'}/>), trigger:'Solutions'}} />*/}
        <Expand {...{items:(<MenuItems items={companyItems}   c={'py-2 px-2'}/>), trigger:'Company'}} />
        {(isLogged && userType=="influencer") &&  <Expand {...{items:(<MenuItems items={influencerItems}   c={'py-2 px-2'}/>), trigger:'Influencer'}} />} 
        <Expand {...{items:(<MenuItems items={resourcesItems}   c={'py-2 px-2'}/>), trigger:'Resources'}} />
         {UserProfileBtn===false && <div className={'mt-8 mb-4'}>{creatorsBtn}</div>}
      </div>
    )
    return(<DropDown {...{items:items_, trigger:menuTriggerBtn, hideArrow:true, pos:'right'}} />) 
  }
  
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
            <div className={s.menu+" hidden lg:flex"}>
              {isLogged && items_}
              {isLogged==false && <MenuItems_/>}
            </div>   
          </div>
          <div className={s.middle2}>
            <Link href={home_}><div className={s.logo}><img src={'/Logo_symbol_black.svg'}/></div></Link>             
          </div>{noborder}
          <div className={s.right}>   
            {isLogged==false && <div className={'mr-4'}>{menuItems2()}</div>}
            {(isLogged && userType=="influencer") && <Cart viewType={viewType}/>} 
            {isLogged && <Notifications viewType={viewType}/>}
            {UserProfileBtn!==false && <UserProfileBtn/>}
            {/*UserProfileBtn===false && getStarted*/} 
            
            {UserProfileBtn===false && <div className={'hidden sm:block md:mr-4'}>{creatorsBtn}</div>}    
            {(UserProfileBtn===false && asPath!='/influencers') && <div className={'in_scroller md:mr-6'}>{demoBtn}</div>}          
            {UserProfileBtn===false && <div className={'md:mr-2'}>{loginSignup}</div>}                          
          </div>
        </div>
        {/*<div className={s.menu_res+" flex flex-wrap md:hidden px-2 bg-gray-900 bg-opacity-5"}>
          {items_}
        </div>*/}
      </div>
    )
  }else{
    return (<div>loading...</div>)
  }
}
export default com