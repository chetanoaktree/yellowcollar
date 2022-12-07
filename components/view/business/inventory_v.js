import React, { useState, useEffect } from 'react';
import Inventory from '../../../ui/lib/view/business/inventory_u';
import getUser from '../../get/user';
import { usePage } from "/ui/lib/hooks/usePage";
import {extract_items} from '../../get/search';

import process from '../../process';
//import {rejectHandler, acceptHandler, collabAgainHandler} from './action';
import axios from 'axios';

const com = ({id, ...props}) => {  
   
  const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true 
  //args.showfooter=false 

  const page=usePage() 
  const[isArgs, setArgs] = useState(args)    
  
  const getData = async (i={}) => {          
    let user=getUser()
    console.log('user', user)
    page.showLoading("guest")
    const inventory = await axios.post(process.env.API+'/api/business/inventory/', {business_id:user.id, ...i});
    console.log('inventory_data2', inventory.data)

    setArgs((prev)=>({...prev, user, items:inventory.data}))   
    page.hideLoading()       
  } 

  useEffect(() => { 
     getData()   
  }, []);

  const updateHandler = async (i) => {
    /*const {query}=i 
    if(query){
      let reset={query:'', product_status:'', product_name:'', product_id:''}
      let d={} 
      let f=''
      console.log("query", query)     
       
      var product_status_match = query.match(/product_status:[\w]+/g);
      var product_match = query.match(/product:[\w]+/g);
      var product_id_match = query.match(/product_id:[\w]+/g);

      console.log("product_match", product_match) 
      console.log("product_status", product_status_match) 
      console.log("product_match", product_match) 
      if( product_status_match || product_id_match || product_match) {
        i=reset
      }
      
      if( product_status_match && product_status_match[0]) {
        f=product_status_match[0].replace("product_status:",'').toLowerCase()
        i.product_status={label:f, value:f}       
      }  

      if( product_match && product_match[0]) {
        f=product_match[0].replace("product:",'').toLowerCase()
        i.product_name=f   
      }
      if( product_id_match && product_id_match[0]) {
        f=product_id_match[0].replace("product_id:",'').toLowerCase()
        i.product_id=f   
      }   
             
    }
    console.log("i", i)*/
    i=extract_items(i, [
      {find:'product_status', get:'product_status', get_type:'object'},
      {find:'product', get:'product_name', get_type:'string'},
      {find:'product_id', get:'product_id', get_type:'string'}
    ]) 
    getData(i)     
  }  

  const product_status_options=[
    {label:'All', value:''},    
    {label:'Draft', value:'draft'},  
    {label:'Published', value:'published'},    
  ]

  return (
    <Inventory {...isArgs}  {...{product_status_options, updateHandler}}></Inventory>
  )
}
export default com
