import React, { Component }  from 'react';
import Head from 'next/head'

import Feedback  from '../../components/view/feedback_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Feedback {...props}></Feedback>      
    </div>
  )
}
