import React, { Component }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import View  from '../../components/view/blog_v';



function Home(props) {

  const router = useRouter()
  //const { slug } = router.query
  //console.log("slug", props)
  let title='Claim your ticket to fame'
  let slug='claim-your-ticket-to-fame'
  let duration='8 min read'
  let date = '27-10-2022'
  let image = 'b_claim_your_ticket_01.png'
  let category='influencer'
  let content=(
    <div className='text-md'>     

      <p className='mb-4'>Are you an influencer seeking more collaborations and better pay? Research suggests that 82% of influencers in India, currently feel that they are undervalued. YellowCollar addresses this problem for you.</p>

      <p className='mb-4'>YellowCollar uses a proprietary algorithm to match you with a brand so that you get more collaboration and of course a better pay.  Apart from the fixed fee the platform also rewards you with a performance-based fee. This will help you in earning up to 100% more if your collaboration post does well.</p>

      <p className='mb-4'>What are you still looking out for? You can follow the steps below to complete the process:</p>

      <p className='text-2xl font-bold mb-4'>Step 1: Creating an Account</p>

      <p className='mb-4'>Once you create an account by clicking the signup button and filling out all the required information. You will receive an email to verify your account. Verify your email and fill out the onboarding form. We aim to get a deeper insight of your profile and optimise it to reach the right businesses. </p>

      <p className='text-2xl font-bold mb-4'>Step 2: Explore and Purchase Products</p>
      <p className='mb-4'>You can then purchase the products of your choice from our E-shop. And yes, these products will have an exclusive ‘influencer privilege discount’ because you deserve it. This will also allow you to be on the radar of brands as the businesses will see up to you as a genuine endorser. </p>
      <p className='text-2xl font-bold mb-4'>Step 3: Promotional Requests  </p>
      <p className='mb-4'>Once you have received and tried the product, you will be allowed to send a collaboration invite. Once you do so, the business will get a notification that you are interested in collaborating with them.</p>
      <p className='text-2xl font-bold mb-4'>Step 4: Communication </p>
      <p className='mb-4'>After your collaboration request is accepted, you can directly communicate with the business to understand the collaboration details and agree upon a base fee.This is a very
      important decision you must take because you must remember if you perform well, you will also get paid more for your performance. So, compromising a little on your base fee is okay! As additionally, you will be entitled to a performance fee.</p>
      <p className='text-2xl font-bold mb-4'>Step 5: Payment </p>
      <p className='mb-4'>Once you accept the collaboration. The business will make the payment of the base fee. This fees will be held with us to avoid any conflict and safeguard your interests. 1 week after the
      campaign goes live, the business will pay the performance-based fee calculated by our platform. Once this is received the total amount will be received by you</p>
      <p className='mb-4'>Let's get things going, shall we? <Link href='/auth'><span className='text-red-500  cursor-pointer'>Start here by clicking.</span></Link></p>

    </div>
  )

  return (
    <div>
      <Head>
        <title>Platovice {title}   </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View {...props} {...{content, slug, title, duration, date, image, category}}></View> 
    </div>
  )
}
export default Home
