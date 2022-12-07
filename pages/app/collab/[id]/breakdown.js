import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'


import Breakdown  from '../../../../components/view/influencer/breakdown';

function Page(props){
  const router = useRouter()
  const { id } = router.query  

  return (
    <div>
      <Head>
        <title>Platovice Breakdown</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breakdown id={id} {...props}></Breakdown>  
    </div>
  )
}
export default Page
