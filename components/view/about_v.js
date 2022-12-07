import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UI from '../../ui/lib/view/about_u';
import axios from 'axios';

import process2 from '../process';


const com = (props) => {  

  const args = process2();  
  args.noTopGap=false;
  args.showFooter=true 
  args.showShopNav=false 

  return (
    <UI {...props} {...args} ></UI>
  )
}
export default com
