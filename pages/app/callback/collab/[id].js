import React, { Component,  useState, useEffect  }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'

import collab_payment from '../../../../process_api/business/collab/payment'
import collab_action from '../../../../process_api/business/collab/action'
import pw_verify from '../../../../process_api/com/pw/verify'


//import Order  from '../../../components/view/influencer/order';

function Page(props){
  const router = useRouter()
  const { id } = router.query 
  if(props.pw.temp_collab){
    console.log("Props pw", props.pw.temp_collab.meta)
    console.log("Props collab_action", props.pw.collab_action)
  }
  return (
    <div>
      <Head>
        <title>Platovice Callback Collab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Loading...</div>
      {/*<Order id={id} {...props}></Order>         
      PW = {JSON.stringify(props.pw)} 
      <br/><br/>
      Callback Props {JSON.stringify(props)}*/}
    </div>
  )
}

export default Page


export async function getServerSideProps({ query, req }) {
  console.log("CONTEXT query", query)
  console.log("CONTEXT body", req.body)
  let pw={}
  let collab_action_=false
  if(query.id) {
    let temp_collab=await collab_payment({action_2:'get_temp_collab', shortid:query.id})
    //if(temp_collab.status=="completed"){
      //return { props: {test:'completed', pw} }
    //}
    if(temp_collab && temp_collab.id) {
      collab_action_=await collab_action({shortid:query.id, ...temp_collab.meta, meta:temp_collab.meta})
      console.log("temp_collab", temp_collab)
      console.log("collab_action_", collab_action_)
    }
    /*pw={}
    pw.temp_collab=temp_collab
    pw.collab_action=collab_action_
    
    if(collab_action_ && collab_action_.id){
      return {
        redirect: {
          permanent: false,
          destination: process.env.API+'/app/collab/'+collab_action_.id
        }
      }
    } */
    if(collab_action_ && collab_action_.id){
      return {
        redirect: {
          permanent: false,
          //destination: process.env.API+'/app/order/'+created_order.id
          destination: process.env.API+'/thankyou?mode=p&type=collab&id='+collab_action_.id
        }
      }
    }  
  }
  
  
  return { props: {test:'pending', pw} }
}


