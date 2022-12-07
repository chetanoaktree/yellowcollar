import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input'; 
import User from '../../../blocks/com/user';


import s from '../variable_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {get_input, get_select} from '../../_blocks/input_ui';
import {tag, ApproveReject, Refresh} from '../../_blocks/ui';
import {Card, Expand, DataGrid} from '../../_blocks/data_ui';
import {LocalUI} from '../../_blocks/local_ui';



const com = (props) => { 
  let { handler } = props  
  let init={
    variable_cap:'',
    goal_awareness:{
      click_through:0,
      engagement:0,
      impressions:0,
    },
    goal_sales:{
      click_through:0,
      engagement:0,
      impressions:0,
    },
    goal_both:{
      click_through:0,
      engagement:0,
      impressions:0,
    }
  }
  
  const [isL, setL] = useState({...init})
  const [isP, setP] = useState('')
  const [isA, setA] = useState('')

  let new_changes={}

  useEffect(async()=>{
    let data=await handler({action:'get_goal'})
    console.log("C DATA", data)
    setL(prev=>data.value)
  }, [])


  let lui = LocalUI({isL, setL, isA, setA,  new_changes }) 

  let select = ({label, name, parent, options}) => {
    let ret =lui.select({label, name, parent, options})
    return ret
  }  
  let input = ({label, name, parent}) => {
    let ret =lui.input({label, name, parent})
    return ret
  }
  
  const render = ()=>{
    let Card_args={
       content:(
         <div>
           <div className={"flex items-center"}>
            <div className={"w-2/12"}>Variable Cap</div>
            <div className={"w-10/12"}>
              {input({label:'Variable Cap (%)', name:'variable_cap'})}  
            </div>   
          </div>
         </div>
       )
    }
    let Card2_args={
       content:(
        <div>          
          <div className={"flex items-center"}>
            <div className={"w-2/12"}>Awareness</div>
            <div className={"w-10/12 flex items-center"}>
              {input({label:'Click Through', name:'click_through', parent:'goal_awareness'})}
              {input({label:'Engagement', name:'engagement', parent:'goal_awareness'})}
              {input({label:'Impressions', name:'impressions', parent:'goal_awareness'})}
            </div>
          </div>
          <div className={"flex items-center"}>
            <div className={"w-2/12"}>Sales</div>
            <div className={"w-10/12 flex items-center"}>
              {input({label:'Click Through', name:'click_through', parent:'goal_sales'})}
              {input({label:'Engagement', name:'engagement', parent:'goal_sales'})}
              {input({label:'Impressions', name:'impressions', parent:'goal_sales'})}
            </div>
          </div>
          <div className={"flex items-center"}>
            <div className={"w-2/12"}>Both</div>
            <div className={"w-10/12 flex items-center"}>
              {input({label:'Click Through', name:'click_through', parent:'goal_both'})}
              {input({label:'Engagement', name:'engagement', parent:'goal_both'})}
              {input({label:'Impressions', name:'impressions', parent:'goal_both'})}
            </div>
          </div>
        </div>
       )
    }
    
    return (
      <div>
        <Card {...Card_args} />
        <Card {...Card2_args} />
      </div>
    )
  }

  let content_=(<div>Loading...</div>)
  content_=render()  
  return (    
    <div className={s.component+" "}> 
      <div className={"flex items-center"}>
        <div className={"mb-8 flex-grow"}><h4>Goal Type</h4></div> 
        <div className={"mb-8"}>
          <Button className={""} type="action2" color="" isProcessing={isP} clickHandler={async()=>{
              setP(true)             
              let _d=await handler({action:'update_goal', inData:isL})
              setL(_d)
              setP(false) 
            }}>Update</Button>
        </div> 
      </div>
      {content_}     
    </div>   
  )
}
export default com
