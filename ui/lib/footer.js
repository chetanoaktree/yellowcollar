//import seo from '../seo';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import s from './footer.module.scss';
import Button from './button';
import SocialMedia from './social_media';
const com = ({home, logoText, isLogged, items, socialMediaArgs}) => {
  let items_='12'
  const userBtn = isLogged === true ? (<Button clickHandler={logoutHandler} type="action">Log Out</Button>) : (<Button to="/login" type="action">Log In</Button>)
 
  
  
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
    return (
      <div className={s.main}>
        <div className={s.inner}>
          <div className={s.content}>  
            <div className={"flex flex-wrap justify-center items-center mb-6"}>              
              <div className=" ">Email us at:  <a className="font-extrabold" data-auto-recognition="true" href="mailto:info@yellowcollar.club">info@yellowcollar.club</a></div> 
              {/*<div>call us on:  +91 9717663609</div>*/}
            </div>         
            <div className={s.menu+" mb-6"}>
              {items_}
            </div>
            <div className={s.menu+" mb-6"}>
              <SocialMedia {...socialMediaArgs}></SocialMedia>
            </div>
            <div className={s.copy}>
                @ Yellow Collar. 2022. All Rights Reserved.
            </div>   
          </div>          
        </div>
      </div>
    )
  }else{
    return (<div>loading...</div>)
  }
}
export default com
