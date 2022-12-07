import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'


import Collabs  from '../../../components/view/collabs';

function Page(props){
  return (
    <div>
      <Head>
        <title>Platovice Offers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Collabs {...props}></Collabs>  
    </div>
  )
}
export default Page
