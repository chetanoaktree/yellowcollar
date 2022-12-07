import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Input from '../ui/lib/input';
import Button from '../ui/lib/button';

import Guest  from '../components/view/guest';


export default  function Home(props) {
  const [isBusinessId, setBusinessId] =useState(1)  
  const [isProductId, setProductId] =useState(1) 
  const [isCollabId, setCollabId] =useState(1) 
  const [isContent, setContent] =useState("")  
  const [isMeta, setMeta] =useState("")  
  const businessHandler = async (value) =>{  
    setBusinessId(value)
  }  
  const productHandler = async (value) =>{
    setProductId(value)
  }  
  const collabHandler = async (value) =>{
    console.log('collabHandler', value) 
    setCollabId(value)
  }
  const contentHandler = async (value) =>{
    setContent(value)
  }
  const metaHandler = async (value) =>{
    setMeta(value)
  }

  const acceptOffer = async () =>{       
    let i={action:'accept', collab_id:isCollabId, content:''}
    const res = await axios.post(process.env.API+'/api/business/collab/action', i);
    console.log('acceptOffer', res.data) 
  } 
  const shareLink = async () =>{      
    let i={action:'share_link', collab_id:isCollabId, content:isContent}
    const res = await axios.post(process.env.API+'/api/business/collab/action', i);
    console.log('share_link', res.data) 
  } 
  const promotionLive = async () =>{      
    let i={action:'live', collab_id:isCollabId}
    const res = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('share_link', res.data) 
  } 
  const completed = async () =>{      
    let i={action:'completed', collab_id:isCollabId}
    const res = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('completed', res.data) 
  } 
  const amount = async () =>{      
    let i={action:'amount', collab_id:isCollabId, meta:JSON.parse(isMeta), content:isContent}
    const res = await axios.post(process.env.API+'/api/influencer/collab/action', i);
    console.log('amount', res.data) 
  } 
  const paid = async () =>{      
    let i={action:'paid', collab_id:isCollabId, content:isContent}
    const res = await axios.post(process.env.API+'/api/business/collab/action', i);
    console.log('paid', res.data) 
  } 
       

  return (
    <div>
      <Head>
        <title>Platovice Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <div className="flex flex-col items-center p-12 pt-48">       
        <div className="flex items-center mb-12">
          <div>Collab Id<Input value={isCollabId} changeHandler={collabHandler} placeholder='collab_id'/></div>
          <div>Product Id<Input value={isProductId} changeHandler={productHandler} placeholder='product_id'/></div>
          <div>Business Id<Input value={isBusinessId} changeHandler={businessHandler} placeholder='business_id'/></div>
        </div>
        <div className="flex items-center mb-12">          
          <div className=" w-64">Content<Input value={isContent} changeHandler={contentHandler} placeholder='content' /></div>
          <div className=" w-64">Meta<Input value={isMeta} changeHandler={metaHandler} placeholder='meta' /></div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex flex-col items-center mb-12">          
            <Button clickHandler={acceptOffer} type="action">Accept Offer</Button>
          </div>

          <div className="flex flex-col items-center mb-12">                
            <Button clickHandler={shareLink} type="action">Share Link</Button>
          </div>         

          <div className="flex flex-col items-center mb-12">         
            <Button clickHandler={amount} type="action">Amount</Button>
          </div>

          <div className="flex flex-col items-center mb-12">         
            <Button clickHandler={paid} type="action">Paid</Button>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="flex flex-col items-center mb-12">          
            <Button clickHandler={promotionLive} type="action">Promotion Live</Button>
          </div>          
        </div>

        <div className="flex flex-wrap">          
          <div className="flex flex-col items-center mb-12">         
            <Button clickHandler={completed} type="action">Completed</Button>
          </div>
        </div>

      </div>   
    </div>
  )
}

