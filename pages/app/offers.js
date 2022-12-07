import React, { Component }  from 'react';
import Head from 'next/head'

import Guest  from '../../components/view/guest';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Business</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Guest {...props}></Guest>      
    </div>
  )
}
