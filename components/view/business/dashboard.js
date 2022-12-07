import React, { useState, useEffect } from 'react';
import Dashboard from '../../../ui/lib/view/business/dashboard';
import getUser from '../../get/user';
import Handlers from './handlers/collab';
import { usePage } from "/ui/lib/hooks/usePage";
import process from '../../process';
import {rejectHandler, acceptHandler, performanceHandler, collabAgainHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  
   
  const args = process() 
  args.showfooter=false  

  

  const router = useRouter()
  const page=usePage()
  const[isArgs, setArgs] = useState(args) 
  

  const getData = async () => {          
    let user=getUser()
    //let handlers=Handlers({router, })
    //console.log('user', user)
    page.showLoading("guest")
    const collabs = await axios.post(process.env.API+'/api/business/collab/', {business_id:user.id});
    //console.log('collabs_data2', collabs.data)   

    const stats = await axios.post(process.env.API+'/api/business/stats', {business_id:user.id});
    //console.log('stats', stats.data)   

    const widgets={
      items:[
        {label:'Number of Collaborations', value:stats.data.collabs},
        {label:'Collaboration Requests',value:stats.data.collabs_requests},
        {label:'Sales generated', value:stats.data.sales},
        {label:'Sales Total',  value:stats.data.platform_sales_total+" Rs"},
      ]
    }  

    setArgs({...isArgs, items:collabs.data.items, tresholds:collabs.data.tresholds, user, widgets}) 
    page.hideLoading()      
  } 
  const performanceHandler = async (i)=>{   
      //const collab = await axios.post(process.env.API+'/api/business/collab/action', i);
      //console.log('accept_data', collab.data) 
      return {}   
  }

  const refreshHandler = async (i)=>{    
    getData()  
  } 

  useEffect(() => { 
     getData()   
  }, []); 

  return (
    <Dashboard {...isArgs}  {...{refreshHandler, acceptHandler, rejectHandler, performanceHandler, collabAgainHandler}}></Dashboard>
  )
}
export default com
