import React, { Component }  from 'react';
import Head from 'next/head'

import Subscriptions  from '../../components/view/admin/subscriptions_av';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Admin Subscriptions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Subscriptions {...props}></Subscriptions>       
    </div>
  )
}
