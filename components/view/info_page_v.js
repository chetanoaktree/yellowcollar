import React, { useState, useEffect } from 'react';
import InfoPage from '../../ui/lib/view/info_page_u';
import process from '../process';
import axios from 'axios';

const com = ({name, ...props}) => {  
  const args = process()
  //args.navArgs.home="/app/shop/"
  args.showShopNav=false
  args.noTopGap=true;  
  args.showFooter=true  
  //console.log("guest args", args)
  const[isItem, setItem] = useState({})

  const getData = async () => { 
    const res = await axios.post(process.env.API+'/api/info_page', {action:'get', name});
    const data = res.data;
    console.log('data', data)
    setItem(data)       
  } 
  
  useEffect(() => {
    getData()      
  }, []);
 
  return (
    <InfoPage {...args}  item={isItem}></InfoPage>
  )
}
export default com
