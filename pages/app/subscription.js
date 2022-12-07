import React, { Component }  from 'react';
import Head from 'next/head'

import Subscription  from '../../components/view/subscription_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Influencer Subscription</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Subscription {...props}></Subscription>  
    </div>
  )
}
