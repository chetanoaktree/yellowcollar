import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Subscription from '../../blocks/com/subscription';
import s from './subscription_u.module.scss';




const com = ({test, ...props}) => {
  props.showShopNav=false 
  props.navArgs.translucent=false 
  props.navArgs.noborder=false 
  return (
    <Layout {...props} viewType="influencer_app"> 
      <div className={s.main} style={{backgroundImage:'url("/images/pexels-shvets-production-7525184.jpg")'}}>  
        <div className={s.inner}>
          <h3>Subscription</h3>
          <Subscription {...props}/>
        </div>
      </div>
    </Layout>    
  )
}
export default com
