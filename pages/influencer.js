import React, { Component }  from 'react';
import Head from 'next/head'

import Influencer  from '../components/view/influencer';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>YellowCollar Influencer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Influencer {...props}></Influencer>       
    </div>
  )
}
