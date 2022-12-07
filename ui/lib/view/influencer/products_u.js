import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import ProductItem from './blocks/product_item';
import {categories_options} from '../_blocks/product';
import s from './products_u.module.scss';


import {PlayVideoBtn, VideoPopup, amount, tag, active_status_tag, from_status_tag, collab_status_tag, ApproveReject, Refresh} from '../_blocks/ui';
import {Details, Card, Expand, DataGrid} from '../_blocks/products_ui';
import {get_input, get_select} from '../_blocks/input_ui';
import {LocalUI} from '../_blocks/local_ui';



const com = (props) => {   
  
  
  let {handler, add2cartHandler}=props

   
  const router = useRouter()
  
  useEffect(async () => {     
    //let data=await handler({action:'get'})    
    //setData(data)   
  }, []);
  
  

  //STATES   
  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:12})
  const [isFilter, setFilter] = useState({switch:{value:''}, start:1, end:12})
  const [isData, setData] = useState([])
  const [isSw, setSw] = useState('')

  const Item=(i)=>{    
    
    let [isL, setL] = useState({...i})
    let [isE, setE] = useState(false)  
    let [isP, setP] = useState(false)  
    let [isV, setV]= useState(false) 
    let {id, name, from, meta={}, new_changes ={}} =isL    
    let {
      mobile,
      instagram_url,
      bank_name, 
      bank_ifsc_code, 
      bank_account_no, 
      companyName, 
      gst_no, 
      cin_no, 
      website
    } = meta ? meta : {}     
    
    /*
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
        <div className={s.product+" w-3/12 flex mr-2"}>          
          <div className={"w-full"}>
            <div className={s.gray+" flex w-full rounded-xl mb-2"}>
              <User {...isL} size="sm" className={"mr-4"}/> 
              <div>            
                <div className={s.name+' text-sm'}>{isL.name}</div>
                <div className={s.email+' text-xs opacity-50'}>{isL.email}</div> 
              </div>                            
            </div>            
            <div className={"text-xl flex items-center"}>
              {active_status_tag({...isL, size:'sm', className:'mr-2 w-6/12'})}
              {from_status_tag({...isL, size:'sm', className:'w-6/12'})}
            </div>
          </div>
        </div>
        <div className={s.gray+" w-3/12 rounded-xl text-xs p-4 mr-2"}>          
          <Details {...{
            header:{
              title:'Details'
            },
            items:[
              {label:'Mobile', value:mobile},
              {label:'Instagram Url', value:instagram_url},
              {label:'Website', value:website},
            ]
          }}/>  
        </div>
        <div className={s.gray+" w-3/12 rounded-xl p-4 text-xs mr-2"}>          
          <div className={"mt-4 text-xs"}>
            <Details {...{
              header:{
                title:'Company Details'
              },             
              items:[
                {label:'Company Name', value:companyName},
                {label:'CIN No.', value:cin_no}         
              ]
            }}/>    
          </div>      
        </div> 
        <div className={s.gray+" w-3/12 rounded-xl p-4 text-xs "}>          
          <div className={"mt-4 text-xs"}>
            <Details {...{
              header:{
                title:'Bank Details'
              },              
              items:[
                {label:'Bank Name', value:bank_name},
                {label:'Account No.', value:bank_account_no},
                {label:'IFSC Code', value:bank_ifsc_code},
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
       content:(<div><Expand {...Expand_args}/></div>)
    }
    //return <Card {...Card_args} />*/
    return (<ProductItem product={i}/>)
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
         title:(<h4>Products</h4>), 
         //action:(<Button type="action2" clickHandler={addCoupon}>Add Codes</Button>)
       },
       search:{
         placeholder:'search by  business name, status etc', 
         categories_options:categories_options,
         extract:{
            product:true,
            influencer:true,
            business:true,
         },
       },
       disable_check:true,
       pagination:{start:1, end:10,limit:10},
       /*switch_opt:{
         items:categories_options,
         active:isSw,
         handler:async(i)=>{
          //console.log("BL_switch habdler", i)
         }        
       }*/
    }
    return <DataGrid {...DG_args}/>
  }

  let content_=(<div>Loading...</div>)
  content_=render() 

  props.navArgs.translucent=false 
  props.navArgs.noborder=false  

  return (
    <Layout {...props} viewType="influencer_app" showShopNav={false}> 
      <div className={s.main}>
        <div className={s.inner}> 
          {content_}      
        </div>        
      </div>
    </Layout>    
  )
}
export default com
