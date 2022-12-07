import React, { useState , useEffect} from "react"
import { useForm } from 'react-hook-form'
import Title from '../../title'
import Button from '../../button'
import Input from '../../input'
import CheckBox from '../../checkbox'
import Radio from '../../radio'
import {init_meta as GetInitMeta, get_goal as GetGoal, goal_options} from '../../get/collab'
import Popup from './popup'
import s from './collab_details.module.scss'
import Moment from 'moment'
import _ from 'lodash'

const com = ({item, isOpen=false, setOpen, collaborateHandler, ...props}) => { 
  if(!item.id) return(<></>)     
  let init_fixed_fee=item.influencer.init_fixed_fee ? item.influencer.init_fixed_fee : 0
  let treshold_amount=item.treshold_amount ? item.treshold_amount : 0

  let top
  let middle
  const [isProcessing, setProcessing] = useState(false)
  const [isData, setData] = useState({
    goal:'sales',
    requirement:'',
    cap:0,
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
    //console.log(v)
    setData((prev)=>{
      return {...prev, requirement:v}
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
  const onSubmit=async (e)=>{   
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
            <textarea className="ic" {...{errors}} {...register('requirement', { required: true })} placeholder="enter your requirement..."></textarea>
            {errors.requirement && <div className="e">enter your requirement.</div>}
          </div>        
        </div> 
        
        <div className={' mb-4 '}>
          <h5>Goal of the Collaboration</h5>
          {/*<div className={s.label}><CheckBox name="goal" label="Awareness" value="Awareness" changeHandler={goalHandler}/></div>
          <div className={s.label}><CheckBox name="goal" label="Sales" value="Sales" changeHandler={goalHandler}/></div> */}
          <Radio name="goal" value={isData.goal} options={goal_options} changeHandler={goalHandler2}/>             
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
            <div className={s.value}>{init_fixed_fee}</div>
          </div>
          <div className={s.item}>
            <div className={s.label}>Variable</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{treshold_amount}</div>
          </div> 
          <div className={s.item}>
            <div className={s.label}>Can go upto</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{init_fixed_fee + treshold_amount}</div>
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
        
        <div className={' mb-4'}>
          <h5>Cap</h5>
          <div className={s.label}>{item.meta.cap}</div>        
        </div>
        
        <div className={' '}>
          <h5>Payment Details</h5>
          <div className={s.item}>
            <div className={s.label}>Base</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{init_fixed_fee}</div>
          </div>
          <div className={s.item}>
            <div className={s.label}>Variable</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{treshold_amount}</div>
          </div> 
          <div className={s.item}>
            <div className={s.label}>Can go upto</div>
            <div className={s.sep}>:</div>
            <div className={s.value}>{init_fixed_fee + treshold_amount}</div>
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