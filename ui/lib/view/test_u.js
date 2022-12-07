import React, { useState, useEffect } from "react";
import Guest from './guest';
import Title from '../title';
import Button from '../button';
import Input from '../input2';
import axios from 'axios';

const com = (props) => { 
  //console.log("UI props", 1)
  return (
    <Guest {...props} viewType="guest" >   
      <div className={''}>   
        Test Area
      </div>
    </Guest>    
  )
}
export default com
