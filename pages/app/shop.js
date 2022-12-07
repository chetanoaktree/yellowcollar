import React, { Component }  from 'react';
import Head from 'next/head'

import Shop  from '../../components/view/influencer/shop_v';
let a=1
export default function Home(props) {

  console.log("### 3 PPPPPPPPPPPPPPPP "+ a, props) 
  a+=1  
  return (
    <div>
      <Head>
        <title>Platovice Influencer Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Shop {...props}></Shop>  
    </div>
  )
}
