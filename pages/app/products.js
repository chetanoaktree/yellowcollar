import React, { Component }  from 'react';
import Head from 'next/head'

import View  from '../../components/view/influencer/products_v';
let a=1
export default function Home(props) { 
  return (
    <div>
      <Head>
        <title>Platovice Influencer Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props}></View>  
    </div>
  )
}
