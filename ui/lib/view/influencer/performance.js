import React, { useState, useEffect } from 'react';
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import s from './performance.module.scss';

const com = ({item, id, ...props}) => {
  return (
    <Layout {...props}> 
      Performance {id}
    </Layout>    
  )
  
}
export default com
