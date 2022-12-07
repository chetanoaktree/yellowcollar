import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input'; 
import User from '../../../blocks/com/user';


import s from '../products_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {PlayVideoBtn, VideoPopup, amount, tag, general_status_tag, ApproveReject, Refresh} from '../../_blocks/ui';
import {Details, Card, Expand, DataGrid} from '../../_blocks/data_ui';
import {get_input, get_select} from '../../_blocks/input_ui';
import {LocalUI} from '../../_blocks/local_ui';

import {ThumbImage} from '../../../blocks/ui/image_u';



const com = (props) => { 
  let { handler } = props 

  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:10})
  const [isFilter, setFilter] = useState({switch:{value:''}, start:1, end:10})
  const [isData, setData] = useState([])
  const [isSw, setSw] = useState('')

  

  useEffect(async()=>{
    let data=await handler({action:'get', ...isFilter})
    //console.log("C DATA", data)
    setData(prev=>data)
  }, [])

  //console.log('isData', isData)
  

  const Item=(i)=>{
    //i={...i, meta:{industry:'', gender:'', ...i.meta}}    
    
    let [isL, setL] = useState({...i})
    let [isE, setE] = useState(false)  
    let [isP, setP] = useState(false)  
    let [isV, setV]= useState(false) 
    let {id, title, price, final_price, instagram_url, fixed_fees={}, business={}, discount, sku, parent_sku, description, categories=false, created_at, discount_amount, status, product_id, new_changes={}, users, image, meta={}} =isL
    let {fixed_fee_story, fixed_fee_reel, fixed_fee_video, fixed_fee_post}  = fixed_fees 
    let {available_units} = meta ? meta : {}      
    business = {name:'', ...business}   
    
    let categories_
    if(categories && categories.length) categories_=categories.map((i, index)=>{
      return (<div className="bg-gray-900 bg-opacity-10 rounded-lg inline-block px-2 text-xs">{i.label}</div>)
    })
    const check_action = (i) =>{
      if(i.status=='live' || i.status=='completed_request'  || i.status=='completed_request' || i.status=='completed'){
        return 'update' 
      }else {
        return "default"
      }   
    }
    
    const check_data = (_d) =>{
      setL(prev=>({...prev, ..._d}))
      setA(check_action(_d))
    }

    let [isA, setA] = useState(check_action(isL))    

    let status_args= {label:'Pending', color:'gray'}   
    if(status=='active'){
      status_args={label:'Active', color:'green'}
    }else if(status=='blocked'){
      status_args={label:'blocked', color:'orange'}
    } else{
      status_args={label:status, color:'blue'}
    } 

    //console.log("isL --", isL)
  console.log("isA --", isA)

    let lui = LocalUI({isL, setL, isA, setA,  new_changes })
    //console.log("lui", lui)
    //lui.doing("df")
    
    
    let select = ({label, name, parent, options}) => {
      let ret =lui.select({label, name, parent, options})
      return ret
    }  
    let input = ({label, name, parent}) => {
      let ret =lui.input({label, name, parent})
      return ret
    }     
    let content_=(
      <div className={"flex items-stretched "}>        
        <div className={s.product+" w-4/12 flex mr-2"}>          
          <div className={"w-full"}>
            <div className={s.gray+" rounded-xl mb-2"}>
              <div className={"flex items-center"}>
                <div className={"mr-4"}><ThumbImage {...{...image}}/></div>
                <div className={"text-lg w-full"}>
                  <div className={'w-full '}>{title} </div> 
                  <div className={'text-sm mb-2 opacity-50'}>{business.name} </div>
                  <div className={'text-sm'}>{categories_}</div>
                </div>
              </div>                           
            </div>  
          </div>
        </div>
        <div className={s.gray+" w-3/12 rounded-xl text-sm p-4 mr-2"}>
          <Details {...{
            header:{
              title:'Product Details'
            },
            items:[
              {label:'SKU', value:sku},
              {label:'Parent SKU', value:parent_sku},
              {label:'Available Units', value:available_units},
            ]
          }}/>  
        </div>
        <div className={s.outline+" w-3/12 rounded-xl p-4 flex flex-col text-sm "}>         
          <Details {...{
            header:{
              title:'Pricing Details'
            },
            items:[
              {label:'Price', value:price, type:'amount'},
              {label:'Discount', value:discount_amount, type:'amount'},
              {label:'Final Price', value:final_price, type:'amount'},                
            ]
          }}/>         
        </div> 
        <div className={" flex-grow rounded-xl text-sm p-4 mr-2"}>
         
        </div>
                   
      </div>
    )

    let expand_=(
      <div className={"mt-4 flex  w-full"}>  
        <div className={" w-4/12 text-xs mb-4"}>   
          <Details {...{
            flow:'row',
            items:[
              {label:'Description', value:description},                          
            ]
          }}/>
        </div> 
        <div className={"w-8/12 flex"}>
           { select({label:"Status", name:'status', parent:'', options:[
            { value: '', label: 'Select Type' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'blocked', label: 'Blocked' },
            { value: 'published', label: 'Published' },
            { value: 'waiting_approval', label: 'Waiting for Approval' },
            { value: 'draft', label: 'Draft' },
            ]})} 
        </div>      
      </div>
    )  
    let action_=(
      <div className={""}>       
        {isA=='update' && 
          <Button className={"mr-2"} type="action2" color="" isProcessing={isP} clickHandler={async()=>{
            setP(true)
             //console.log("isE", isE)  
            let _d=await handler({action:'update_item_details', id:isL.id, inData:isL})
            check_data(_d)
            setP(false)   
            setE(false)
          }}>Update</Button>
        }       
        {isA=='approve_new_changes' && 
          <div className={"flex items-center"}>
            <Button className={"mr-2"} type="text2" color="red" size="sm" clickHandler={async()=>{
              let _d=await handler({action:'reject_new_changes', id:isL.id, inData:isL})
              check_data(_d)
            }}>Decline</Button>
            <Button className={"mr-2"} type="text2" color="green" size="sm" clickHandler={async()=>{
              let _d=await handler({action:'approve_new_changes', id:isL.id, inData:isL})
              check_data(_d)
            }}>Approve</Button>
          </div>
        } 
      </div>
    ) 
     
    let Expand_args={
      id,   
      general_status:status, 
      created_at,   
      content:content_,
      action:action_,
      expand:expand_,     
      isE, setE,      
    }
    let Card_args={
       content:(<div><Expand {...Expand_args}/></div>)
    }
    return <Card {...Card_args} />
  }

  const render = ()=>{
    let items=[]
    if(isData && isData.length){
      items=isData.map((i, index)=>{
        return <Item key={index} {...i} />
      })
    }
    
    let DG_args={    
       isFilter, setFilter,  
       isPagiConfig, setPagiConfig,
       setData,
       handler: async(i)=>{        
         let data = await handler(i)     
         return data
       },
       items,
       header:{
         title:(<h4>Campaigns</h4>), 
         //action:(<Button type="action2" clickHandler={addCoupon}>Add Codes</Button>)
       },
       pagination:{start:1, end:10,limit:10},      
       search_extract:{
         product:true,
         influencer:true,
         business:true,
       },
       search:{
         status_options:[
           {label:'All', name:''},
           {label:'Published', name:'published'},
           {label:'Blocked', name:'bocked'},
           {label:'Rejected', name:'rejected'},
           {label:'Waiting for Approval', name:'waiting_approval' },
           {label:'Draft', name:'draft'}
         ]
       },
       switch_opt:{
         items:[
            {label:'All', name:''},   
           // {label:'New', name:'new'},   
            {label:'Published', name:'published' },   
            {label:'Blocked', name:'blocked' },            
            {label:'Rejected', name:'rejected' },
            {label:'Waiting for Approval', name:'waiting_approval' },
            {label:'Draft', name:'draft' },
            {label:'From Live', name:'from_live' },
            {label:'From Dev', name:'from_dev' },
           // {label:'Used', name:'used'},
           // {label:'Unused', name:'unused'}        
         ],
         active:isSw,
         handler:async(i)=>{
          //console.log("BL_switch habdler", i)
         }        
       }
    }
    return <DataGrid {...DG_args}/>
  }
  
  const addCoupon = async() => {
    //let data=await handler({action:'add_codes'})    
   // setData(data) 
   // setFilter(prev=>({...prev, switch:{value:'new'}}))
  }
  let content_=(<div>Loading...</div>)
  content_=render()  
  return (    
    <div className={s.component+" "}>       
      {content_} 
    </div>   
  )
}
export default com
