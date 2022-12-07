import React, { Component }  from 'react';
import Head from 'next/head'

import Sales  from '../../components/view/business/sales_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Business Sales</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Sales {...props}></Sales>      
    </div>
  )
}
