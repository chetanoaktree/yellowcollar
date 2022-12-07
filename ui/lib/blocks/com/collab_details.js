import React, { useState , useEffect} from "react"
import { useForm } from 'react-hook-form'
import Title from '../../title'
import Button from '../../button'
import Input from '../../input'
import CheckBox from '../../checkbox'
import Radio from '../../radio'
import {init_meta as GetInitMeta, get_goal as GetGoal, goal_options, post_type_options, collab_amount} from '../../get/collab'

import Popup from './popup'
import s from './collab_details.module.scss'
import Moment from 'moment'
import _ from 'lodash'

const get_values = (item) =>{
  let {base, goal, post_type} = item.meta ? item.meta : {}
  let input={base, goal, post_type}
  
  return collab_amount(input, item) 
}

const com = ({item, isOpen=false, setOpen, collaborateHandler, ...props}) => { 
  if(!item.id) return(<></>) 
  let {influencer, influencer2=false}=item 
  if(influencer2!=false) influencer=influencer2
  let init_fixed_fee=influencer.init_fixed_fee ? influencer.init_fixed_fee : 0
  let treshold_amount=item.treshold_amount ? item.treshold_amount : 0
 

  let top
  let middle
  const [isProcessing, setProcessing] = useState(false)
  const [isData, setData] = useState({
    goal:'sales',
    requirement:'',
    cap:0,
    post_type:0,
    base:0,
    variable_cap:100,
    can_go_upto:0,
    treshold_amount:0
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    isSubmitSuccessful,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      requirement: ''
    })
  }, [isSubmitSuccessful])

  useEffect(() => {
    let data=get_values(item)
    setData(data)
  }, [])


  

  /*let goal_options=[
    {label:"Awareness", value:'awareness', name:"goal"},
    {label:"Sales", value:'sales', name:"goal"},
    {label:"Both", value:'both', name:"goal"}      
  ]*/
  item.meta=item.meta ?  item.meta : GetInitMeta

  

  //console.log("details item", item)
  const capHandler=(v, e)=>{
    //console.log(v)
     setData((prev)=>{
      return {...prev, cap:v}
    })
  }
  const reqHandler=(v, e)=>{   
    setData((prev)=>{      
      prev.requirement=v      
      return prev
    })
  }
  const goalHandler=(v, isChecked, e)=>{    
    setData((prev)=>{      
      prev.goal[v]=isChecked
      //console.log("goal", prev.goal)    
      return prev
    })
  }
  const goalHandler2=(v, name, e)=>{ 
    console.log("before set", name, v)    
    setData((prev)=>{  
      let next={...prev}
      console.log("goal", next)       
      next.goal=v       
      return next
    })
  }
  const postTypeHandler=(v, name, e)=>{ 
    console.log("before set", name, v)    
    setData((prev)=>{  
      let next={...prev}
      next.post_type=v   
      console.log("post_type", next)           
      return next
    })   
    setData((prev)=>{  
      let next={...prev}     
      let {base, can_go_upto, treshold_amount} =collab_amount(prev, item) 
      next={...next, base, can_go_upto, treshold_amount}          
      return next
    })    
  }
  const onSubmit=async (e)=>{
    console.log("Submit", isData)     
    setProcessing(true) 
    await collaborateHandler(isData)
    setValue('requirement', ''); 
    setProcessing(false)
    setOpen(false)
  }

  
  //console.log("isData", isData)

  top=(<h4>Collaboration Details</h4>)
  if(item.status=="business_accepted"){    
    middle=(
      <div>      
        <div className={'mb-4'}>
          <h5>Collaboration Requirements</h5>
          <div className={s.label}>
            {/*<Input placeholder="requirement" value={isData.requirement} changeHandler={reqHandler}/>*/}
            <textarea className="ic" {...{errors}} {...register('requirement', { required: true })} onChange={(e)=>reqHandler(e.target.value, 'requirement')} placeholder="enter your requirement..."></textarea>
            {errors.requirement && <div className="e">enter your requirement.</div>}
          </div>        
        </div> 
        
        <div className={' mb-4 '}>
          <h5>Goal of the Collaboration</h5>
          {/*<div className={s.label}><CheckBox name="goal" label="Awareness" value="Awareness" changeHandler={goalHandler}/></div>
          <div className={s.label}><CheckBox name="goal" label="Sales" value="Sales" changeHandler={goalHandler}/></div> */}
          <Radio name="goal" value={isData.goal} options={goal_options} changeHandler={goalHandler2}/>             
        </div>
        <div className={' mb-4 '}>
          <h5>Promotion Post Type</h5>
          {/*<div className={s.label}><CheckBox name="goal" label="Awareness" value="Awareness" changeHandler={goalHandler}/></div>
          <div className={s.label}><CheckBox name="goal" label="Sales" value="Sales" changeHandler={goalHandler}/></div> */}
          <Radio name="post_type" value={isData.post_type} options={post_type_options} changeHandler={postTypeHandler}/>             
        </div>
        
        {/*<div className={' mb-4'}>
          <h5>Cap</h5>
          <div className={s.label}><Input placeholder="cap" value={isData.cap} changeHandler={capHandler}/></div>        
        </div>*/}
        
        <div className={' '}>
          <h5>Payment Details</h5>
          <div className={s.item}>
            <div className={s.label}>Base</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{isData.base}</div>
          </div>
          {/*<div className={s.item}>
            <div className={s.label}>Variable</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{variable}</div>
          </div> */}
          <div className={s.item}>
            <div className={s.label}>Can go upto</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{isData.can_go_upto}</div>
          </div>    
        </div>
      </div>
    )
  }else{  
    let goal_=GetGoal(item)
    /*if( item.meta && item.meta.goal){
      goal_ = _.filter(goal_options, 
          { value: item.meta.goal}
      );
      goal_= goal_[0] ? goal_[0].value : ''
    }*/
    middle=(      
      <div>      
        <div className={'mb-4'}>
          <h5>Collaboration Requirements</h5>
          <div className={s.label}>{item.meta.requirement}</div>        
        </div> 
        
        <div className={' mb-4 '}>
          <h5>Goal of the Collaboration</h5>
          {goal_ =="both" ? "Awareness & Sales" : goal_ }          
        </div>

        <div className={' mb-4 '}>
          <h5>Promotion Post Type</h5>
          {item.meta.post_type}          
        </div>
        
        {/*<div className={' mb-4'}>
          <h5>Cap</h5>
          <div className={s.label}>{item.meta.cap}</div>        
        </div>*/}
        
        <div className={' '}>
          <h5>Payment Details</h5>
          <div className={s.item}>
            <div className={s.label}>Base</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{isData.base}</div>
          </div>
          {/*<div className={s.item}>
            <div className={s.label}>Variable</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{treshold_amount}</div>
          </div> */}
          <div className={s.item}>
            <div className={s.label}>Can go upto</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{isData.can_go_upto}</div>
          </div>    
        </div>
    </div>
    )
  }
  
  let bottom=item?.status=="business_accepted" ? (<Button isProcessing={isProcessing}  input_type="submit" className="" type="action2">Collaborate</Button>) : (<div></div>)

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.main}>
        <Popup  {...{isOpen, setOpen, top, middle, bottom}}/>
      </div>
    </form>
  )
}
export default com