import React, { Component }  from 'react';
import Head from 'next/head'

import View  from '../../components/view/admin/products_av';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Admin Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props}></View>       
    </div>
  )
}
