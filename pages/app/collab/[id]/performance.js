import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'


import Performance  from '../../../../components/view/influencer/performance';

function Page(props){
  const router = useRouter()
  const { id } = router.query  

  return (
    <div>
      <Head>
        <title>Platovice Performance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Performance id={id} {...props}></Performance>  
    </div>
  )
}
export default Page
