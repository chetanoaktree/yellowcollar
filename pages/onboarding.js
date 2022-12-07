import React, { Component }  from 'react';
import Head from 'next/head'
// import Session from "supertokens-node/recipe/session";
import OnBoarding  from '../components/view/onboarding_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>YellowCollar OnBoarding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <OnBoarding {...props}></OnBoarding>     
    </div>
  )
}

export async function getServerSideProps({query, req, res }) {
  //console.log("req2", query)
  //await updateSessionData()
  return {
    props: {}, // will be passed to the page component as props
  }
}
// async function updateSessionData() {
//       let userId = "cf0a79e1-7278-499c-bfd0-f302db8dbc18";
//       // we first get all the sessionHandles (string[]) for a user
//       let sessionHandles = await Session.getAllSessionHandlesForUser(userId);

//       // we update all the session's data for this user
//       sessionHandles.forEach(async (handle) => {
//             let currSessionInfo = await Session.getSessionInformation(handle)
//             console.log("currSessionInfo", currSessionInfo)
//             if (currSessionInfo === undefined) {
//                   return;
//             }
//             let currSessionData = currSessionInfo.sessionData;
           

//             await Session.updateSessionData(handle,
//                   { newKey: "newValue", ...currSessionData }
//             );
//             let currSessionInfo2 = await Session.getSessionInformation(handle)
//             console.log("currSessionInfo2", currSessionInfo2)
//       })
// }
