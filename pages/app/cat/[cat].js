import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'


import Cat  from '../../../components/view/influencer/cat_v';

function Page(props){
  const router = useRouter()
  const { cat } = router.query 

  return (
    <div>
      <Head>
        <title>Platovice Business</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cat cat={cat} {...props}></Cat>  
    </div>
  )
}

export default Page
