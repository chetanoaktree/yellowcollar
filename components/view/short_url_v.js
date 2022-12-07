import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UI from '../../ui/lib/view/short_url_u';
import axios from 'axios';

import process2 from '../process';


const com = (props) => {  
  
  const {user} = useSelector((state) => state.pageData);

  const handler = async (i) => {     
    const res = await axios.post(process.env.API+'/api/short_url', {user_id:user.id, ...i});
    const data = res.data;     
    return  data;
  } 

  

  return (
    <UI {...props} handler={handler}></UI>
  )
}
export default com
