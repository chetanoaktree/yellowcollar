import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Layout from '../influencer/layout'
import Title from '../../title'
import Button from '../../button'
//import Textarea from '../../exp_textarea'

import s from './feedback_u.module.scss'


const com = (props) => {
  let {handler} = props 

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    isSubmitSuccessful,
    formState: { errors },
  } = useForm();

  const {user, membership} = useSelector((state) => state.pageData)
  const [isData, setData] = useState({user, membership, experience:'', feedback:'', processing:false, sent:false})
  

  useEffect(() => {
    reset({
      feedback: ''
    })
  }, [isSubmitSuccessful])

  console.log("isData", isData)
  //console.log("user", user)
  //console.log("membership", membership)
  /*
  const onSuccess = res => {
    console.log("Success", res);
  };
  */
  const onSubmit = async (data) => {
    setData(prev => ({...prev, processing:true}))   
    console.log("form", data);
    let next={...isData, ...data}
    console.log("form next", next);
    setTimeout(async()=>{
      await handler({action:'send_feedback', ...next})
      await handler({action:'send_feedback_a', ...next})
      next.experience=''
      next.sent=true
      //next.processing=false    
      setValue('feedback', ''); 
      setData(next)
    }, 1000)    
  }
  
  const Experience = ({number}) => {
    const click = () => {
      setData(prev=>({...prev, experience:number}))
    }
    let color=isData.experience==number ? "blue" : "white"
    return (
      <div>
        <Button clickHandler={click} className="block" type="action2" color={color} >{number}</Button>
      </div>
    )
  }

  const changeHandler = (v, n) => {
     setData(prev=>({...prev, [n]:v}))
  }
  const sendHandler = async (e) => { 
     //e.preventDefault()
     //setData(prev => ({...prev, processing:true}))   
     //handleSubmit(onSubmit)     
  }
  const closeHandler = () => {
     //setData(prev=>({...prev, [n]:v}))
  }
  const form = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={"font-bold"}>How is your experience at Yellow Collar.</h3>
      <div className={s.bar+" mt-12"}>
        <div className={"flex items-center justify-between w-full font-bold opacity-75"}>
          <div className={"flex-grow"}>Poor</div>
          <div>Excellent</div>
        </div>
        <div className={"grid grid-flow-col gap-4 mt-4"}>
          <Experience number={1}/>
          <Experience number={2}/>
          <Experience number={3}/>
          <Experience number={4}/>
          <Experience number={5}/>
        </div>          
      </div> 
      <div className="opacity-25 mt-4 text-sm">Requred</div>
      <div className={"mt-12 mb-64"}>
        <div className={"mb-4"}>
          We welcome your ideas, request or comments about Yellow Collar.<br/>
          We will use them to improve our service &amp; product.
        </div>          
        <div className="i">
          <textarea className="ic" {...{errors}} {...register('feedback', { required: true })} placeholder="enter feedback..."></textarea>            
          {errors.feedback && <div className="e">Please enter number for feedback.</div>}
        </div>
      </div> 
      <div className={s.bar+' fixed bottom-0 left-0 right-0 mb-8 mx-8 flex items-center justify-center z-10 '+s.actionbar}>
        <Button to={'/'} className="mr-2" type="action2" color="white">Close</Button>
        <Button isProcessing={isData.processing}  input_type="submit" className="" type="action2">Send Feedback</Button>        
      </div>
    </form>           
  )

  const thankyou = (
    <div>
      <h3 className={"font-bold"}>Thank you so much for your feedback.</h3>
      <div className={"mb-4 mt-12 max-w-lg"}>
        We really appreciate the details you shared with us about areas where we can improve. This insight will help us greatly.
      </div> 
      <Button to="/app" className="mt-12 mr-2" type="action2" color="">View Dashboard</Button>
    </div>
  )
  return (
    <Layout {...props} showShopNav={false} showFooter={true}> 
      
      <div className={s.main+' style_base '}>
        {isData.sent==false && <div>Feedback</div>}
        {isData.sent==false && form}
        {isData.sent==true && thankyou}
      </div>       
    </Layout>    
  )
}
export default com
//e.target.value