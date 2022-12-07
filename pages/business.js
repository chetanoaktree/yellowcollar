import React, { Component }  from 'react';
import Head from 'next/head'

import Business  from '../components/view/business';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>YellowCollar Business</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Business {...props}></Business>       
    </div>
  )
}
