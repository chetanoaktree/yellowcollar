import React, { Component }  from 'react';
import Head from 'next/head'

import Orders  from '../../components/view/influencer/orders';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Business Orders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Orders {...props}></Orders>      
    </div>
  )
}
