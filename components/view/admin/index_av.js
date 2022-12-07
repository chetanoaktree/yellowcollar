import React, { useState, useEffect } from 'react';
import Dashboard from '../../../ui/lib/view/admin/index_au';
import getUser from '../../get/user';
import process from '../../process';
//import {rejectHandler, acceptHandler, performanceHandler, collabAgainHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  
  const args = process()   
  if(args.user && args.user.userType!="admin")  return (<div></div>)
  const[isArgs, setArgs] = useState(args) 
 
  const getData = async () => {          
    let user=getUser()    
    console.log('user', user)
    const collabs = await axios.post(process.env.API+'/api/admin/action', {action:'get_collabs'});
    console.log('collabs_data2', collabs.data) 
    setArgs((prev)=>{return {...prev, collabs:collabs.data.items, tresholds:collabs.data.tresholds, user}})       
  } 
  const matchHandler= async (i)=>{
    console.log('match', i) 
    const match = await axios.post(process.env.API+'/api/admin/action', i);
    console.log('match_data', match.data)    
  }
  const handler= async (i)=>{
    console.log('handler', i) 
    const res = await axios.post(process.env.API+'/api/admin/action', i);
    console.log('handler_data', res.data) 
    getData()     
  }
  const getHandler= async (i)=>{
    console.log('handler', i) 
    const res = await axios.post(process.env.API+'/api/admin/action', i);
    console.log('handler_data', res.data) 
    return  res.data  
  }
  
  const refreshHandler= (i)=>{
    getData()   
  }
  useEffect(() => { 
     getData()   
  }, []); 

  return (
    <Dashboard {...isArgs}  matchHandler={matchHandler} handler={handler} getHandler={getHandler}></Dashboard>
  )
}
export default com
