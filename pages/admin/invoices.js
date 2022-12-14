import React, { Component }  from 'react';
import Head from 'next/head'

import View  from '../../components/view/admin/invoices_av';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Admin Invoices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props}></View>       
    </div>
  )
}
