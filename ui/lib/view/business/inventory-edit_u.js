import React, { useState, useEffect, useRef } from 'react';
import Router, { withRouter } from 'next/router'
import Validator from 'simple-react-validator';
import {NotificationManager} from 'react-notifications'

import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Input from '../../input2';
import Select from '../../select';
import Textarea from '../../textarea';
import TabSwitch from '../../tab_switch'; 
import Search from '../../blocks/com/search';
import ManageImages from '../../blocks/com/manage_images';
import AddImage from '../../blocks/com/add_images';
import {tag, WeightSlider, Count} from '../_blocks/ui';

import getStatus from '../../get/status';
import {getDiscountedPrice, trim as trimPercentage, checkPercentage} from '../../get/product';
import ProductInfluencers from './inventory/ie_influencers';
import CampaignDetails from './inventory/ie_campaign_u';
//import Widgets from '../../blocks/com/widgets';
//import Collabs from '../../blocks/business/collabs';
import s from './inventory-edit_u.module.scss';
import Moment from 'moment';
import _ from 'lodash'






const com = (props) => {
  let {isData, campaign_init, isCampaign, setCampaign, setData, isExtra, setExtra, images, categories, user, handler, imageHandler, ikHandler, productImageHandler, saveHandler, refreshHandler, getImagesHandler, deleteImageHandler, deleteHandler}=props
  
  let validator= new Validator()
  let f=validator.fields
  console.log("isData", isData)
  //console.log("categories", categories)
  const discountUnitOptions = [
    { value: 'amount', label: '₹' },
    { value: '%', label: '%' }
  ] 
  //const data={id:0, sku:0, description:' ', categories:[],  price:0, discount:'', discountUnit:[], img:'', ...item}
  //let campaignData=campaign ? {gender:0, followers:0, ...campaign.meta} : {gender:0, followers:0}
 const [isProcessing, setProcessing] = useState('');
 const [isSlider, setSlider] = useState({ x: 10, y: 10 });
 const [isTouch, setTouch] = useState(0);
 const [showMessage, setMessage] = useState(0);

 const [isV, setV] = useState({
   test:true
  });

  const [isType, setType] = useState('details')
  const [isLoading, setLoading] = useState(false)  
  //const [isData, setData] = useState(data)  
  const [isFile, setFile] = useState({name:''})  
  const [createObjectURL, setCreateObjectURL] = useState(isData ? "/products/"+isData.img : '' );

  let {variations} = isData ? isData : {}
 
  const handleChange=(e)=>{
    //console.log(e.target.files[0])
    let i=e.target.files[0]
    setFile(i)
    setCreateObjectURL(URL.createObjectURL(i));
  }

  const saveHandler2= async (close)=>{
    setProcessing(close)
    let action="new_data"
    let message="created"
    if(isData.id) {
      action="save_data"
      message="saved"
    } 
    const updated = await handler({action, business_id:user.id, ...isData, extra:isExtra, campaign:isCampaign})
    console.log("updated ", updated)
    NotificationManager.info('Product Saved');
    setProcessing('')
    let d={}
    if(isData.id) {
      d=check_discount(updated.product)
    }
    setData((prev)=> ({...prev, ...updated.product, ...d}))     
    setCampaign((prev)=>({...prev, ...updated.campaign}))
    setExtra((prev)=>({...prev, ...updated.extra}))

    setTouch(0)  
    setMessage(0)    
    if(close=="close"){
      Router.push({
        pathname: '/app/inventory/',
        query: { name: message}
      })
    }else if(isData && isData.id){     
     // refreshHandler() 
    }else{     
      Router.push({
        pathname: '/app/inventory/'+updated.id,
        query: { name: message}
      })    
    }  
    
  }  
  const deleteHandler2= async (id)=>{   
    const deleteProduct = await deleteHandler({action:"delete_data", id:isData.id, business_id:user.id})
    console.log("deleteProduct", deleteProduct)
    Router.push({
      pathname: '/app/inventory/',
      query: { name: "deleted"}
    })
  } 
  const closeHandler2= async (id)=>{       
    Router.push({
      pathname: '/app/inventory/',
      query: { name: "closed"}
    })
  }  

  
  const saveHandler2a= async ()=>{
    let action="new_data"
    let message="created"
    if(isData && isData.id) {
      action="save_data"
      message="saved"
    }
    const formData = new FormData();
    formData.append('file', isFile);
    formData.append('fileName', isFile.name);
    
    /*
    for (var pair of isData.entries()) {
        formData.append(pair[0], pair[1]);
    }*/

    _.forOwn(isData, function(value, key) { 
      formData.append(key, value);
    });

    formData.append('action', action);
    formData.append('business_id', user.id);
   
    console.log("formData", formData.get('file'))
    
    //await saveHandler({action,business_id:user.id, ...isData})
    const savedProduct=await saveHandler(formData)
    Router.push({
      pathname: '/app/inventory/'+savedProduct.id,
      query: { name: message}
    })
  }  

  let final_price
  final_price=getDiscountedPrice(isData.price, isData.discount, isData.discountUnit)
  

  if(categories){
    const categoryOptions=categories.map((i, index)=>{
      return {value:i.id, label:i.name}
    })
  }
  const categoryOptions2 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ] 

  const get_discount =({discount}) =>{
    let discountValue=discount
    let discountUnit =discountUnitOptions[0]
    if(checkPercentage(discount)){
      //console.log("THIS IS PERCENTAGE", discountValue)
      discountUnit=discountUnitOptions[1]
      //discountValue=trimPercentage(discountValue)
    }else{
      //console.log("THIS IS AMOUNT")
    }
    return {discountUnit, discountValue}
  }

  /*useEffect(()=>{
    if(isData.discount){
      let discount=isData.discount
      let discountUnit =discountUnitOptions[0]
      if(checkPercentage(isData.discount)){
        console.log("THIS IS PERCENTAGE")
        discountUnit=discountUnitOptions[1]
        discount=trimPercentage(discount)
      }else{
        console.log("THIS IS AMOUNT")
      }
      setData((prev)=> ({...prev, discount, discountUnit})) 
    }
  }, [isData.discount])*/

  const check_discount = (i) => {
    let discountSet = {discountUnit:discountUnitOptions[0], discountValue:0}
    if(i.discount){
      discountSet=get_discount({discount:i.discount})
      console.log("DISCOUNT", discountSet)
    }
    return discountSet
  }

  useEffect(()=>{
    let d=check_discount(isData)
    setData((prev)=> ({...prev, ...d})) 
  }, [isData.discount])
  
  
  const changeHandler=(v, name)=>{    
    setTouch(1) 
    setData((prev)=>{
      let ret={...prev, [name]:v}
      console.log("ret", ret)  
      return (ret)
    })
  }
  
  const changeMetaHandler=(v, name)=>{
    setTouch(1)      
    setData((prev)=>{
      let next={...prev}
      if(!next.meta) next.meta={}
      next.meta[name]=v     
      console.log("next", next)  
      return (next)
    })
  } 
  const changeStatsHandler=(v, name)=>{
    setTouch(1)      
    setData((prev)=>{
      let next={...prev}
      if(!next.stats) next.stats={}
      next.stats[name]=v     
      console.log("next", next)  
      return (next)
    })
  }  
   
  const Variation=(i)=>{
    const [isA, setA]= useState('default')
    const [isP, setP]= useState(false)
    const [isL, setL]= useState(i)
    let {stats, attributes} = isL ? isL : {}
    let available_units = (stats && stats.available_units) ? stats.available_units : ''
    console.log("isA", isA)

    

    useEffect(()=>{
      let d=check_discount(isL)
      setL((prev)=> ({...prev, ...d})) 
    }, [isL.discount])

    const variationHandler=( v, name)=>{             
      setL((prev)=>{
        let next={...prev}
        next[name]=v
        console.log("next", next)  
        setA('update')   
        return (next)
      })      
      //setTouch(1) 
    }
    const variationStatsHandler=( v, name)=>{             
      setL((prev)=>{                
        let next={...prev}
        next.stats[name]=v  
        console.log("next", next)  
        setA('update') 
        return (next)
      })          
      //setTouch(1)  
    }    
    let attributes_=()=>{
      let ret=attributes.map((i, index)=>{
        return(
          <div key={index} className={s.input_display+" w-3/12 mr-2"}>
            <div className={s.label}>{i.attribute}</div>
            <div className={s.value}>{i.value}</div>           
          </div>
        )
      })
      return ret
    }

    return(
      <div className={"flex items-center"}>
        <div className={"flex"}>
          <div className={s.input_display+" w-3/12 mr-2"}>
            <div className={s.label}>Sku </div>
            <div className={s.value}>{isL.sku}</div>  
          </div> 
          {attributes_()}
          <div className={s.input+" w-4/12 mr-2"}>
            <div className={s.label}>MRP <span className={'opacity-50'}>Price Including Tax</span></div>
            <Input placeholder="enter value. e.g. 200" name="price" value={isL.price} changeHandler={(v, e, n)=>{variationHandler(v, n)}}/> 
          </div>
          <div className={s.input+" w-4/12 mr-2"}>
            <div className={s.label}>Discount</div>
            <div className={"flex"}>
              <Input placeholder="enter value or percentage. e.g. 10 or 10%" name="discount" value={trimPercentage(isL.discountValue)} changeHandler={(v, e, n)=>{variationHandler(v, n)}}/> 
              <Select className={"ml-2 w-48"} name="discountUnit" defaultValue={[discountUnitOptions[0]]} value={isL.discountUnit} isMulti={false} options={discountUnitOptions} placeholder="unit"  changeHandler={(v, n)=>{variationHandler(v, n)}}/>
            </div> 
          </div>
          <div className={s.input+" w-3/12 mr-2"}>
            <div className={s.label}>Available Units</div>
            <Input placeholder="enter available unit. e.g. 10" name="available_units" value={available_units} changeHandler={(v, e, n)=>{variationStatsHandler(v, n)}}/> 
          </div>
        </div>
        <div className={"flex"}>
          {isA=='update' &&
            <Button isProcessing={isP} type="action2" color="yellow" clickHandler={async()=>{
              setP(true)
              let d_=await handler({action:'save_data', ...isL})              
              let dis=check_discount(d_)             
              setL((prev)=> ({...prev, ...d_, ...dis})) 
              setP(false)
              setA('default')
              setTouch(0)   
            }}>Save</Button>
          }
        </div>
      </div>
    )
  }
  const variations_=()=>{
    if(!variations) return false
    let vitems_=variations.map((i, index)=>{
      let available_units = (i.stats && i.stats.available_units) ? i.stats.available_units : ''
      return (<Variation key={index} {...i}/>)
    })
    return (
      <div className={s.variations}>   
        <h5 className={"mb-4"}>Variations <Count count={variations.length}/></h5> 
        <div>
          {vitems_}
        </div>   
      </div>
    )
  }
  const details = () =>{
    let available_units = (isData.stats && isData.stats.available_units) ? isData.stats.available_units : ''
    return(
      <div>
        {isData.id && 
           <div className={s.images+ ' flex '}>
            <div className={s.info+' mr-2'}>         
              <div className={s.input+" md:mr-2"}>
                <div className={s.label}>Product Image</div> 
                {/*<AddImage img={isData.img} image_id={isData.image_id} image={isData.image} user={user} product_id={isData.id} handler={productImageHandler}/>*/}
                <AddImage img={isData.img} image_id={isData.image_id} image={isData.image} user={user} product_id={isData.id} handler={ikHandler}/>
              </div>
            </div>
            {/*<div className={s.info+' flex-grow md:ml-2'}>
              <div className={s.info_title}>Product Image Gallery</div> 
              <ManageImages images={images} user={user} product_id={isData.id} getImagesHandler={getImagesHandler} deleteImageHandler={deleteImageHandler}/>          
            </div>*/}
          </div>
        }       
        <div className={s.info}>
          <div className="flex items-start">
            <div className={s.input+" w-3/12 mr-2"}>
              <div className={s.label}>Title</div>
              <Input placeholder="enter product name"name="title" value={isData.title} changeHandler={(v, e, n)=>{changeHandler(v, n)}}/> 
            </div>
            <div className={s.input+" w-3/12 mr-2"}>
              <div className={s.label}>Sku  <span className="text-xs opacity-75">  (Stock Keeping Unit)</span></div>
              <Input placeholder="enter sku value. e.g. ST123" name="sku" value={isData.sku} changeHandler={(v, e, n)=>{changeHandler(v, n)}}/> 
            </div>
            <div className={s.input+" w-3/12 mr-2"}>
              <div className={s.label}>Category</div>
              <Select name="categories" value={isData.categories} isMulti options={categoryOptions} placeholder="select category"  changeHandler={(v, n)=>{changeHandler(v, n)}}/> 
            </div>
            <div className={s.input+" w-3/12 mr-2"}>
              <div className={s.label}>Available Units</div>
              <Input placeholder="enter available unit. e.g. 10" name="available_units" value={available_units} changeHandler={(v, e, n)=>{changeStatsHandler(v, n)}}/> 
            </div>
          </div>
          <div className={s.input+" "}>
            <div className={s.label}>Description</div>
            <Textarea name="description" value={isData.description} changeHandler={(v, e, n)=>{changeHandler(v, n)}}/> 
          </div>
        </div>

        <div className={s.pricing}>
          <div className="flex items-center">
            <div className={s.input+" w-4/12 mr-2"}>
              <div className={s.label}>MRP <span className={'opacity-50'}>Price Including Tax</span></div>
              <Input placeholder="enter value. e.g. 200"name="price" value={isData.price} changeHandler={(v, e, n)=>{changeHandler(v, n)}}/> 
            </div>
            <div className={s.input+" w-4/12 mr-2"}>
              <div className={s.label}>Discount Offered</div>
              <div className={"flex"}>
                <Input placeholder="enter value or percentage. e.g. 10 or 10%" name="discount" value={trimPercentage(isData.discountValue)} changeHandler={(v, e, n)=>{changeHandler(v, n)}}/> 
                <Select className={"ml-2 w-32"} name="discountUnit" defaultValue={[discountUnitOptions[0]]} value={isData.discountUnit} isMulti={false} options={discountUnitOptions} placeholder="unit"  changeHandler={(v, n)=>{changeHandler(v, n)}}/>
              </div> 
            </div>
            <div className={s.input+" flex-grow"}>
              
            </div>
            <div className={s.input+" flex flex-col items-end mr-2"}>
              <div className={s.label}>Final Price</div>
              <h5 className={s.final_price}>{(final_price ? "Rs."+final_price : "Please enter MRP & Discount")}</h5>
            </div>
          </div> 
          <div className={s.label}>90% of our businesses offer products at a discount of 40% or above to get under the radar of better and more influencers. <br/>The final price should be lower than the product price on any other platform.</div>         
        </div>
        {variations_()}
        <div className={s.footer}>
          <div className={"flex-grow"}></div>          
        </div>
      </div>
    )
  }
  const campaignDetails = () =>{
    return <CampaignDetails {...{s, setTouch, ...props}}/>
  } 
  const influencersDetails = () =>{
    return <ProductInfluencers {...{ product_id:isData.id, user, refreshHandler, ikHandler, imageHandler, setTouch, isExtra, setExtra, saveHandler2}}/>
  }   

  const type_opt={
    items:[
      {label:'Details', name:'details', isActive:isType == 'details' ? true : false},
      {label:'Campaign', name:'campaign', isActive:isType == 'campaign' ? true : false},
      {label:<div>Influencers <span className={"opacity-25 ml-2 text-xs"}>(Optional)</span></div>, name:'influencers', isActive:isType == 'influencers' ? true : false},
    ],
    handler: async(i) =>{
      //console.log("swithc", i)
      if(isTouch==1) {
        console.log("Save FIrst")
        setMessage(1)
        return false
      }
      setLoading(true)
      setType( prev => i.name )  
      if(i.name=='campaign')    {
       // let data = await handler({action:'get_campaign'}) 
        //let meta = {gender:'', followers:'', ...data.meta}
        //setCampaign((prev)=>meta) 
      }
      setLoading(false) 
    }
  } 
  let content= (<div></div>)
  if(isData){
    //console.log("isData", isData)
    content= (
      <div>
        <div className={s.header}>
          <div className={"flex-grow"}><h4>{isData.title} </h4> {(isData.status && isData.status!='published') && tag({label:isData.status, color:'red'})}</div>
          <Button type="text2" clickHandler={()=>closeHandler2()}>Close</Button>   
          {isData.id && <Button className={"mr-2"} type="text2" color="red" clickHandler={deleteHandler2}>Delete</Button>}                 
          <Button type="action2" isProcessing={isProcessing=='save' ? true : false} clickHandler={()=>saveHandler2('save')}>Save</Button>
          {isData.id && <Button className={"ml-2"} type="action2"  isProcessing={isProcessing=='close' ? true : false} clickHandler={()=>saveHandler2("close")}>Save & Close</Button>}
        </div>
        {isData.id && <div className={"flex items-center mb-4"}>
          <TabSwitch {...type_opt}/>
          {(showMessage==true && isTouch==1) && <div className="ml-8">{tag({label:"Save the current data", color:"red"})}</div>}
          <div className="flex-grow"></div>
        </div> }
        {isType=="details" && details()}  
        {isType=="campaign" && campaignDetails()}
        {isType=="influencers" && influencersDetails()}
      </div>
    )
  }
  return (
    <Layout {...props}  showShopNav={false} viewType="business_app"> 
      <div className={s.main}> 
        {content}     
      </div>
    </Layout>    
  )
}
export default com
