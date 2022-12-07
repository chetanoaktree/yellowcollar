import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from 'react-custom-scrollbars';


import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import SalesSearch from './search/inventory_search'
import getStatus from '../../get/status';
import {get_image_src} from '../../get/product';
import {ThumbImage} from '../../blocks/ui/image_u';
import {checkPercentage} from '../../get/product';

import {get_input} from '../_blocks/input_ui';
import {tag, ApproveReject, Loading, Refresh, Count} from '../_blocks/ui';
import {Card, Expand, DataGrid} from './ui';
import {LocalUI} from '../_blocks/local_ui';

import s from './bulk_upload_u.module.scss';
import Moment from 'moment';

import * as XLSX from 'xlsx/xlsx.mjs';
import { read, utils, writeFileXLSX } from 'xlsx';

import _ from 'lodash'


const com = (props) => {
  let {handler, upload_handler} = props
  //console.log("Bulk Upload props", props) 

  const {user} = useSelector((state) => state.pageData);

  

  const [html, setHtml] = useState(""); 
  const [isFile, setFile] = useState(false);
  const refContainer = useRef(null);
  const tbl = useRef(null); 
  

  const uploadToClient = async(event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]     
      setFile(i)
      console.log("i", i)
      // const data = await i.arrayBuffer();     
      // const workbook = XLSX.read(data);
      // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
      // setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadToServer = async (event) => {
    if(!isFile) return
    const data = await isFile.arrayBuffer();     
    const workbook = XLSX.read(data);
    let products=XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    console.log("products", products)

    let res=await handler({action:'products_upload', products})      
    console.log("res", res)
    await refreshHandler()  

  };
  const uploadToServer_bk = async (event) => {
    
    const body = new FormData();
    body.append("file", isFile);
    body.append("action", 'products_upload');
    body.append("business_id", user.id);
    console.log("body", body)
    let res=await upload_handler(body)
    if(res.meta && res.meta.public_path) {
      await read("https://localhost:3000"+res.meta.public_path)
    }   
    console.log("res", res)
    
  };

  useEffect(async()=>{
    await refreshHandler()
  }, [])
    
  const refreshHandler=async()=>{    
    let data=await handler({action:'get', ...isFilter})  
    let total=await handler({action:'get_total', ...isFilter})  
    setData(data)
    setPagiConfig(prev=>({...prev, total}))      
  }

  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:10})
  const [isFilter, setFilter] = useState({switch:{value:''}, start:1, end:10})
  const [isData, setData] = useState([]) 

  const [isDownloadImages, setDownloadImages] = useState([])  

  const check_action = (i) =>{
    if(i.status=='added' && i.product_id!=null){
      return 'default' 
    }else if(i.status=='new_changes'){
      return 'approve_new_changes' 
    }else if(i.status=='updated' && i.product_id!=null){
      return 'update2inv' 
    }else if(i.product_id!=null){
      return 'added2inv' 
    }else {
      return "add2inv"
    }   
  }

  const action = ({isA, isL, check_data, variation=false}) => {
    return (
      <div className={""}>       
        {isA=='update' && 
          <Button className={"mr-2"} type="action2" color="yellow" clickHandler={async()=>{
            let _d=await handler({action:'update_item', variation, id:isL.id, inData:isL})
            check_data(_d)            
          }}>Update</Button>
        }
        {isA=='add2inv' && 
          <Button className={"mr-2"} type="action2" color="blue" clickHandler={async()=>{
            let _d=await handler({action:'add2inv', variation, id:isL.id, inData:isL})
            check_data(_d)
          }}>Add to Inventory</Button>
        }
        {isA=='update2inv' && 
          <Button className={"mr-2"} type="action2" color="yellow" clickHandler={async()=>{
            let _d=await handler({action:'update2inv', variation, id:isL.id, inData:isL})
            check_data(_d)
          }}>Update to Inventory</Button>
        } 
        {isA=='approve_new_changes' && 
          <div className={"flex items-center"}>
            <Button className={"mr-2"} type="text2" color="red" size="sm" clickHandler={async()=>{
              let _d=await handler({action:'reject_new_changes', variation, id:isL.id, inData:isL})
              check_data(_d)
            }}>Decline</Button>
            <Button className={"mr-2"} type="text2" color="green" size="sm" clickHandler={async()=>{
              let _d=await handler({action:'approve_new_changes', variation, id:isL.id, inData:isL})
              check_data(_d)
            }}>Approve</Button>
          </div>
        }          
      </div>
    )
  }

  let local = ({isL, setL, isA, setA,  new_changes }) => {
    let lui = LocalUI({isL, setL, isA, setA,  new_changes })

    useEffect(()=>{
      console.log("fasty", isL)      
    }, [isL])
    
    let select = ({label, name, options, placeholder, className}) => {
      let ret =lui.select({label, name, options, placeholder, className})
      return ret
    }  
    let input = ({label, name, placeholder, className}) => {
      let ret =lui.input({label, name, placeholder, className})
      return ret
    } 
    let display = ({label, name, placeholder, className}) => {
      let ret =lui.display({label, name, placeholder, className})
      return ret
    } 
    return {
      select,
      input,
      display
    }
  }
  let status_args=({status})=>{
    let args= {label:'Pending', color:'gray'} 
    if(status=='added'){
      args={label:'Added to Inventory', color:'green'}
    }else if(status=='updated'){
      args={label:'Updated', color:'yellow'}
    } else if(status=='new_changes'){
      args={label:'New Changes', color:'orange'}
    } else{
      args={label:'New', color:'blue'}
    } 
    return args
  }
  
  let Variation = ({i, index, isP, setP}) => {
    
    let [isL, setL] = useState({...i, parent_id:isP.product_id})
    let {id, sku, parent_sku, price, discount, image_url, available_units, status, product_id, new_changes={}, meta={}} =isL
    //console.log("v isL", isL)
    
    
    const check_data = (_d) =>{
      setL(prev=>({...prev, ..._d}))
      setA(check_action(_d))
    }

    useEffect(()=>{
      console.log("fasty", isL)      
    }, [isL])

    let [isA, setA] = useState(check_action(isL))

   

    let {select, input, display} = local({isL, setL, isA, setA,  new_changes })

    let status_args_= status_args({status})
    
   
    let action_=action({isA, isL, check_data, variation:true})

    
    return (
      <tr key={index} className={"relative align-top"}>
        <td><div className={"text-xl"}>{tag({size:'md', ...status_args_})}</div></td>        
        <td> { display({label:"SKU", name:'sku', className:'w-48'})}</td> 
        <td> { display({label:isL.attr1name, name:'attr1value', className:'w-48'})}</td> 
        <td> { display({label:isL.attr2name, name:'attr2value', className:'w-48'})}</td> 
        <td> { input({label:"Price", name:'price', placeholder:isP.attr1name, className:'w-48'})}</td>        
        <td> { input({label:"Discount", name:'discount', placeholder:isP.discount, className:'w-48'})}</td>
        <td> { input({label:"Available Units", name:'available_units', placeholder:isP.available_units, className:'w-48'})}</td>
        <td> { input({label:"Image Url", name:'image_url', placeholder:isP.image_url, className:'w-120'})}</td>
        <div className={"sticky pt-2 pr-2"} style={{right:'0px', left:'auto'}}>{action_}</div>
      </tr>
    )
  }  

  const Item=(i)=>{
    i={...i, meta:{industry:'', gender:'', ...i.meta}}
    let [isL, setL] = useState({...i})
    let [isE, setE] = useState(false)
    let [isP, setP] = useState(false)
    let {id, sku, parent_sku, title, desc, price, discount, image_url, image_id, image_path_, available_units, categories, variations=[], status, product_id, new_changes={}, meta={}} =isL
    let { industry, gender, age_group, verified} =meta 

    const check_image = async() => {     
      if(!isL.image_id){  
        let d=await handler({action:'download_image', inData:isL})         
        if(d.image_id) setL(prev=>({...prev, image_id:d.image_id}))          
      } 
    }

    const download_image = async()=>{
      setP(true)
      let d=await handler({action:'download_image', inData:isL})   
      console.log("d", isL)        
      if(d.image_id) setL(prev=>({...prev, image_id:d.image_id, image_path_:d.image_path_})) 
      setA('update')
      setP(false)         
    }
    console.log("isL", isL)  

    useEffect(()=>{
       setTimeout(async()=>{
         //await check_image()
       }, 1000) 
    },[])

    const check_data = (_d) =>{
      setL(prev=>({...prev, ..._d}))
      setA(check_action(_d))
    }
    let [isA, setA] = useState(check_action(isL))

    let {select, input} = local({isL, setL, isA, setA,  new_changes })
    
    let status_args_= status_args({status})
    
    //console.log("isL :", isL)
    //console.log("ACTION :"+product_id, product_id!=null ? 'default' : "add2inv")
    let image_loading = (<Loading {...{
      isProcessing:isP,
      value:(<Button type="hit" className={' flex items-center h-full w-full text-sm text-center bg-center bg-cover rounded-lg '} clickHandler={()=>download_image()}>Download Image</Button>)
    }}/>)
    let content_=(
      <div className={"flex flex-wrap items-center "}>        
        <div className={s.product+" flex p-4 w-4/12"}>
          {(image_id==null || image_id=='') && <div className={s.download+' flex items-center justify-center rounded-lg mr-8 bg-gray-900 bg-opacity-10 '} >{image_loading}</div>}
          {(image_id!=null && image_id!='') && <div className={s.image+' bg-center bg-cover rounded-lg mr-8'} style={{backgroundImage:'url("'+image_path_+'")'}}></div>}
          <div>
            <div className={"text-xl"}>{title}</div>
            <div className={"flex items-center opacity-75 text-sm mb-2"}>
              <div className={'mr-2'}>{price}</div>
              <div className={'text-sm'}>{discount}</div>
            </div>
            <div className={"text-xl"}>{tag({size:'md', ...status_args_})}</div>
          </div>
        </div>
        <div className={" p-4 w-4/12 text-sm"}>
          <div className={"opacity-50 mb-2"}>Details</div>
          <div>SKU : {sku}</div>          
          <div>Categories : {categories}</div>
          <div>Available Units  : {available_units}</div>
        </div>
        <div className={" p-4 w-4/12 text-sm"}>
          <div className={"opacity-50 mb-2"}>Campaign</div>
          <div>Industry : {industry}</div>
          <div>Gender  : {gender}</div>
          <div>Age Group  : {age_group}</div>
          <div>Verified  : {verified}</div>
        </div>
      </div>
    )
    const inputHandler = (n, v) => {
      setA('update')
      setL(prev=>{
        return ({...prev, [n]:v})
      })
    }
    const metaHandler = (n, v) => {
      setL(prev=>{
        let next={...prev, meta:prev.meta ? prev.meta :{}}
        next.meta[n]=v
        return next
      })
    }
    let input2 = ({label, name, style}) => {
      let value=isL[name]
      let cv = (new_changes && new_changes[name]) ? new_changes[name] : ''
      let change_value= (cv && (value != cv)) ? cv : ''
      let i_=get_input({label, name, value, change_value, onChange:inputHandler})      
      let ret = <div className={""} style={{minWidth:'200px'}}>
        { i_}
      </div>  
      return ret
    }
    let meta_input = ({label, name}) => {
      let value=isL.meta[name]
      let cv = (new_changes && new_changes.meta && new_changes.meta[name]) ? new_changes.meta[name] : ''
      let change_value= (cv && (value != cv)) ? cv : ''
      let i_=get_input({label, name, value, change_value, onChange:metaHandler})      
      let ret = <div className={"w-6/12"}>
        { i_}
      </div>  
      return ret
    }  

    


    let expand_=(
      <div className={"mt-4 flex w-full flex-col"}>  
        <div className={"flex items-start "}>  
          <div className={"flex flex-wrap -mx-2"}>   
            <div className={"mb-4 w-full px-2 opacity-50"}>Details</div>
            <div className={"w-6/12 px-2"}>
              <div className={"bg-gray-100 bg-opacity-50 rounded-lg px-3 py-3"}><div className={"opacity-50 text-xs"}>SKU</div><div>{sku}</div></div>
            </div>            
            { input({label:"Title", name:'title'})}             
            { input({label:"Price", name:'price'})}     
            { input({label:"Discount", name:'discount'})}     
            { input({label:"Available Units", name:'available_units'})} 
            { input({label:"Desc", name:'desc'})}       
            { input({label:"Categories", name:'categories'})} 
            { input({label:"Image Url", name:'image_url'})} 
          </div>
          <div className={"flex flex-wrap"}>
            <div className={"mb-4 w-full px-3 opacity-50"}>Campaign </div>         
            { meta_input({label:"Industry", name:'industry'})}
            { meta_input({label:"Gender", name:'gender'})}
            { meta_input({label:"Age Group", name:'age_group'})}         
          </div>
        </div>        
        {variations.length > 0 && 
        <div className={"mt-8 relative"}>   
          <div className={"mb-4 w-full"}><span className={"opacity-50"}>Variations</span> <Count count={variations.length}/></div>
          <div className={"w-full relative"} style={{whiteSpace:'nowrap'}}>
            <div className={"w-full "}>
              <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={200}>
                <table className={'mb-8'}>
                {
                  variations.map((i, index)=>{
                    return <Variation index={index} i={i} isP={isL} setP={setL}/>
                  })
                }
                </table>
              </Scrollbars>
            </div>
          </div>        
        </div> 
        } 
      </div>
    )     
    let action_=action({isA, isL, check_data})

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
  const render_products = ()=>{
    let items=isData.map((i, index)=>{
      return <Item key={index} {...i} />
    })
    let DG_args={       
       isFilter, setFilter,  
       isPagiConfig, setPagiConfig,
       setData,
       handler: async(i)=>{
         //console.log("handler req", i)
         let data = await handler(i) 
         //console.log("handler res", data)         
         return data
       },
       items,       
       pagination:{
          start:1, 
          end:10,
          limit:10,
       },      
       search_extract:{
         product:true,
         influencer:true,
         business:true,
       },
       switch_opt:{
         items:[
            {label:'All', name:''},   
            {label:'New Changes', name:'new_changes' },   
            {label:'New', name:'new' },
            {label:'Updated', name:'updated'},
            {label:'Added to Inventory', name:'added'},
            {label:'Not Added to Inv', name:'not_added'},            
         ],
         active:'awaiting_processing',
         handler:async(i)=>{
          console.log("BL_switch habdler", i)
         }        
       }
    }
    return <DataGrid {...DG_args}/>
  }
  
  let content_=(<div>Loading...</div>)

  
  content_=render_products()  
 
  return (
    <Layout {...props} viewType="business_app" showFooter={true} > 
      <div className={s.main}>
        <div className={s.inner}>
          <div className={s.header+" flex items-center mb-8"}>
            <div className={'flex-grow'}><h3>Bulk Upload</h3></div>            
            <div className={"ml-8"}>
              <div className={s.upload_a+" flex items-center mb-2 bg-gray-900 bg-opacity-10 px-1 py-1 rounded-full"}>
                <div className={"flex-grow pl-4 mr-12"}><input type="file" onChange={uploadToClient} /></div>
                <div className={"flex items-center"}>
                  <Button type="action2" color="yellow" clickHandler={uploadToServer}>Start Bulk Uploading</Button>              
                </div> 
              </div> 
              <div className={"flex"}><Button type={"link"} to="/download/YCC bulk product template.xlsx" className={"ml-4 "}>Download template here.</Button></div>
            </div>
            <div></div>
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


/*
items_=items.map
  [isE, setE]=useState()
  item_expand_=<ItemExpand {...{action:<div/>, expand:<div/>, ...[isE, setE], content:<div/> }}/>
  ret {id:i.id, render:<item_card {...{content:item_expand_}}/>}
      
item_card

item_expand
data_grid
  options
    rows_total = 200
    rows_from = 20
    rows_to = 30
    rows_limit =10
    items = [
      {id, render},
      {id, render}
    ]
  components
    pagination
    search
  render
    items

*/
