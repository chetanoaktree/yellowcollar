import React, { Component }  from 'react';
import Head from 'next/head'

import Transactions  from '../../components/view/admin/transactions_av';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Admin Transactions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Transactions {...props}></Transactions>       
    </div>
  )
}
