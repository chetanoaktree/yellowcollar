import React, { Component }  from 'react';
import Head from 'next/head'

import Checkout  from '../../components/view/influencer/checkout_v';

const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})

/*
export async function getServerSideProps() { 
  const res = await fetch(process.env.API+'/api/com/pw', { agent })
  const data = await res.json()
  console.log("res", res)

  return { props: { test:'best', data } }
}*/


export default function Home(props) {
  //console.log("home", props)
  return (
    <div>
      <Head>
        <title>Platovice Influencer Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Checkout {...props}></Checkout>  
    </div>
  )
}
