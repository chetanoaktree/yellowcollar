import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Input from '../ui/lib/input';
import Button from '../ui/lib/button';

//import {convertHTMLToPDF} from 'pdf-puppeteer';


import Test  from '../components/view/test_v';

import requestIp from 'request-ip'
import { WithUserAgentProps, withUserAgent } from 'next-useragent'


function Home(props) {  
  console.log("VIEW test", props)
  return (
    <div>
      <Head>
        <title>Platovice Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      123
      <Test {...props}/>   
    </div>
  )
}

Home.getInitialProps = async (ctx) => {  
 
  //console.log("convertHTMLToPDF", convertHTMLToPDF)
  //console.log("req3", ctx.query)
  //const ip = ctx.req.headers["x-forwarded-for"] || ctx.req.socket.remoteAddress; 
  //console.log("IP3", ip)
  const detectedIp = requestIp.getClientIp(ctx.req)
  console.log("detectedIp", detectedIp)
  return { useragent: ctx.ua.source, detectedIp}
 // return { stars:12, detectedIp}
}


//export default Home
export default withUserAgent(Home)
