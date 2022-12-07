import React, { useState, useEffect } from 'react';
import Collab from '../../../ui/lib/view/influencer/collab';
import process from '../../process';
import getUser from '../../get/user';
import axios from 'axios';

const com = ({id, ...props}) => {   
  const args = process()
  //args.navArgs.home="/app/shop/"
  args.showShopNav=false
  args.showfooter=false  
  
  const[isArgs, setArgs] = useState(args)

  const getData = async () => {          
    let user=getUser()
    //console.log('user', user)     
    const collabs = await axios.post(process.env.API+'/api/influencer/collab/', {influencer_id:user.id});
    console.log('collabs_data', collabs.data)

    setArgs({...isArgs, items:collabs.data.items})       
  } 
  
  useEffect(() => { 
     getData()   
  }, []); 

  return (
    <Collab {...isArgs} ></Collab>
  )
}
export default com
