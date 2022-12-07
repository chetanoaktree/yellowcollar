//import seo from '../seo';
import React, { useState, useEffect } from 'react';
import validator from 'validator'
import Link from 'next/link'
import s from './subscribe.module.scss';
import Button from './button';

const com = ({layout=1, user_type="influencer", isLogged, handler}) => {
  const [email, setEmail] = useState('')  
  const [emailError, setEmailError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [process, setProcess] = useState(false)

  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('')      
    } else {
      setEmailError('Enter valid Email!')
    }
    console.log(email)
    setEmail(email)
  }


  const handleSubmit = (e) => { 
    if (email=='' || emailError!='') {
      return;
    }
    setProcess(true)  
    e.preventDefault()
    console.log('Sending')
    let data = {
      email,
      user_type
    }

    fetch('/api/com/subscribe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
       setEmail('')
       setProcess(false)  
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')  
        handler({status:'success'})      
        setSubmitted(true)  
        setTimeout(()=>{
          setSubmitted(false) 
        }, 3000);       
        setEmail('')
      }else{
        handler({status:'failed'})      
      }
    })   
  }
  
  const form_= (bg=1) =>{
    let bg_= bg==1 ? "bg-white" : "bg-light-gray"
    bg_+= emailError ? ' '+s.error :''
    return (
      <div className="flex flex-col items-center">
        <div className={bg_+" rounded-2xl md:rounded-full flex justify-center flex-wrap items-center pl-2"}>
          <input className="input bg-transparent text-center md:text-left" value={email} placeholder="Enter your email" onChange={(e) => validateEmail(e)} />
          <div className="m-2" >
            <Button className="" type="action" color="blue" isIcon={true} clickHandler={handleSubmit}>
              <div className="flex justify-center items-center px-12 h-12">
                {/*!process && <img src="/images/White_tick.svg"/>*/}
                {!process && <div>Submit</div>}
                {process && <img src="/images/loading.svg"/>}
              </div>
            </Button>
          </div>
        </div>
        {submitted && <div className="mt-2">Thanks for subscribing!</div>}
        {emailError && <span style={{color: 'red',}}>{emailError}</span>}
      </div>
    )
  }
    
  const layout1=(<div className="flex flex-wrap justify-center items-center">
    <div className="md:mr-12 text-2xl md:text-3xl font-semibold mb-8 md:mb-0 text-center md:text-left">           
      {/*Apply now for early access */}
      Subscribe to our newsletters 
    </div>        
    <div>
      {form_()}
    </div>
  </div>)

  const layout2=(<div className="flex flex-col justify-center items-center">
    <div className="text-xl md:text-4xl font-semibold mb-12 text-center">           
      {/*So, what are you waiting for?<br/>Apply now for early access*/} 
      Subscribe to our newsletters
    </div>        
    <div>
      {form_({bg:2})}
    </div>
  </div>)
  
  const layout_=layout == 1 ? layout1 : layout2

  return (
    <div className={s.main}>
       {layout_}
    </div>
  )
}
export default com
