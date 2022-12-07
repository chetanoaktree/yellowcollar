import React, { Component }  from 'react';
import Head from 'next/head'

import Home  from '../components/view/home';


export default function Page(props) {
  return (
    <div>
      <Head>
        <title>YellowCollar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Home {...props}></Home>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }          
      `}</style>  
    </div>
  )
}
