import React, { Component }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import View  from '../../components/view/blog_v';



function Home(props) {
  const router = useRouter()
  const { slug } = router.query

  console.log("slug", props)
  

  return (
    <div>
      <Head>
        <title>Platovice {slug}   </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View slug={slug} {...props}></View> 
    </div>
  )
}

Home.getInitialProps = async (ctx) => {  
  //console.log("req3", ctx.query)
  //const ip = ctx.req.headers["x-forwarded-for"] || ctx.req.socket.remoteAddress; 
  //console.log("IP3", ip)   
  return { test: 12}
}

/*
export async function getServerSideProps(ctx) {
  console.log("ctx", ctx);
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {}
  }
}
*/
export default Home
