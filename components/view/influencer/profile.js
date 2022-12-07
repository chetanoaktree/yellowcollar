import React, { useState, useEffect } from 'react';
import Profile from '../../../ui/lib/view/influencer/profile';
import getUser from '../../get/user';
import process from '../../process';
//import {rejectHandler, acceptHandler, messageHandler, initPaymentPaidHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {   

  const router = useRouter(); 

  const args = process()
  args.showfooter=false 
  
  const[isItem, setItem] = useState({})
  const[isCollabs, setCollabs] = useState([])

  const getData = async () => {  
    let user=getUser()
    //console.log('influencer', user)    
    const influencer = await axios.post(process.env.API+'/api/com/profile/action', {action:'get_influencer', influencer_id:user.id});
    //console.log('get_influencer_data', influencer.data) 

    const collabs = await axios.post(process.env.API+'/api/com/profile/action', {action:'get_collabs', influencer_id:user.id});
    //console.log('get_collabs_data', collabs.data)        

    setItem(influencer.data) 
    setCollabs(collabs.data)    
  } 

  useEffect(() => { 
    getData()       
  }, []); 

  return (
    <Profile {...args}  item={isItem} collabs={isCollabs}>Influencer Profile</Profile>
  )
}
export default com
