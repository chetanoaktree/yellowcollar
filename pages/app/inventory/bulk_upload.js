import React, { Component }  from 'react';
import Head from 'next/head'
import axios from 'axios';

import View  from '../../../components/view/business/bulk_upload_v';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Platovice Business Bulk Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props}></View>      
    </div>
  )
}
export async function getServerSideProps({query, req, res }) {
  console.log("Server Query", query)
  //const res = await axios.post(process.env.API+'/api/business/inventory/bulk_upload', {business_id:user.id, ...i});
 // console.log('res_data', res.data)

  return {
    props: {
      sData:[
        {name:'fasty'}
      ]
    }, // will be passed to the page component as props
  }
}