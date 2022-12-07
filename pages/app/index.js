import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'


import Dashboard  from '../../components/view/dashboard';

function Page(props){
  return (
    <div>
      <Head>
        <title>Platovice Offers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard {...props}></Dashboard>  
    </div>
  )
}
export default Page
