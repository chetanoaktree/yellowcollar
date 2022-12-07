import _ from 'lodash'
import {post_types} from './influencer'

let init_meta = {requirement:'', goal:'', cap:0}
let goal_options=[
  {label:"Awareness", value:'awareness', name:"goal"},
  {label:"Sales", value:'sales', name:"goal"},
  {label:"Both", value:'both', name:"goal"}      
]

let post_type_options = post_types

let get_goal = (item) =>{
  let goal_=''
  if( item.meta && item.meta.goal){
    goal_ = _.filter(goal_options, 
        { value: item.meta.goal}
    );
    goal_= goal_[0] ? goal_[0].label : ''
  }
  return goal_
}

const collab_amount = (input, item) =>{
  let {influencer, influencer2, treshold_amount=0, variable_cap=100} = item 
  if(influencer2) influencer=influencer2
  let {fixed_fee_story, fixed_fee_reel, fixed_fee_video, fixed_fee_post} = influencer.meta
  let {post_type} = input 

  let base=0 
  let can_go_upto=0

  if(post_type=='story'){
    base = fixed_fee_story ? fixed_fee_story : 0
  }else if(post_type=='reel'){
    base = fixed_fee_reel ? fixed_fee_reel : 0
  }else if(post_type=='video'){
    base = fixed_fee_video ? fixed_fee_video : 0
  }else if(post_type=='post'){
    base = fixed_fee_post ? fixed_fee_post : 0
  }
  base=parseInt(base)
  
  //can_go_upto=parseInt(base)+parseInt(treshold_amount)
  can_go_upto=parseInt(base) * (variable_cap/100)

  let ret={base, treshold_amount, can_go_upto, variable_cap}
  console.log("Collab ", item)
  console.log("Collab Input", input)
  console.log("Collab treshold_amount", treshold_amount)
  console.log("Collab AMount", ret)
  return ret
}
export {
  get_goal,
  goal_options,
  post_type_options,
  collab_amount,
  init_meta
}
