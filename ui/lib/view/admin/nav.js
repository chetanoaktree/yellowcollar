//import seo from '../seo';
import React, { useState, useEffect } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useRouter } from 'next/router'
import Link from 'next/link'
import s from './nav.module.scss'
import Button from '../../button'
const com = ({home, user, logoText, isLogged, userType, logoutHandler, items}) => {
  const {asPath} = useRouter()  
  const [isUserPopup, setUserPopup] = useState(false)  

  let out=(<div>Menu</div>)

  return (
    <div className={s.main}>
      <div className={s.inner}>
        {out}
      </div>
    </div>
  )
}
export default com
