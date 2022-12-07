import React, { Component }  from 'react';
import Head from 'next/head'

import View  from '../components/view/influencers_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>YellowCollar Influencers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props}></View>       
    </div>
  )
}
