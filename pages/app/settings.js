import React, { Component }  from 'react';
import Head from 'next/head'

import Settings  from '../../components/view/settings';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Settings {...props}></Settings>      
    </div>
  )
}
