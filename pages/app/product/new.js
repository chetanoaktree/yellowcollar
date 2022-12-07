import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'


import Product  from '../../../components/view/influencer/product_v';

function Page(props){
  const router = useRouter()
  
  return (
    <div>
      <Head>
        <title>Platovice Business</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Product {...props} ></Product>  
    </div>
  )
}
export default Page
