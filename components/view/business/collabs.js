import React, { useState, useEffect } from 'react';
import Collabs from '../../../ui/lib/view/business/collabs';
import getUser from '../../get/user';
import {extract_items} from '../../get/search';
import { usePage } from "/ui/lib/hooks/usePage";

import process from '../../process';
import {rejectHandler, acceptHandler, collabAgainHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  
   
  const args = process()
  //args.navArgs.home="/app/shop/"
  args.showShopNav=true 
  args.showfooter=false  

  const router = useRouter(); 
  const page=usePage()
  const[isArgs, setArgs] = useState(args)  

  const getData = async (i={}) => {          
    let user=getUser()
    console.log('user', user)
    page.showLoading("guest")
    const collabs = await axios.post(process.env.API+'/api/business/collab/', {status:'others', business_id:user.id, ...i});
    console.log('collabs_data2', collabs.data)

    setArgs({...isArgs, items:collabs.data.items, tresholds:collabs.data.tresholds, user, })  
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

  const updateHandler = async (i) => {    
    i=extract_items(i, [
      {find:'collab_status', get:'collab_status', get_type:'object'},
      {find:'product', get:'product_name', get_type:'string'},
      {find:'product_id', get:'product_id', get_type:'string'}
    ]) 
    //console.log("i", i)
    getData(i)     
  }   

  const collab_status_options=[
    {label:'All', value:''},    
    {label:'Draft', value:'draft'},  
    {label:'Published', value:'published'},    
  ]

  return (
    <Collabs {...isArgs}  {...{collab_status_options, updateHandler, refreshHandler, acceptHandler, rejectHandler, performanceHandler, collabAgainHandler}}></Collabs>
  )
}
export default com
