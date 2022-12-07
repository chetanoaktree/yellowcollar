import React, { Component }  from 'react';
import Head from 'next/head'

import View  from '../../components/view/admin/collaborations_av';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Admin Collaborations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props}></View>       
    </div>
  )
}
