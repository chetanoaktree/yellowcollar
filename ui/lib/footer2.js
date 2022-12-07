//import seo from '../seo';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import s from './footer2.module.scss';
import Button from './button';
import SocialMedia from './social_media';

import {ExternalLink, MenuItem, MenuItems, Expand, DropDown} from './view/_blocks/menu_ui'

const com = (props) => {
  let {
    home, logoText, isLogged, items, socialMediaArgs, navArgs
  } = props

  let {    
    platformItems, solutionsItems, resourcesItems, companyItems, policiesItems
  } = navArgs
  //Logo_symbol_black_outline.svg
  let items_='12'
  let sm_=''
  const userBtn = isLogged === true ? (<Button clickHandler={logoutHandler} type="action">Log Out</Button>) : (<Button to="/login" type="action">Log In</Button>)
 
  
  let menuItems2 = () => {
    let items_=(
      <div className={"mr-4 whitespace-nowrap w-full -mx-2 py-3 "}>
        <Expand {...{items:(<MenuItems items={platformItems}   c={'py-2 px-2'}/>), trigger:'Platform'}} />
        <Expand {...{items:(<MenuItems items={solutionsItems}   c={'py-2 px-2'}/>), trigger:'Solutions'}} />
        <Expand {...{items:(<MenuItems items={companyItems}   c={'py-2 px-2'}/>), trigger:'Company'}} />
        <Expand {...{items:(<MenuItems items={resourcesItems}   c={'py-2 px-2'}/>), trigger:'Resources'}} />
        <Expand {...{items:(<MenuItems items={policiesItems}   c={'py-2 px-2'}/>), trigger:'Policies'}} />
      </div>
    )
    return items_ 
  }
  
  if(items){
    items_=items.map(({label, to}, index)=>{
      return(
        <Link key={index} href={to}>
          <div className={s.item} >
            {label}
          </div>
        </Link>
      )
    })
    sm_=socialMediaArgs.items.map((i, index)=>{ 
      i.to=i.href    
      return(
        <div key={index}><ExternalLink {...i}/></div>
      )
    })
    return (
      <div className={s.main}>
        <div className={s.inner+' px-3 md:px-12 py-12'}>
          <div className={'flex flex-wrap w-full relative px-6 lg:px-0'}>
            <div className={'w-full md:w-3/12'}> 
              <div><img src='/Logo_symbol_black_outline.svg' /></div> 
              <Button to='https://outlook.office365.com/owa/calendar/YellowCollarDemo@yellowcollar.club/bookings/' target='blank' type="action2" color="yellow" size="md" className={'mt-12'}><div className="flex items-center"><span className="mr-4">Get a demo </span><img src="/images/Arrow2_right_light.svg"/></div></Button>             
            </div>
            <div className={'w-full md:w-3/12'}> 
              <div className={s.menu+" mt-12 md:mt-32"}>
                {menuItems2()}
              </div>
            </div>
            <div className={'w-full md:w-6/12 mt-12 md:mt-32 flex md:justify-end'}>  
              <div>
                <div className={"text-7xl font-semibold mb-6"}>Get in Touch.</div>   
                <div className={"flex flex-wrap mb-6"}>  
                  <div className=" ">Email us at:  <a className="font-extrabold" data-auto-recognition="true" href="mailto:info@yellowcollar.club">info@yellowcollar.club</a></div> 
                  {/*<div>call us on:  +91 9717663609</div>*/}
                </div> 
                <div className={'opacity-50 mt-12 '}>Follow YellowCollar:</div>
                <div className={s.sm+" mt-4 mb-6  md:w-8/12"}>
                  {sm_}
                </div> 
              </div>           
            </div>             
          </div> 
          <div className={'w-full mt-12 px-6 lg:px-0'}>
              @ Yellow Collar. 2022.
          </div>           
        </div>
      </div>
    )
  }else{
    return (<div>loading...</div>)
  }
}
export default com
