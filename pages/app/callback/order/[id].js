import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'

import order_action from '../../../../process_api/influencer/order/action'
import pw_verify from '../../../../process_api/com/pw/verify'


//import Order  from '../../../components/view/influencer/order';

function Page(props){
  const router = useRouter()
  const { id } = router.query 
  if(props.pw.temp_order){
    console.log("Props pw", props.pw.temp_order.meta)
    console.log("Props Create Order", props.pw.created_order)
  }
  return (
    <div>
      <Head>
        <title>Platovice Callback Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*<Order id={id} {...props}></Order> */}
      
        
      PW = {JSON.stringify(props.pw)} 
      <br/><br/>
      {/*Callback Props {JSON.stringify(props)}   */}
    </div>
  )
}

export default Page


export async function getServerSideProps({ query, req }) {
  console.log("CONTEXT query", query)
  console.log("CONTEXT body", req.body)
  let pw={}
  if(query.id) {
    let temp_order=await order_action({action:'get_temp_order', shortid:query.id})
    if(temp_order.status=="completed"){
      return { props: {test:'completed', pw} }
    }
    let created_order=await order_action({action:'create_order', shortid:query.id, ...temp_order.meta})
    //pw=await pw_verify({order_id:query.id})
   // pw.temp_order=temp_order
    //////////pw.created_order=created_order   

    if(created_order){
      return {
        redirect: {
          permanent: false,
          //destination: process.env.API+'/app/order/'+created_order.id
          destination: process.env.API+'/thankyou?mode=p&type=order&id='+created_order.id
        }
      }
    }   
  }
  
  
  return { props: {test:'pending', pw} }
}


