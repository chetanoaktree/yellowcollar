import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

const MatchPercentage = () =>{ // from db from data356
  
  let demographic_of_audience=0 //demographic of the influencer audience
  let age_group_of_audience=0 //age group of influencer's audience
  let industry='' //category/industry of the influencer

  let out=4
  return out
}
const Followers = () =>{  // from db from data356
  let out=3 
  return out
}
const EngagementRate = () =>{ // from db from data356
  let out=2
  return out
}
const Rating = () =>{ // i think it is dynamic
  // number of products of the company bought by the influencer, 
  // same product bought, 
  // different product bought
  // product promoted  should have similar  target audience for highr match
  let out=2
  return out
}


const match_score = async ({influencer_id, business_id, product_id}) =>{
  let demographic = await supabase
    .from('influencer_demographic')
    .select()
    .eq("influencer_id", influencer_id)
  console.log("influencer_demographic", demographic)
    
  // match %, Rating, Match Score
  let match_percentage=MatchPercentage()
  let followers=Followers() 
  let engagement_rate=EngagementRate() //age group of influencer's audience
  let rating=Rating() 

  let out=match_percentage * followers * engagement_rate * rating

  return out
}
const getNames=(aObj)=>{
  aObj=_.filter(aObj, function(o) { return (o && o.value) > 0 ? true : false; });
  let out=_.map(aObj, 'name');
  return out
}
const getvalues=(aObj)=>{
  let out=_.map(aObj, 'value');
  return out
}
const getvalue=(obj)=>{
  let out=obj ? obj.value : '';
  return out
}
const getWeight=(input, sample, weight)=>{
  let out=0
  let val=input/sample
  if(val > 1) val=1
  out=Math.round(val * weight * 100 )/ 100
  return out
}
const getBooleanWeight=(input, sample, weight)=>{
  let out=0
  let val=0
  if(input && sample){
    if(input == sample) val=1
    out=Math.round(val * weight * 100 )/ 100
  }
  return out
}
const getValueWeight=(input, sample, weight)=>{
  let out=0
  if(input && sample){
    out=getWeight(input, sample, weight)
  }
  return out
}
const getArrayWeight=(input, sample, weight)=>{ 
  let out=0
  if(input && sample){  
     let found=_.filter(sample, function(o) { 
       if(input.indexOf(o) != -1){  
         return true
       }else{
         return false
       }
     })
     //out={input, sample, found, sample.length, found.length}
     out=getWeight(found.length , sample.length, weight)
  }
  return out
}

const getTotalWeights = ({i_industry, i_followers, i_verified, i_gender, gender, region, age_group}) =>{
  let out =0
  if(i_industry.weight) out+=i_industry.weight
  if(i_followers.weight) out+=i_followers.weight
  if(i_verified.weight) out+=i_verified.weight
  if(i_gender.weight) out+=i_gender.weight
  if(gender.weight) out+=gender.weight
  if(region.weight) out+=region.weight
  if(age_group.weight) out+=age_group.weight
  out=Math.round(out*100)/100
  return out
}
const collab_match = (collab) => {
  let sample={i_gender:{},  i_industry:{}, i_verified:{}, i_followers:{}, age_group:{}, region:{}, gender:{}}
  let input={i_gender:{},  i_industry:{}, i_verified:{}, i_followers:{}, age_group:{}, region:{}, gender:{}} 
  let output={i_gender:{},  i_industry:{}, i_verified:{}, i_followers:{}, age_group:{}, region:{}, gender:{}} 
  let weights={sample:sample, input:input, output:output, input_weight:0, sample_weight:0, output_1:0, output_2:0, output_3:0}
     
  let {product_campaign, influencer_demographic} = collab 
  if(!product_campaign || !influencer_demographic)  return  collab

  influencer_demographic={...influencer_demographic, ...influencer_demographic.meta}
  
  sample.i_gender={
    value:getvalues(product_campaign.i_gender),
    weight:product_campaign.i_gender_w
  }
  sample.i_verified={
    value:getvalue(product_campaign.i_verified),
    weight:product_campaign.i_verified_w
  }
  sample.i_industry={
    value:getvalues(product_campaign.i_industry),
    weight:product_campaign.i_industry_w
  }
  sample.i_followers={
    value:parseInt(getvalue(product_campaign.i_followers)),
    weight:product_campaign.i_followers_w
  }
  sample.age_group={
    value:getvalues(product_campaign.age_group),
    weight:product_campaign.age_group_w
  }
  sample.region={
    value:getvalues(product_campaign.region),
    weight:product_campaign.region_w
  }
  sample.gender={
    value:getvalues(product_campaign.gender),
    weight:product_campaign.gender_w
  }

  input.i_verified={
    value:getvalue(influencer_demographic.i_verified),
  }
  input.i_followers={
    value:parseInt(getvalue(influencer_demographic.i_followers)),
  }
  input.i_industry={
    value:getvalues(influencer_demographic.i_industry)
  }
  input.i_gender={
    value:getvalues(influencer_demographic.i_gender)
  }
  input.gender={
    value:getNames(influencer_demographic.gender)
  }
  input.age_group={
    value:getNames(influencer_demographic.age_group)
  }
  input.region={
    value:getNames(influencer_demographic.region)
  }
  
  output.i_verified.weight=getBooleanWeight( input.i_verified.value, sample.i_verified.value, sample.i_verified.weight)  
  output.i_followers.weight=getValueWeight( input.i_followers.value, sample.i_followers.value, sample.i_followers.weight)

  output.i_gender.weight=getArrayWeight( input.i_gender.value, sample.i_gender.value, sample.i_gender.weight)
  output.i_industry.weight=getArrayWeight( input.i_industry.value, sample.i_industry.value, sample.i_industry.weight)
  output.age_group.weight=getArrayWeight( input.age_group.value, sample.age_group.value, sample.age_group.weight)
  output.gender.weight=getArrayWeight( input.gender.value, sample.gender.value, sample.gender.weight)
  output.region.weight=getArrayWeight( input.region.value, sample.region.value, sample.region.weight)

  weights.sample_weight=getTotalWeights(sample)
  weights.input_weight=getTotalWeights(output)
  weights.output_1=Math.round((weights.input_weight/weights.sample_weight)*100)/100
  weights.output_2= Math.round(weights.output_1 * 100)
  weights.output_3= weights.output_2+"%"
  
  //let gender=product_campaign.gender
  //collab['123_campaign']= product_campaign.gender
  //collab['123_demographic']= influencer_demographic.gender
  collab['weights']= weights
  return collab
}

const collab_match_percent = async ({influencer_id, product_id, info=false}) => {
  let id
  let pc
  let res 
  let match
  let ida=await supabase
  .from('influencer_demographic')
  .select()     
  .eq('influencer_id', influencer_id)
  if(ida.data) id=ida.data[0]

  let pca=await supabase
  .from('product__campaign')
  .select()     
  .eq('product_id', product_id)
  if(pca.data) pc=pca.data[0].meta
  
  let d=collab_match({product_campaign:pc, influencer_demographic:id})
  //console.log("influencer_demographic", id)
  //console.log("product_campaign", pc)
  //console.log("MATCH", d.weights)
  if(d.weights) match = d.weights.output_2
  if(info==true) match = d
  return match
}


export {
  match_score,
  collab_match,
  collab_match_percent
}