import React, { useState, useEffect } from 'react';
import InfluencerProfile from './influencer/profile';
import BusinessProfile from './business/profile';
import process from '../process';
import axios from 'axios';

const com = ({id, ...props}) => {   
  const args = process()  
  let collab
  if(args.userType=='business'){
    collab=<BusinessProfile id={id}></BusinessProfile>
  }else if(args.userType=='influencer'){
    collab=<InfluencerProfile id={id}></InfluencerProfile>
  }  
  return (
    <>{collab}</>
  )
}
export default com
