import React, { Component }  from 'react';
import Head from 'next/head'

import Login  from '../components/view/login_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>YellowCollar Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Login {...props}></Login>     
    </div>
  )
}
export async function getServerSideProps({query, req, res }) {
  console.log("query", query)
  let {manan, shanav, ayush} =query
  if(manan || shanav || ayush){
    console.log("Team")
  }else{
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  //await updateSessionData()
  return {
    props: {}, // will be passed to the page component as props
  }
}
