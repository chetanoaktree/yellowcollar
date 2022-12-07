//import seo from '../seo';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import s from './nav.module.scss';
import Button from './button';
const com = ({home, logoText, isLogged, logoutHandler, items, loggedItems}) => {
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
          <div className={s.left}>
            <Link href={home}><div className={s.logo}>{logoText}</div></Link> 
            <div className={s.menu}>
              {items_}
            </div>   
          </div>
          <div className={s.middle}>
            
          </div>
          <div className={s.right}>
            {userBtn}
          </div>
        </div>
      </div>
    )
  }else{
    return (<div>loading...</div>)
  }
}
export default com
