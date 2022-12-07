import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'


import Collab  from '../../../components/view/collab';

function Page(props){
  const router = useRouter()
  const { id } = router.query  

  return (
    <div>
      <Head>
        <title>Platovice Influencer Offers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Collab id={id} {...props}></Collab>  
    </div>
  )
}
export default Page
