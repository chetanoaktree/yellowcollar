import React, { useState, useEffect } from 'react';
import getUser from '../../get/user';
import Cat from '../../../ui/lib/view/influencer/cat_u';
import {usePage} from '/ui/lib/hooks/usePage';
import process from '../../process';
import axios from 'axios';

let loaded=1
const com = ({cat, ...props}) => {  
  const page=usePage() 
  const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true  

  
  
  const[isData, setData] = useState({cat:{}})

  const getData = async () => {  
    let user_=getUser()
    //console.log("cat_user", user_)   
    page.showLoading("guest")
    let cat_=cat
    cat_= cat_[0].toUpperCase() + cat_.slice(1)
    cat_=cat_.replace("-", " ");  
    
    
    const res = await axios.post(process.env.API+'/api/influencer/cat/'+cat, {influencer_id:user_.id});
    const data = res.data;    
    console.log('CAT LOADED '+loaded, data) 
    loaded+=1
    setData({cat:cat_, ...data})  
    page.hideLoading()    
  } 
  
  useEffect(() => { 
    if(cat){        
      console.log('cat2', cat)
      args.cat=cat 
      getData()  
    }  
  }, []); 

  return (
    <Cat {...args} {...isData} ></Cat>
  )
}
export default com
