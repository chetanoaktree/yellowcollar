import React, { Component }  from 'react';
import Head from 'next/head'

import Profile  from '../../components/view/profile';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Profile {...props}></Profile>      
    </div>
  )
}
