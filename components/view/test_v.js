import React, { useState, useEffect } from 'react';
import Test from '../../ui/lib/view/test_u';
import process from '../process';
import axios from 'axios';

const com = (props) => { 

  let args = {}; 
  args.showShopNav=false  
  
  //console.log("view props", props)
   
  return (
    <Test {...props} {...args} ></Test>
  )
}
export default com
