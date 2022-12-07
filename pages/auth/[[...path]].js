import React, { Component, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import SuperTokens from 'supertokens-auth-react'
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword'

import Auth  from '../../components/view/auth_v';

const SuperTokensComponentNoSSR = dynamic(
  new Promise((res) => res(SuperTokens.getRoutingComponent)),
  { ssr: false }
)

export default function Page(props) {
  
  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth()
    }
  }, [])

  return (
    <div>
        <Head>
            <title>Platovise Login/Signup</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Auth {...props}><SuperTokensComponentNoSSR /></Auth>
        {/*<SuperTokensComponentNoSSR />*/}
    </div>
  )
}

export async function getServerSideProps({query, req, res }) {
  //console.log("req2", query)
  return {
    props: {}, // will be passed to the page component as props
  }
}