import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input'; 

import s from '../products_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'


import {User, PlayVideoBtn, VideoPopup, amount, tag, general_status_tag, order_status_tag, ApproveReject, Refresh} from '../../_blocks/ui';
import {Details, Card, Expand, DataGrid} from '../../_blocks/data_ui';
import {get_input, get_select} from '../../_blocks/input_ui';
import {LocalUI} from '../../_blocks/local_ui';

import {get_track} from '../../_blocks/sale';

import {order_status_options} from '../../../get/status';

import {ThumbImage} from '../../../blocks/ui/image_u';

import {get_thumb_src} from '../../../get/image';
import {get_product_title} from '../../../get/product';
import {get_address} from '../../../get/order';






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
    let {id, title, details=[], subtotal, total, price, final_price, instagram_url, fixed_fees={},  influencer={}, business={}, invoices=[], discount, sku, parent_sku, description, categories=false, created_at, items={}, discount_amount, status, product_id, new_changes={}, users, image, meta={}} =isL
    
    let {available_units} = meta ? meta : {}      
    business = {name:'', ...business}  
    details=details[0]?  details[0] : {}
    
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
    let items_=items.map((i, index)=>{
      let {status, qty, final_price_after_discount, price_after_discount}=i
      let {title, image_id, image={}, business}=i.product ? i.product : {}
      let {name}=business ? business : {}
      let title_=get_product_title(i)
      let src_=get_thumb_src(image)
      price_after_discount = final_price_after_discount ? final_price_after_discount : price_after_discount
      return(
        <div key={index} className={"rounded-full bg-white px-2 py-2 flex items-center"}>
          <div className={"w-12 h-12 bg-cover bg-center rounded-full mr-2"} style={{backgroundImage:`url('${src_}')`}}></div>
          <div className={"mr-4 bg-green-100 rounded-xl px-2 -ml-4 text-xs"}>{qty}</div>
          <div className={"flex-grow"}>
            <div className={"text-md"}>{title_}</div>
            <div className={'flex items-center font-normal text-xs'}><span className={"opacity-50 mr-2"}>{name}</span> {amount({v:price_after_discount})}</div>            
          </div>
          <div className={'flex items-center font-normal text-xs'}>
            <div className={"mr-2"}>{order_status_tag({status, size:'sm'})}</div>
            <div>{get_track({status, size:'xs'})}</div>
          </div>
        </div>
      )
    })   
    let content_=(
      <div className={"flex items-stretched "}>        
        <div className={s.product+" w-3/12 flex mr-2"}>          
          <div className={"w-full"}>
            <div className={s.gray+" rounded-xl mb-2"}>
              <div className={"flex items-center"}>
                <div className={"mr-4"}><User {...influencer} show_info={true} size="sm" className={"mr-4"}/></div>                
              </div>                           
            </div>
            <div className={s.outline+" rounded-xl mb-2 text-xs"}>              
              <div className={"opacity-50"}>{get_address(details)}</div> 
            </div>     
          </div>
        </div>        
        <div className={s.gray+" w-6/12 rounded-xl text-sm p-4 mr-2"}>
          <div className={"mb-2 flex items-center"}>            
            <div className={"opacity-25 mr-2"}>Products</div>
            <div className={"bg-white text-gray-900 text-opacity-25 rounded-full px-2"}>{items.length} item{items.length > 1 ? 's':''}</div>
          </div>
          <div>{items_}</div>  
        </div>
        <div className={s.outline+" flex-grow rounded-xl p-4 flex flex-col text-xs "}> 
          <Details {...{
            header:{
              title:'Pricing Details'
            },
            items:[
              {label:'Total', value:total, type:'amount'},
              {label:'Sub Total', value:subtotal, type:'amount'},                         
            ]
          }}/>
        </div> 
        <div className={" flex-grow rounded-xl text-sm p-4 mr-2"}>
         
        </div>
                   
      </div>
    )

    let expand_=(
      <div className={"mt-4 flex  w-full"}>  
        
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
    let action2_=(
      <div className={""}>       
        {(isA=='default' && !invoices.length) &&
          <Button className={""} type="action2" color="white" size="sm" isProcessing={isP} clickHandler={async()=>{
            setP(true)            
            let _d=await handler({action:'generate_invoice', id:isL.id, inData:isL})
            setL(prev=>({...prev, invoices:[{id:12}]}))
            setP(false)               
          }}>Generate Invoice</Button>
        }
        {(isA=='default' && invoices.length!=0) &&
          <a href={"/api/download_invoice?id="+invoices[0].id} target='_blank' download><Button className={""} type="default" color="white" clickHandler={()=>{}}><div className={"flex items-center"}><img className={"mr-2"} src={"/images/Import.svg"}/> Download Invoice</div></Button></a>
        }
      </div>
    )  
    let Expand_args={
      id,   
      general_status:status =='completed' ? 'completed' : 'active', 
      created_at,   
      content:content_,
      action:action_,
      action2:action2_,
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
         title:(<h4></h4>), 
         //action:(<Button type="action2" clickHandler={addCoupon}>Add Codes</Button>)
       },
       pagination:{start:1, end:10,limit:10},      
       search_extract:{
         product:true,
         influencer:true,
         business:true,
       },
       search:{
         status_options:order_status_options
       },
       switch_opt:{
         items:order_status_options,
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
