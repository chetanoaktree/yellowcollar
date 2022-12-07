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

  const get_fixed = (i) => {
    let {fixed_fee_story=0, fixed_fee_reel=0, fixed_fee_video=0, fixed_fee_post=0} = (i.influencer && i.influencer.meta) ? i.influencer.meta : {}
    let fixed_fees = {fixed_fee_story, fixed_fee_reel, fixed_fee_video, fixed_fee_post}    
    return fixed_fees
  }

  const Item=(i)=>{
    //i={...i, meta:{industry:'', gender:'', ...i.meta}}    
   
    
    
    let [isL, setL] = useState({...i, fixed_fees:get_fixed(i)})
    let [isE, setE] = useState(false)  
    let [isP, setP] = useState(false)  
    let [isV, setV]= useState(false) 
    let {id, instagram_url, fixed_fees={}, product={}, business={}, influencer={}, performance={}, base_amount, variable_capped, variable, total, code, type, discount, unit, value, usage, _limit, status, product_id, new_changes={}, users, meta={}} =isL
    let {fixed_fee_story, fixed_fee_reel, fixed_fee_video, fixed_fee_post}  = fixed_fees 
    let {goal, post_type, base, performance_video_path_} = meta ? meta : {}  
    let {click_through} = performance ? performance : {}  
    let {name} = influencer ? influencer : {} 
    business = {name:'', ...business}
    product = {title:'', ...product}
    

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
        <div className={s.product+" w-2/12 flex mr-2"}>          
          <div className={"w-full"}>
            <div className={s.gray+" rounded-xl mb-2"}>
              <div className={"text-lg w-full"}>{name}</div>
              <div className={"opacity-50 text-sm mb-2"}>                
                <div className={'mr-2 w-full '}>{product.title} </div> 
                <div className={'mr-2 w-full opacity-50'}>{business.name} </div>               
              </div>              
            </div>            
            <div className={"text-xl"}>{collab_status_tag({...isL, size:'sm'})}</div>
          </div>
        </div>
        <div className={s.gray+" w-3/12 rounded-xl text-sm p-4 mr-2"}>
          <Details {...{
            header:{
              title:"Collab Details"
            },
            items:[
              {label:'Goal', value:goal},
              {label:'Post Type', value:post_type},
              {label:'Fixed Fee', value:amount({v:base})},
            ]
          }}/>  
        </div>
        <div className={s.gray+" rounded-xl p-4 flex flex-col flex-grow text-sm "}>
          <div className={"flex items-center mb-2"}>
            <div className={"mb-2 flex-grow"}><span className={'opacity-50 text-xs'}>Click Through : </span>{click_through}</div>  
            {performance_video_path_ && <PlayVideoBtn {...{path_:performance_video_path_, setV}}/> }     
          </div>
          <div className={" flex -mx-4"}>
            { input({label:"Engagement", name:'engagement', parent:'performance'})} 
            { input({label:"Impressions", name:'impressions', parent:'performance'})} 
            {/* input({label:"Instagram Url", name:'instagram_url', parent:'meta'})}
            { input({label:"Followers", name:'followers', parent:'treshold'})*/}
          </div> 
          <div className={"mt-4 text-xs"}>
            <Details {...{
              flow:'row',
              items:[
                {label:'Base', value:amount({v:base_amount})},
                {label:'Variable', value:amount({v:variable})},
                {label:'Total', value:amount({v:total})},                
              ]
            }}/>    
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
    }
    let Card_args={
       content:(<div><Expand {...Expand_args}/><VideoPopup isOpen={isV} setOpen={setV} src={performance_video_path_}/> </div>)
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
         title:(<h4>Collaborations</h4>), 
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
           // {label:'New', name:'new'},   
            {label:'Init Payment', name:'init_payment' },   
            {label:'Paid', name:'paid' },
            {label:'Live', name:'live' },
            {label:'Collaborate', name:'collaborate' },
            {label:'Business Accepted', name:'business_accepted' },
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
