import React, { useState, useEffect } from 'react';
import InfluencerCollab from './influencer/collab';
import BusinessCollab from './business/collab_v';
import process from '../process';
import axios from 'axios';

const com = ({id, ...props}) => {   
  const args = process()    
  let collab
  if(args.userType=='business'){
    collab=<BusinessCollab id={id} ></BusinessCollab>
  }else if(args.userType=='influencer'){
    collab=<InfluencerCollab id={id} ></InfluencerCollab>
  }  
  return (
    <>{collab}</>
  )
}
export default com
