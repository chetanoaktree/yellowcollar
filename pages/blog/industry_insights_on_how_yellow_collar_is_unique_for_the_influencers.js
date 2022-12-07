import React, { Component }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import View  from '../../components/view/blog_v';



function Home(props) {

  const router = useRouter()
  //const { slug } = router.query
  //console.log("slug", props)
  let title='Importance of YellowCollar in the industry today'
  let slug='industry_insights_on_how_yellow_collar_is_unique_for_the_influencers'
  let duration='8 min read'
  let date = '28-10-2022'
  let image = 'b_claim_your_ticket_01.png'
  let category = 'Influencer'
  let content=(
    <div className='text-md'> 
      <p className='mb-4'>Influencers channel their inner creativity, gather millions of followers and have a prominent status on social media. But, before you jump to any conclusion, remember that there are thousands of influencers out there- both budding and established and you'd need to make a serious effort to stand out of the troop. YellowCollar makes it easier for you to connect and collaborate with businesses. You can not only collaborate with different brands but also explore products and buy them at a discounted price. </p>
 
      <p className='mb-4'>In a world where social media is imperative to make a mark, YellowCollar is an influencer-friendly collaborative space that connects you to different brands. 
      From $1.7 Billion in market size in 2016, to having an  <Link href='https://influencermarketinghub.com/influencer-marketing-statistics/'><span className='text-red-500  cursor-pointer'>exponential growth</span></Link> of $13.8 Billion in 2021, the influencer marketing industry is currently growing at a rapid pace.  </p> 
      <p className='mb-4'>It is estimated to reach $16.4 Billion in market size in 2022. Almost 80% of marketers are considering instagram as an integral part of their marketing strategy. Brands are now going to start increasing their budgets for influencer marketing, and will be opting to run many in-house influencer campaigns.</p> 
      <p className='mb-4'>In this highly competitive era, Influencer marketing comes with various challenges. Many fake influencers end up connecting with brands, brands are unsure of their target audience for their campaigns, many followers do not translate to higher influence, and business lack clarity on influencers’ performance analytics. However, we at Yellowcollar aim to introduce you to the Golden Standard of influencer culture. With a variety of brands on board, we make communicating and partnering with the brand easy for you, have fluncers on a single platform, and provide you with analytics. Here's how YellowCollar is unique in many different ways: </p> 
      <ul className='list-disc list-inside mb-4'>
        <li className='mb-4'><span className='text-xl font-bold '>Partner with a large pool of businesses:</span> At YellowCollar, we connect you to a large number of businesses ranging from travel to food, makeup to fitness, lifestyle to finance. You can start by exploring the brand and then going on to purchase the products. Once you purchase the products you can send a collaboration request to the brand. Once the brand accepts your request. you can further go on to collaborate and agree upon a base fee. </li>
        
        <li className='mb-4'><span className='text-xl font-bold '>Promote products that you really care about:</span> And yes all the products are available at an influencer privilege discount because you deserve it. All you need to do is find your niche so that you be on the radar of these businesses and they'll also look up to you as a genuine endorser.</li> 
        
        <li className='mb-4'><span className='text-xl font-bold '>Achieve growth with increased engagement:</span> Once you receive the products and review them you can further collaborate with the brands. As you can collaborate with multiple brands the increase in traction helps you in achieving growth and increased engagement. Also, if the post performs well you get more than you expect</li>
        
        <li className='mb-4'><span className='text-xl font-bold '>Earn a fixed fee plus performance bonus:</span> You not only earn a fixed fee that is paid by the brand. But one week after the campaign goes live we will be releasing your performance bonus. This performance bonus will be calculated by our platform depending on how well the post is doing.</li>
      </ul>
     <p className='mb-4'>All you need to do is <Link href='/auth'><span className='text-red-500 cursor-pointer'>signup</span></Link> with us and we will help you in connecting with the brands. Still, wondering when you should get started? Be an early bird and register with us today!</p> 


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
