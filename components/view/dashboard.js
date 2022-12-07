import React, { useState, useEffect } from 'react';
import InfluencerDashboard from './influencer/dashboard_v';
import BusinessDashboard from './business/dashboard_v';
import process from '../process';
import axios from 'axios';

const com = ({id, ...props}) => { 
  let collabS_  
  const args = process() 
  if(args.userType=='business'){
    collabS_=<BusinessDashboard id={id}  ></BusinessDashboard>
  }else if(args.userType=='influencer'){
    collabS_=<InfluencerDashboard id={id}  ></InfluencerDashboard>
  }  
  return (
    <>{collabS_}</>
  )
}
export default com
