import React, { Component }  from 'react';
import Head from 'next/head'
import View  from '../components/view/faq_v';

export default function Home(props) {
  //console.log("thankyou View", props)
  return (
    <div>
      <Head>
        <title>YellowCollar Faq</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props}></View>     
    </div>
  )
}
