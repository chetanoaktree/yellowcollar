import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'


import Order  from '../../../components/view/influencer/order';

function Page(props){
  const router = useRouter()
  const { id } = router.query 

  return (
    <div>
      <Head>
        <title>Platovice Influencer Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Order id={id} {...props}></Order>  
    </div>
  )
}

export default Page
