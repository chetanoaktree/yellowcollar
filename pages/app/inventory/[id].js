import React, { Component }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'

import InventoryEdit  from '../../../components/view/business/inventory-edit_v';

export default function Home(props) {
  const router = useRouter()
  const { id } = router.query  
  //console.log("init id", id)
  return (
    <div>
      <Head>
        <title>Platovice Business Inventory Edit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      {id && <InventoryEdit id={id} {...props}></InventoryEdit>}     
    </div>
  )
}
