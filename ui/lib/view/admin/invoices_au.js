import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input'; 



import s from './invoices_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {get_input, get_select} from '../_blocks/input_ui';
import {ItemTimeStamp, tag, ApproveReject, Refresh, User, amount,  general_status_tag, ThumbImage} from '../_blocks/ui';
import {Details, Card, Expand, DataGrid} from '../_blocks/data_ui';
import {LocalUI} from '../_blocks/local_ui';



const com = (props) => { 
  let { handler } = props 

  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:10})
  const [isFilter, setFilter] = useState({switch:{value:''}, switch2:{value:''}, start:1, end:10})
  const [isData, setData] = useState([])
  const [isSw, setSw] = useState('')
  const [isSw2, setSw2] = useState('')

  
/*
  useEffect(async()=>{
    let data=await handler({action:'get'})
    console.log("C DATA", data)
    setData(prev=>data)
  }, [])
*/
  //console.log('isData', isData)
  const ItemItem = (i) => {
    let {desc, price, f_price, discount, qty, sub_total, product} = i
    let {image, title} = product ? product : {}
    return (
      <div className={s.item_item+" flex items-center px-2 py-1 mb-1 bg-white rounded-md"}>
        <div className={"flex items-center"}>
          <div className={"mr-4"}><ThumbImage {...{...image, size:'xs'}}/></div> 
          <div className={"-ml-5 mr-4 bg-green-200 rounded-full px-1 text-xs "}>{qty}</div>           
        </div> 
        <div className={"flex-grow mr-2"}>          
          <div>{desc}</div>
          <div className={"flex items-center opacity-50"}>
            <div className={"line-through mr-2"}>{price}</div>
            <div className={""}>{f_price}</div>
          </div>
        </div>
        <div>{amount({v:sub_total})}</div>
      </div>
    )
  }
  const Item=(i)=>{

    let [isL, setL] = useState({...i})
    let [isE, setE] = useState(false)  
    let [isP, setP] = useState(false)  
    let {id, code, influencer, business, discount, unit, value, usage, _limit, status, product_id, new_changes={}, users, meta={}, created_at} =isL
    let {type, type_id, type_date, to_type, to_address, by_address, to_gst, by_gst, total, sub_total, tax, items=[]} =isL

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

    let lui = LocalUI({isL, setL, isA, setA,  new_changes })
    
    let select = ({label, name, options}) => {
      let ret =lui.select({label, name, options})
      return ret
    }  
    let input = ({label, name}) => {
      let ret =lui.input({label, name})
      return ret
    }   
    let items_
    let to_invoice = to_type=='influencer' ? (<User {...influencer} size="sm" show_info={true}/>) : (<User {...business} size="sm" show_info={true}/>)
    let by_invoice = to_type=='influencer' ? (<User {...business} size="sm" show_info={true}/>) : (<User {...influencer} size="sm" show_info={true}/>)
    items_=items.map((i, index)=>{
      return(<ItemItem {...i}/>)
    })

    let content_=(
      <div className={"flex flex-wrap items-stretched "}>        
        <div className={"w-3/12 mr-2"}>
          <div className={s.gray+" rounded-xl mb-2"}>
            {to_invoice}                        
          </div> 
          <div className={"flex px-2 text-xs "}>
            <div>To</div>
            <div className={"ml-8 opacity-50"}>
              <div>{to_address}</div>
              {to_gst && <div>GST: {to_gst}</div>}
            </div>
          </div>               
        </div>
        <div className={"w-3/12 mr-2"}>            
          <div className={s.gray+" rounded-xl mb-2"}>
            {by_invoice}              
          </div>   
          <div className={"flex px-2 text-xs"}>
            <div>By</div>
            <div className={"ml-8 opacity-50"}>
              <div>{by_address}</div>
              {by_gst && <div>GST: {by_gst}</div>}
            </div>
          </div>   
        </div>
        <div className={"flex-grow mr-2 text-xs"}> 
          <div className={s.gray+" rounded-xl mb-2 "}>
            <div className={"flex items-center mb-2"}>
              <div className={"flex-grow"}>{items.length} Items</div>             
            </div>
            <div className={"flex flex-col -mx-1"}>
              {items_}
            </div>           
          </div>
        </div>
        <div className={"w-2/12 mr-2 text-xs"}>            
          <div className={s.outline+" rounded-xl mb-2 "}>
            <div className={"flex items-center mb-2"}>
              <div className={"flex-grow"}>Amount</div>
              {general_status_tag({status:status})}
            </div>
            {tax == 0 && <Details {...{                               
              items:[  
                {label:'Total', value:total, type:'amount'},
              ]
            }}/>} 
            {tax!=0 && <Details {...{                               
              items:[                
                {label:'Sub Total', value:sub_total, type:'amount'},           
                {label:'Tax', value:tax, type:'amount'},
                {label:'Total', value:total, type:'amount'},
              ]
            }}/>}            
          </div>
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
        </div>       
      </div>
    ) 

    let action_=(
      <div className={""}>  
        {isA=='default_2' && 
          <a href="/temp/1result2.pdf" target='_blank' download><Button className={""} type="default" color="white" clickHandler={()=>{}}><img src={"/images/Import.svg"}/></Button></a>
        } 
        {isA=='default' && 
          <a href={"/api/download_invoice_2?id="+isL.id} target='_blank' download><Button className={""} type="default" color="white" clickHandler={()=>{}}><img src={"/images/Import.svg"}/></Button></a>
        }    
        {isA=='default_2' && 
          <Button className={""} type="default" color="white" isProcessing={isP} clickHandler={async()=>{
            setP(true)            
            let _d=await handler({action:'download_item', id:isL.id, inData:isL})
            check_data(_d)
            setP(false)   
            setE(false)
          }}><img src={"/images/Import.svg"}/></Button>
        }
        
      </div>
    ) 
    let info_=(
      <div className={"flex flex-wrap items-center text-xs"}>       
        <Details {...{
          flow:'row',        
          items:[
            {label:'Invocie No', value:'#'+id},
            {label:'Invocie Date', value:created_at, type:'timestamp'},
            {label:'Order No', value:'#'+type_id},           
            {label:'Order Date', value:type_date, type:'timestamp'},
          ]
        }}/>  
      </div>
    )  

    let Expand_args={
      id,   
      general_status:'paid',   
      content:content_,
      action2:action_,
      expand:'',
      info:info_,
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
       header:{
         title:(<h3>Invoices</h3>),
         action:(<Button type="action2" clickHandler={addCoupon}>Add Codes</Button>)
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
            {label:'Orders', name:'order'},   
            {label:'Collaborations', name:'collaboration' },   
            {label:'Memberships', name:'membership' },
            {label:'Platform Fee', name:'platform_fee'},                
         ],
         active:isSw,
         handler:async(i)=>{
          console.log("BL_switch handler", i)
         }        
       },
       switch2_opt:{
         items:[
            {label:'All', name:''},   
            {label:'Paid', name:'paid'},   
            {label:'Not Paid', name:'not_paid' }
         ],
         active:isSw2,
         handler:async(i)=>{
          console.log("BL_switch2 handler", i)
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
          <div className={s.content+' flex-grow'}>  
            {content_}         
          </div>
        </div>
      </div>            
    </Layout>    
  )
}
export default com
