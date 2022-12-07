import React, { useState, useEffect } from 'react';
import InventoryEdit from '../../../ui/lib/view/business/inventory-edit_u';
import getUser from '../../get/user';
import {ikHandler} from '../../get/image_v';
import { usePage } from "/ui/lib/hooks/usePage";

import process from '../../process';
//import {rejectHandler, acceptHandler, collabAgainHandler} from './action';
import axios from 'axios';

const com = ({id, ...props}) => {  
  if (!id) return false
  let loaded=false
  const args = process()
  if(args.user && args.user.userType!="business")  return (<div></div>)
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true 
  args.showfooter=false 
  args.isLoaded=false

  let campaign_init={
    i_gender:'', i_gender_w:.5,
    i_followers:'', i_followers_w:.5,
    i_verified:'', i_verified_w:.5,
    i_industry:'', i_industry_w:.5,
    gender:0, gender_w:0.5, 
    region:'', region_w:.5, 
    age_group:'', age_group_w:.5,
    product_url:''
  }

  const page=usePage()
  const [isCount, setCount] = useState(0)
  const [isArgs, setArgs] = useState(args)  
  const [isItem, setItem] = useState({id:'', title:'', sku:0, description:' ', categories:[],  price:0, discount:'', stats:{}, discountUnit:[], meta:{available_units:0}, img:'', }) 
  const [isCampaign, setCampaign] = useState(campaign_init) 
  const [isCategories, setCategories] = useState([]) 
  const [isExtra, setExtra] = useState([]) 
  const [isImages, setImages] = useState([]) 
  
  const getData = async () => {  
    let user=getUser()     
    page.showLoading("guest")
    let obj={}
    
    
    if(id!='new' && isArgs.isLoaded===false) {
      const inventory = await axios.post(process.env.API+'/api/business/inventory/'+id, {business_id:user.id});     
      console.log('inventory_data', inventory.data)
      if(inventory.data){
        let item=inventory.data.product
        let campaign=inventory.data.campaign
        let extra=inventory.data.extra
        //obj.item=inventory.data.product
        //obj.campaign=inventory.data.campaign

        if(item){
          const images = await axios.post(process.env.API+'/api/business/inventory/action', {action:'get_images', product_id:item.id});
          console.log('images_data', images.data)
          //obj.images=images.data 
          setImages((prev)=>images.data) 
        } 
        setItem((prev)=>item) 
        setCampaign((prev)=>({...prev, ...campaign})) 
        setExtra((prev)=>({...prev, ...extra}))
      }
    }

    const categories = await axios.post(process.env.API+'/api/business/inventory/action', {action:'get_categories'});
    console.log('categories_data', categories.data) 
    setCategories((prev)=>categories.data)    
    
    setArgs((prev)=>({...prev, user, ...obj}))  
    page.hideLoading()       
  }  
  const refreshHandler=async ()=>{ 
    let user=getUser()  
    page.showLoading("guest")
    const inventory = await axios.post(process.env.API+'/api/business/inventory/'+id, {business_id:user.id});
    //console.log('inventory_data', inventory.data)
    page.hideLoading()

    setItem((prev)=>inventory.data.product) 
    setCampaign((prev)=>({...prev, ...inventory.data.campaign}))
    setExtra((prev)=>({...prev, ...inventory.data.extra}))
    //setArgs((prev)=>({...prev, user, item:inventory.data.product, campaign:inventory.data.campaign}))    
  }
  const handler=async (i)=>{ 
    let user=getUser()   
    console.log('data', i)
    const result = await axios.post(process.env.API+'/api/business/inventory/action', {business_id:user.id, ...i});
    console.log('result_data', result.data)
    return result.data
  }
  
  const saveHandler=async (i)=>{   
    console.log('save', i)
    const inventory = await axios.post(process.env.API+'/api/business/inventory/action', i);
    console.log('save_data', inventory.data)
    return inventory.data
  }
  const deleteHandler=async (i)=>{   
    console.log('delete', i)
    const result = await axios.post(process.env.API+'/api/business/inventory/action', i);
    console.log('delete_data', result.data)
    return result.data
  }

  
  const getImagesHandler = async (i) => {    
    const images = await axios.post(process.env.API+'/api/business/inventory/action', i);
    console.log('images_data', images.data) 
    setImages((prev)=>images.data)    
    //if(images.data) setArgs((prev)=>({...prev, images:images.data }))    
  } 
  const deleteImageHandler = async (i) => {    
    const result = await axios.post(process.env.API+'/api/business/inventory/action', i);
    console.log('delete_data', result.data)    
    //setImages((prev)=>result.data) 
    //setArgs((prev)=>({...prev, images:images.data }))    
  }
  const productImageHandler = async (i, config) => {    
    const result = await axios.post(process.env.API+'/api/com/image_upload/action', i, config);
    console.log('product_image_data', result.data) 
    refreshHandler()     
  } 

  const imageHandler = async (i) => {
    console.log("i", i)
    const result = await axios.post(process.env.API+'/api/com/image_upload/action', i);
    console.log('image_data: ', result.data)  
    return result.data
  } 
  

  useEffect(() => {     
     getData()      
     return () => { 
      setCount(0)
     }
  }, [id]); 
  
  return (    
    <InventoryEdit  {...isArgs} {...{handler, imageHandler, ikHandler, campaign_init, isCampaign, setCampaign, isExtra, setExtra, isData:isItem, setData:setItem, categories:isCategories, images:isImages, refreshHandler, saveHandler, deleteHandler, getImagesHandler, deleteImageHandler, productImageHandler}}></InventoryEdit>
  )
}
export default com
