import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input'; 
import User from '../../blocks/com/user';


import s from './coupons_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {get_input, get_select} from '../_blocks/input_ui';
import {tag, ApproveReject, Refresh} from '../_blocks/ui';
import {Card, Expand, DataGrid} from '../_blocks/data_ui';
import {LocalUI} from '../_blocks/local_ui';



const com = (props) => { 
  let { handler } = props 

  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:10})
  const [isFilter, setFilter] = useState({switch:{value:''}, start:1, end:10})
  const [isData, setData] = useState([])
  const [isSw, setSw] = useState('')

  

  useEffect(async()=>{
    let data=await handler({action:'get'})
    console.log("C DATA", data)
    setData(prev=>data)
  }, [])

  console.log('isData', isData)

  const Item=(i)=>{
    //i={...i, meta:{industry:'', gender:'', ...i.meta}}
    
    let [isL, setL] = useState({...i})
    let [isE, setE] = useState(false)  
    let [isP, setP] = useState(false)  
    let {id, code, type, discount, unit, value, usage, _limit, status, product_id, new_changes={}, users, meta={}} =isL
    //meta ={users:[], ...meta} 
    //let { users } = meta 

    

    const check_action = (i) =>{
      if(i.status=='added'){
        return 'default' 
      }else if(i.status=='disabled'){
        return 'disabled' 
      }else if(i.status=='new'){
        return 'new' 
      }else if(i.product_id!=null){
        return 'added2inv' 
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
    }else if(status=='disabled'){
      status_args={label:'Disabled', color:'orange'}
    } else{
      status_args={label:'New', color:'blue'}
    } 

    console.log("isL", isL)

    let lui = LocalUI({isL, setL, isA, setA,  new_changes })
    //console.log("lui", lui)
    //lui.doing("df")
    
    
    let select = ({label, name, options}) => {
      let ret =lui.select({label, name, options})
      return ret
    }  
    let input = ({label, name}) => {
      let ret =lui.input({label, name})
      return ret
    }   
    let users_=()=>{
      if(!users.length) return (<div className={"opacity-25 text-xl"}>No Data</div>)      
      let out=users.map((i, index)=>{
        return (
          <div key={index} className={"flex mb-2 text-xs"}>
            <div className={"w-2/12 mr-4 opacity-50"}>#{i.user_id}</div>
            <div className={"w-2/12 mr-4 font-bold"}>{i.user_name}</div>
            <div className={"w-2/12 mr-4"}>{i.user_type}</div>
            <div className={"w-2/12 mr-4 "}>{i.final_price} Rs.</div>
            <div className={"w-2/12 mr-2"}>{i.discount} Rs.</div>
          </div>
        )
      })
      return out
    }
    let heading = (
      <div className={"flex mb-2 opacity-25  text-xs"}>
        <div className={"w-2/12 mr-4 opacity-50"}>#user_id</div>
        <div className={"w-2/12 mr-4 font-bold"}>Name</div>
        <div className={"w-2/12 mr-4"}>Type</div>
        <div className={"w-2/12 mr-4 "}>Price </div>
        <div className={"w-2/12 mr-2"}>discount</div>
      </div>
    )
    let content_=(
      <div className={"flex flex-wrap items-stretched "}>        
        <div className={s.product+" flex mr-2"}>          
          <div className={""}>
            <div className={s.gray+" rounded-xl mb-2"}>
              <div className={"text-xl"}>{code}</div>
              <div className={"flex items-center opacity-50 text-sm mb-2"}>
                <div className={'mr-2'}>{type}</div>
                <div className={'mr-1'}>{value}</div>
                <div className={'text-sm'}>{unit}</div>
              </div>
            </div>            
            <div className={"text-xl"}>{tag({size:'md', ...status_args})}</div>
          </div>
        </div>
        <div className={s.gray+" rounded-xl p-4 flex-grow text-sm"}>
          {heading}
          {users_()} 
        </div>
        <div className={" p-4 w-4/12 text-sm opacity-50 "}>
          <div className={"opacity-50 mb-2"}>Details</div>
          <div>Limit : <span className={"font-bold"}>{_limit}</span></div>
          <div>Usage : <span className={"font-bold"}>{usage}</span></div>
        </div>       
      </div>
    )

    let expand_=(
      <div className={"mt-4 flex items-start "}>  
        <div className={"flex flex-wrap -mx-2"}>   
          <div className={"mb-4 w-full px-3 opacity-50"}>Product Details</div>
          { input({label:"Code", name:'code'})}
          { select({label:"Type", name:'type', options:[
            { value: '', label: 'Select Type' },
            { value: 'membership', label: 'Membership' },
            { value: 'order', label: 'Order' }
            ]})
          } 
          { input({label:"Value", name:'value'})}     
          { select({label:"Unit", name:'unit', options:[
            { value: '%', label: 'Percentage' },
            { value: 'Rs', label: 'Rupees' }
            ]})
          }  
          { input({label:"Limit", name:'_limit'})} 
          { select({label:"Status", name:'status', options:[
            { value: 'active', label: 'Active' },
            { value: 'disabled', label: 'Disabled' },
            { value: 'new', label: 'New' }
            ]})
          }   
        </div>       
      </div>
    )  
    let action_=(
      <div className={""}>       
        {isA=='update' && 
          <Button className={"mr-2"} type="action2" color="" isProcessing={isP} clickHandler={async()=>{
            setP(true)
             console.log("isE", isE)  
            let _d=await handler({action:'update_item', id:isL.id, inData:isL})
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
      content:content_,
      action:action_,
      expand:expand_,
      isE, setE,      
    }
    let Card_args={
       content:(<Expand {...Expand_args}/>)
    }
    return <Card {...Card_args} />
  }

  const render = ()=>{
    let items=[]
    if(isData.length){
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
       pagination:{start:1, end:10,limit:10},      
       search_extract:{
         product:true,
         influencer:true,
         business:true,
       },
       switch_opt:{
         items:[
            {label:'All', name:''},   
            {label:'New', name:'new'},   
            {label:'Active', name:'active' },   
            {label:'Disabled', name:'disabled' },
            {label:'Used', name:'used'},
            {label:'Unused', name:'unused'}        
         ],
         active:isSw,
         handler:async(i)=>{
          console.log("BL_switch habdler", i)
         }        
       }
    }
    return <DataGrid {...DG_args}/>
  }
  
  const addCoupon = async() => {
    let data=await handler({action:'add_codes'})    
    setData(data) 
    setFilter(prev=>({...prev, switch:{value:'new'}}))
  }
  let content_=(<div>Loading...</div>)
  content_=render()  
  return (    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main+' h-full'}>  
        <div className={s.inner+" "}> 
          <div className={s.header+" flex items-center mb-8"}>
            <div className={"flex-grow"}></div>
            <div className={"flex items-center"}>
              <Button type="action2" clickHandler={addCoupon}>Add Codes</Button>              
            </div>  
          </div>
          <div className={s.content+' flex-grow'}>  
            {content_}         
          </div>
        </div>
      </div>            
    </Layout>    
  )
}
export default com
