import React, { useState, useEffect } from 'react';
import Breakdown from '../../../ui/lib/view/influencer/breakdown';
import process from '../../process';
import axios from 'axios';

const com = ({id, ...props}) => {   
  const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true 
  args.test_id=id  
  
  const[isArgs, setArgs] = useState(args)
  /*
  const getData = async () => { 
    const res = await axios.post(process.env.API+'/api/products/product/'+id, {});
    const data = res.data;
    console.log('data', data)
    setArgs({...isArgs, item:data})       
  } 
  
  useEffect(() => { 
    if(id){        
      console.log('id2', id)
      args.id=id 
      getData()  
    }  
  }, [id]); */
  
  return (
    <Breakdown {...isArgs}  id={id}></Breakdown>
  )
}
export default com
