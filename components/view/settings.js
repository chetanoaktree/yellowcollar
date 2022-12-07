import React, { useState, useEffect } from 'react';
import InfluencerSettings from './influencer/settings_v';
import BusinessSettings from './business/settings_v';
import process from '../process';
import axios from 'axios';

const com = ({id, ...props}) => {   
  const args = process()  
  let collab
  if(args.userType=='business'){
    collab=<BusinessSettings id={id} ></BusinessSettings>
  }else if(args.userType=='influencer'){
    collab=<InfluencerSettings id={id} ></InfluencerSettings>
  }  
  return (
    <>{collab}</>
  )
}
export default com
