// process
let ClickThrough_weights={w:0, i:0, c:0}
let Conversions_weights={w:0, i:0, c:0}
let Engagement_weights={w:0, i:0, c:0}
let Impressions_weights={w:0, i:0, c:0}
let Followers_weights={w:0, i:0, c:0}

const set_weights = (item) => { 
  let goal=item.meta ? item.meta.goal : ''
  //console.log("goal", goal)
  if(goal=="awareness")  {
    ClickThrough_weights={w:0, i:4, c:4}
    Conversions_weights={w:0.4, i:5, c:5}
    Engagement_weights={w:0.1, i:3, c:3}
    Impressions_weights={w:0.1, i:3, c:3}
    Followers_weights={w:0.1, i:3, c:3}    
  }else if(goal=="sales")  {
    ClickThrough_weights={w:0.5, i:4, c:4}
    Conversions_weights={w:0.2, i:5, c:5}
    Engagement_weights={w:0.1, i:3, c:3}
    Impressions_weights={w:0.1, i:3, c:3}
    Followers_weights={w:0.1, i:3, c:3}
  }else if(goal=="both")  {
    ClickThrough_weights={w:0.3, i:4, c:4}
    Conversions_weights={w:0.2, i:5, c:5}
    Engagement_weights={w:0.2, i:3, c:3}
    Impressions_weights={w:0.2, i:3, c:3}
    Followers_weights={w:0.2, i:3, c:3}
  } 
}

const init= {click_through:0, conversions:0, engagement:0, impressions:0, followers:0} 
const formula = ({w, i, c}) => {    
  let out=w * i * c
  return out
}

const calculate = (actual, treshold, {w, i, c}) => {  
  let factor = formula({w, i, c})
  let earning = actual > treshold ? (actual - treshold) : 0
  let out = earning * factor
  return out
}

// Variable parameters
const ClickThrough = (actual, treshold) => {  
  let out = calculate(actual, treshold, ClickThrough_weights)
  return out
}
const Conversions = (actual, treshold) => {  
  let out = calculate(actual, treshold, Conversions_weights)
  return out
}
const Engagement = (actual, treshold) => {  
  let out = calculate(actual, treshold, Engagement_weights)
  return out
}
const Impressions = (actual, treshold) => {  
  let out = calculate(actual, treshold, Impressions_weights)
  return out
}
const Followers = (actual, treshold) => {  
  let out = calculate(actual, treshold, Followers_weights)
  return out
}

const variable = (item) => { 
  if(!item) return 0
  set_weights(item)
  //console.log("vaiable", item)
  let performance=item.collab_performance ? item.collab_performance : init
  let treshold=item.treshold ? item.treshold : init

  let clickThrough=ClickThrough(performance.click_through, treshold.click_through)  
  let engagement=Engagement(performance.engagement, treshold.engagement)
  let impressions=Impressions(performance.impressions, treshold.impressions)
  /* LATER USE 
  let followers=Followers(performance.followers, treshold.followers)
  let conversions=Conversions(performance.conversions, treshold.conversions)
  let out=clickThrough + conversions + engagement + impressions + followers  
  */

  let out=clickThrough + engagement + impressions 
  return Math.round(out)
}

// Performance parameters

// Variable parameters

const p_calculate = (value, {w, i, c}) => {  
  let factor = formula({w, i, c})  
  let out = value * factor
  return out
}

const ClickThrough2 = (value) => {  
  let out = p_calculate(value, ClickThrough_weights)
  return out
}
const Conversions2 = (value) => {  
  let out = p_calculate(value, Conversions_weights)
  return out
}
const Engagement2 = (value) => {  
  let out = p_calculate(value, Engagement_weights)
  return out
}
const Impressions2 = (value) => {  
  let out = p_calculate(value, Impressions_weights)
  return out
}
const Followers2 = (value) => {  
  let out = p_calculate(value, Followers_weights)
  return out
}


const performance = (item) => { 
  if(!item) return 0
  set_weights(item)
  //console.log("P performance", item)  
  let performance=init
  if(item.performance) {
    performance=item.performance
  }else if(item.collab_performance) {
    performance=item.collab_performance
  }
  //let performance=item.collab_performance ? item.collab_performance : init
  let percentage=0
  let treshold=item.treshold ? item.treshold : init
  
  /* LATER USE 
  let actual=ClickThrough2(performance.click_through) + Conversions2(performance.conversions) + Engagement2(performance.engagement) + Impressions2(performance.impressions) + Followers2(performance.followers)
  let treshold2=ClickThrough2(treshold.click_through) + Conversions2(treshold.conversions) + Engagement(treshold.engagement) + Impressions2(treshold.impressions) + Followers2(treshold.followers)
  */
  let actual=ClickThrough2(performance.click_through) + Engagement2(performance.engagement) + Impressions2(performance.impressions) 
  let treshold2=ClickThrough2(treshold.click_through) + Engagement(treshold.engagement) + Impressions2(treshold.impressions)
  

  if(actual && treshold2) percentage=Math.round(100 *(actual/treshold2))
  //let percentage=Math.round(50.5);
  return percentage
}

const treshold_amount = (item) => {
  if(!item) return 0
  set_weights(item)
  //console.log("P item", item)    
  let treshold=item.treshold ? item.treshold : init 
  /* LATER USE 
  let treshold2=ClickThrough2(treshold.click_through) + Conversions2(treshold.conversions) + Engagement(treshold.engagement) + Impressions2(treshold.impressions) + Followers2(treshold.followers)
  */
  let treshold2=ClickThrough2(treshold.click_through) + Engagement(treshold.engagement) + Impressions2(treshold.impressions) 
  
  return Math.round(treshold2)
}

export {
  variable,
  performance,
  treshold_amount
}
