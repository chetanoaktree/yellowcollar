import React, { useState, useEffect } from 'react';
import InfluencerCollabs from './influencer/collabs';
import BusinessCollabs from './business/collabs';
import process from '../process';
import axios from 'axios';

const com = ({id, ...props}) => { 
  let collabS_  
  const args = process() 
  if(args.userType=='business'){
    collabS_=<BusinessCollabs id={id} ></BusinessCollabs>
  }else if(args.userType=='influencer'){
    collabS_=<InfluencerCollabs id={id} ></InfluencerCollabs>
  }  
  return (
    <>{collabS_}</>
  )
}
export default com
