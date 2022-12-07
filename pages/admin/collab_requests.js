import React, { Component }  from 'react';
import Head from 'next/head'

import CollabRequests  from '../../components/view/admin/collab_requests_av';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Admin Collab Requests</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <CollabRequests {...props}></CollabRequests>       
    </div>
  )
}
