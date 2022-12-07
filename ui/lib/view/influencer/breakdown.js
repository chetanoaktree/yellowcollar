import React, { useState, useEffect } from 'react';
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import s from './breakdown.module.scss';

const com = ({item, id, ...props}) => {
  return (
    <Layout {...props}> 
      Breakdown {id}
    </Layout>    
  )
  
}
export default com
