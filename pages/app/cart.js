import React, { Component }  from 'react';
import Head from 'next/head'

import Cart  from '../../components/view/influencer/cart';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Influencer Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Cart {...props}></Cart>  
    </div>
  )
}
