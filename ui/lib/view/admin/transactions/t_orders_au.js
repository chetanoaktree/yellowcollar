import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input'; 
import User from '../../../blocks/com/user';


import s from '../variable_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {PlayVideoBtn, VideoPopup, amount, tag, collab_status_tag, ApproveReject, Refresh} from '../../_blocks/ui';
import {Details, Card, Expand, DataGrid} from '../../_blocks/data_ui';
import {get_input, get_select} from '../../_blocks/input_ui';
import {LocalUI} from '../../_blocks/local_ui';



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
    let {id, created_at, order_id, new_changes={}, order, meta={}} =isL    
    let {test, sub_total, total, platform_fee} = meta ? meta : {} 
    let {influencer} = order ? order : {}       
   
    

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

    console.log("isL --", isL)
  //  /console.log("isA --", isA)

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
              <div className={"text-lg w-full"}>{influencer.name}</div>                           
            </div>            
            <div className={"text-xl"}>{collab_status_tag({...isL, size:'sm'})}</div>
          </div>
        </div>
        <div className={s.gray+" w-4/12 rounded-xl text-xs p-4 mr-2"}>
          <Details {...{
            header:{
              title:'Order Details'
            },
            items:[
              {label:'ID', value:'#'+order_id},
              {label:'Status', value:order.status},              
            ]
          }}/>  
        </div>
        <div className={s.gray+" w-4/12  rounded-xl text-xs p-4 "}> 
          <Details {...{
            header:{
              title:'Payment Details'
            },           
            items:[
              {label:'Sub Total', value:amount({v:sub_total})},             
              {label:'Total', value:amount({v:total})},
             // {label:'Variable', value:amount({v:variable})},                      
            ]
          }}/>        
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
            { value: 'blocked', label: 'Blocked' },
            { value: 'new', label: 'New' }
            ]})
          }   
        </div>       
      </div>
    )  
    let action_=(
      <div className={""}>       
        {((isL.status=='live' || isL.status=='completed_request') && isA=='update') && 
          <Button className={"mr-2"} type="action2" color="" isProcessing={isP} clickHandler={async()=>{
            setP(true)
             //console.log("isE", isE)  
            let _d=await handler({action:'update_collab', id:isL.id, inData:isL})
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
      //expand:expand_,
      expand:'',
      isE, setE, 
      created_at,     
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
         title:(<h4>Order Transactions</h4>), 
         //action:(<Button type="action2" clickHandler={addCoupon}>Add Codes</Button>)
       },
       pagination:{start:1, end:10,limit:10},      
       search_extract:{
         product:true,
         influencer:true,
         business:true,
       },
       switch_opt:{
         items:[
            {label:'All', name:''},     
            {label:'Paid', name:'paid' }, 
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
