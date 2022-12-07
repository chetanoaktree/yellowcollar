import React, { Component,  useState, useEffect  }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_MEMBERSHIP_SET} from "/store/types";
import { useRouter } from 'next/router'
import Head from 'next/head'
import Router from 'next/router'

//import sub_payment from '../../../../process_api/com/membership/payment'
import action from '../../../../process_api/com/membership/action'
import pw_verify from '../../../../process_api/com/pw/verify'


//import Order  from '../../../components/view/influencer/order';

function Page(props){
  const dispatch = useDispatch();    
  const router = useRouter()
  const { id } = router.query 
  if(props.pw.temp){
    console.log("Props temp", props.pw.temp.meta)
    console.log("Props action", props.pw.action)    
  }

  /*useEffect(async () => { 
    let data=props.pw.action
    if(data){
      dispatch({
        type: PAGE_MEMBERSHIP_SET,
        payload: data,
      });
      localStorage.setItem('membership', JSON.stringify(data));
      Router.push('/app/subscription')
    }
  }, []);*/
  console.log("SUB Props", props)
  //props.logoutHandler()
   
  return (
    <div>
      <Head>
        <title>Platovice Callback Subscription</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Loading...</div>
      {/*<Order id={id} {...props}></Order> */}
      
        
      {/*PW = {JSON.stringify(props.pw)} */}
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
    let temp=await action({action_2:'get_temp_sub', shortid:query.id})
    /*if(temp.status=="completed"){
      return { props: {test:'completed', pw} }
    }*/
    let action_
    if(temp && temp.id) {
      action_=await action({shortid:query.id, ...temp.meta})
    }
    /*pw={}
    pw.temp=temp
    pw.action=action_*/
    
    
    if(action_ && action_.id){
      return {
        redirect: {
          permanent: false,
          //destination: process.env.API+'/app/subscription'
          destination: process.env.API+'/thankyou?mode=p&type=sub&id='+action_.id
        }
      }
    } 
  }
  
  
  return { props: {test:'pending', pw} }
}


