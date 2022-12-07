import React, { useState, useEffect } from 'react';

import Auth from '../../ui/lib/view/auth_u';
import process2 from '../process';

const com = ({children, ...props}) => {
  console.log("AUTH props", props) 
  //const args = process2();
  return (
    <Auth {...props} >{children}</Auth>
  )
}
export default com
