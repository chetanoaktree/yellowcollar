import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Collab from '../../../ui/lib/view/influencer/collab';
import process from '../../process';
//import getUser from '../../get/user';
import { process_collab }  from '../../get/collab';
import { usePage } from "/ui/lib/hooks/usePage";
import axios from 'axios';
import {messageHandler, acceptHandler, rejectHandler, liveHandler, completedHandler, completedRequestHandler} from './action';
import { useRouter } from 'next/router';

import {ikHandler} from '../../get/image_v';

const com = ({id, ...props}) => {   

  const router = useRouter(); 
  const page=usePage()

  const dispatch = useDispatch();  
  const {user} = useSelector((state) => state.pageData)

  const args = process()
  //args.navArgs.home="/app/shop/"
  args.showShopNav=false 
  args.showfooter=false  
  //args.navArgs.fullWidth=true
  
  const[isItem, setItem] = useState({})
  const[isItems, setItems] = useState([])
  const[isArgs, setArgs] = useState(args)

  
  const getData2 = async () => { 
   // let user=getUser()
    //console.log('user', user)     
    const collabs = await axios.post(process.env.API+'/api/influencer/collab/', {userType:user.userType, influencer_id:user.id});
    console.log('collabs_data', collabs.data)
    //setItems(collabs.data)   
    setArgs((prev)=>{return {...prev, items:collabs.data.items, tresholds:collabs.data.tresholds}})      
  } 
  const getData3 = async (collab_id) => {       
    id= id ? id : collab_id
    if(!collab_id) page.showLoading("guest")
    const collab = await axios.post(process.env.API+'/api/influencer/collab/'+id, {userType:user.userType, influencer_id:user.id});
    console.log('collab_data', collab.data) 
    //setItem(collab.data)  
    if(collab.data && collab.data.id){
      setArgs((prev)=>{
        //collab.data=process_collab(collab.data, prev.tresholds)
        let next= {...prev, item:collab.data}
        return next
      }) 
    }
    if(!collab_id) page.hideLoading()
  } 

  
  useEffect(async() => { 
    if(id){        
      //console.log('collab_id', id)
      await getData2()
      await getData3()    
    }  
  }, [id]); 

  const refreshHandler = async (i)=>{    
    getData3(i.collab_id)  
  } 

  
  const breakdownHandler = async (event, item, e)=>{
    console.log("breakdownHandler", event)
    console.log('/app/collab/'+item.id+'/breakdown')
    const win = window.open('/app/collab/'+item.id+'/breakdown', "_blank");
    win.focus();   
  }
  const performanceHandler = async (event, item, e)=>{
    console.log("performanceHandler", event)
    console.log('/app/collab/'+item.id+'/performance')
    const win = window.open('/app/collab/'+item.id+'/performance', "_blank");
    win.focus();   
  }

  const handler = async (i) =>{  
    console.log("handler data", i)       
    const res = await axios.post(process.env.API+'/api/influencer/collab/action', {userType:user.userType, influencer_id:user.id, ...i});
    const data = res.data;
    console.log("handler result", data)      
    refreshHandler(id)
    return data    
  }
  

  return (
    <Collab {...isArgs}  {...{handler, ikHandler, refreshHandler, messageHandler, acceptHandler, liveHandler, completedHandler, completedRequestHandler, rejectHandler, breakdownHandler, performanceHandler}}></Collab>
  )
}
export default com
