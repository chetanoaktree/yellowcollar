import React, { Component }  from 'react';
import Head from 'next/head'

import InfoPage  from '../components/view/info_page_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Terms &amp; Conditions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <InfoPage {...props} name="terms-conditions"></InfoPage>       
    </div>
  )
}
