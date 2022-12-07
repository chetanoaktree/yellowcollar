import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input2';
import Select from '../../../select';
import Textarea from '../../../textarea';

import {WeightSlider} from '../../_blocks/ui';
import {regionOptions, industryOptions, genderOptions, ageGroupOptions, verifiedOptions, followersOptions} from '../../_blocks/campaign';

import getStatus from '../../../get/status';
import {getDiscountedPrice, trim as trimPercentage, checkPercentage} from '../../../get/product';
import _ from 'lodash'



const com = (props) => {
  let {s, isData, setTouch, campaign_init, isCampaign, setCampaign} = props

  let data=isCampaign ? isCampaign : campaign_init
  console.log("campaign data", data)
  const campaignChangeHandler=(v, name)=>{ 
    setTouch(1)    
    setCampaign((prev)=>{
      let ret={...prev, [name]:v}
      console.log("ret", ret)  
      return (ret)
    })
  }
  console.log("data.i_gender_w", data.i_gender_w)
  return (
    <div>              
      <div className={s.info}>
        <h4 className={"mb-4"}>Influencer</h4>   
        <div className="flex flex-wrap items-start">
          <div className={s.input+" w-4/12 pr-2"}>  
            <div className={s.label}>Gender</div>          
            <div className={"mb-4"} ><Select name="i_gender" value={data.i_gender} isMulti options={genderOptions} placeholder="select gender"  changeHandler={(v, n)=>{campaignChangeHandler(v, n)}}/> </div>
            <div className={s.label_s}>Weight</div> 
            <WeightSlider axis="x" x={data.i_gender_w} onChange={(o)=>{campaignChangeHandler(o.x, 'i_gender_w')}}/>                           
          </div>
          <div className={s.input+" w-4/12 pr-2"}> 
            <div className={s.label}>Followers</div>          
            <div className={"mb-4"} ><Select name="i_followers" value={data.i_followers} isMulti={false} options={followersOptions} placeholder="select followers"  changeHandler={(v, n)=>{campaignChangeHandler(v, n)}}/></div>   
            <div className={s.label_s}>Weight</div>  
            <WeightSlider axis="x" x={data.i_followers_w} onChange={(o)=>{campaignChangeHandler(o.x, 'i_followers_w')}}/>               
          </div>
          <div className={s.input+" w-4/12 pr-2"}> 
            <div className={s.label}>Verified</div>          
            <div className={"mb-4"} ><Select name="i_verified" value={data.i_verified} isMulti={false} options={verifiedOptions} placeholder="select verified"  changeHandler={(v, n)=>{campaignChangeHandler(v, n)}}/> </div>  
            <div className={s.label_s}>Weight</div>  
            <WeightSlider axis="x" x={data.i_verified_w} onChange={(o)=>{campaignChangeHandler(o.x, 'i_verified_w')}}/>               
          </div>
          <div className={s.input+" w-6/12 pr-2"}> 
            <div className={s.label}>Industry</div>          
            <div className={"mb-4"} ><Select name="i_industry" value={data.i_industry} isMulti options={industryOptions} placeholder="select industry"  changeHandler={(v, n)=>{campaignChangeHandler(v, n)}}/> </div>  
            <div className={s.label_s}>Weight</div>  
            <WeightSlider axis="x" x={data.i_industry_w} onChange={(o)=>{campaignChangeHandler(o.x, 'i_industry_w')}}/>               
          </div>
        </div>          
      </div>
      <div className={s.info}>
        <h4 className={"mb-4"}>Audience Demographic</h4>   
        <div className="flex flex-wrap items-start">
          <div className={s.input+" w-4/12 pr-2"}>  
            <div className={s.label}>Gender</div>          
            <div className={"mb-4"} ><Select name="gender" value={data.gender} isMulti options={genderOptions} placeholder="select gender"  changeHandler={(v, n)=>{campaignChangeHandler(v, n)}}/> </div>
            <div className={s.label_s}>Weight</div> 
            <WeightSlider axis="x" x={data.gender_w} onChange={(o)=>{campaignChangeHandler(o.x, 'gender_w')}}/>                           
          </div>  
          <div className={s.input+" w-4/12 pr-2"}> 
            <div className={s.label}>Region</div>          
            <div className={"mb-4"} ><Select name="region" value={data.region} isMulti options={regionOptions} placeholder="select region"  changeHandler={(v, n)=>{campaignChangeHandler(v, n)}}/> </div>  
            <div className={s.label_s}>Weight</div>  
            <WeightSlider axis="x" x={data.region_w} onChange={(o)=>{campaignChangeHandler(o.x, 'region_w')}}/>               
          </div>          
          <div className={s.input+" w-4/12 pr-2"}> 
            <div className={s.label}>Age Group</div>          
            <div className={"mb-4"} ><Select name="age_group" value={data.age_group} isMulti options={ageGroupOptions} placeholder="select age group"  changeHandler={(v, n)=>{campaignChangeHandler(v, n)}}/> </div>  
            <div className={s.label_s}>Weight</div>  
            <WeightSlider axis="x" x={data.age_group_w} onChange={(o)=>{campaignChangeHandler(o.x, 'age_group_w')}}/>               
          </div>            
        </div>          
      </div>
      <div className={s.info}>
        <h4 className={"mb-4"}>Product</h4>   
        <div className="flex flex-wrap items-start">
          <div className={s.input+" w-4/12 pr-2"}>  
            <div className={s.label}>Product Url <span className={'ml-8 opacity-75 text-sm'}>Url can be from your website, amazon, shopify etc.. </span> </div>                     
            <div className={"mb-4"} ><Input placeholder="product url" name="product_url" value={data.product_url} changeHandler={(v, e, n)=>{campaignChangeHandler(v, n)}}/> </div>
          </div>                   
        </div>          
      </div>
    </div> 
  )
}
export default com
