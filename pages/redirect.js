import React, { Component }  from 'react';
import Head from 'next/head'
import Session from "supertokens-node/recipe/session";
import View  from '../components/view/redirect_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>YellowCollar Thankyou</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props}></View>     
    </div>
  )
}

export async function getServerSideProps({query, req, res }) {
  console.log("req2", query)
  //await updateSessionData()
  return {
    props: {}, // will be passed to the page component as props
  }
}