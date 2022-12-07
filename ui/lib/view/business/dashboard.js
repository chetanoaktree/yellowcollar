import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Widgets from '../../blocks/com/widgets';
import Collabs from '../../blocks/business/collabs';
import Loading from '../../blocks/com/loading';
import s from './dashboard.module.scss';
import Moment from 'moment';



const com = ({item, widgets, ...props}) => {  
  
  return (
    <Layout {...props} viewType="business_app"> 
      <div className={s.main}>
        <Widgets {...widgets}/>
        <div className={s.items+' mb-12'}>
          <h2 className={s.section_title}>Collaboration Requests</h2>         
          <Collabs { ...props} showOnly={'requested'} showHeading={false}/>
        </div>
        <div className={s.items}>
          <h2 className={s.section_title}>Previous Collaborations</h2>         
          <Collabs { ...props} showOnly={"others"} showHeading={false}/>
        </div>        
      </div>
      <Loading id="dashboard"></Loading>
    </Layout>    
  )
}
export default com
