import React, { Component }  from 'react';
import Head from 'next/head'

import Inventory  from '../../../components/view/business/inventory_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Business Inventory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Inventory {...props}></Inventory>      
    </div>
  )
}
