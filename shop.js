import React, { useState, useEffect } from 'react';
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import s from './shop.module.scss';

const com = ({item, ...props}) => {
  return (
    <Layout {...props}> 
      shop
    </Layout>    
  )
  
}
export default com
