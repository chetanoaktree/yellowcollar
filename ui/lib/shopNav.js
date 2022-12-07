//import seo from '../seo';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import s from './shopNav.module.scss';
import Button from './button';
const com = ({logoText, isLogged, logoutHandler, items, loggedItems}) => {
  let items_
  const userBtn = isLogged === true ? (<Button clickHandler={logoutHandler} type="action">Log Out</Button>) : (<Button to="/login" type="action">Log In</Button>)
 
  items_=items?.map(({label, to}, index)=>{
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
          <div className={s.menu}>
            {items_}
          </div>   
        </div>        
      </div>
    </div>
  )
}
export default com
