import React, { Component }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import View  from '../../components/view/blog_v';



function Home(props) {

  const router = useRouter()
  //const { slug } = router.query
  //console.log("slug", props)
  let title='For Businesses: Yellow Collar 101'
  let slug='for-businesses-yellow-collar-101'
  let duration='8 min read'
  let date = '26-10-2022'
  let image = 'b101_01.png'
  let category='business'
  let content=(
    <div className='text-md'>
      <p className='mb-4 '>Are you having trouble identifying the right influencers for your business? It has been found that this is the primary reason why businesses do not pursue and benefit from influencer marketing. YellowCollar takes care of this problem for you.   </p>
      <p className='mb-4'>In order to properly match influencers to your business, YellowCollar uses a proprietary algorithm that analyses influencers and their audiences. In addition, the platform incentivises influencers to produce relevant and valuable content for your brand. Identifying the best influencers for your brands and achieving a high return on investment is made easier as a result of this process.  </p>
      <p className='mb-4'>So, what are you waiting for? The following steps will guide you through the process: </p>
      <p className='text-2xl font-bold mb-4'>Step 1: Account Registration</p>
      <p className='mb-4'>Create an account by clicking the signup button and filling out all the required information. You will then receive an email to verify your account. Verify your email, log in, and fill out the onboarding form. Our goal is to gain a deeper understanding of your business and optimise it to reach the right influencers.</p>
      <p className='text-2xl font-bold mb-4'>Step 2: Product Listing</p>
      <p className='mb-4'>Add your products to our platform at a greatly discounted price (We recommend at least 40% off). It will be possible for influencers to test your product. Once an influencer purchases your product, ensure the order has been processed and shipped.  
      YellowCollar does not handle shipping and delivery- those are your responsibilities a.k.a the business’s.</p>
      <p className='text-2xl font-bold mb-4'>Step 3: Promotional Requests </p>
      <p className='mb-4'>Once the influencer has received and tried the product, they will be allowed to send a collaboration invite. On receiving the invite, you will be able to see a matching score next to the influencer profile. Based on this score and the influencer profile you can take an informed decision as to which influencer you want to collaborate with.</p>
      <p className='text-2xl font-bold mb-4'>Step 4: Communication</p>
      <p className='mb-4'>Once a collaboration request has been accepted you can directly chat with the influencer to brief and discuss the desired campaign. Then simply input the collaboration details and wait for the influencer to accept it. </p>
      <p className='text-2xl font-bold mb-4'>Step 5: Payment</p>
      <p className='mb-4'>Once the influencer has accepted the collaboration you are liable to pay the agreed-upon fee. However, this is just the initial payment. In order to incentivise the influencer, a performance-based fee will be generated which you will be liable to pay once the campaign has been ended.  </p>
      <p className='mb-4'>Then sit back and enjoy your achieved ROI! <Link href='/auth'><span className='text-red-500 cursor-pointer'>Click here to get started.</span></Link>  </p>
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
