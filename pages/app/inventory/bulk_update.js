import React, { Component }  from 'react';
import Head from 'next/head'

//import View  from '../../../components/view/business/bulk_update_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Business Bulk Update</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <div {...props}></div>      
    </div>
  )
}
