import React, { Component }  from 'react';
import Head from 'next/head'

import Pages  from '../../components/view/admin/pages_av';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Admin Transactions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Pages {...props}></Pages>       
    </div>
  )
}
