import React, { Component }  from 'react';
import Head from 'next/head'

import InfoPage  from '../components/view/info_page_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>YellowCollar Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <InfoPage {...props} name="privacy-policy"></InfoPage>       
    </div>
  )
}
