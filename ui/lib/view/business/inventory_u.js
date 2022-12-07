import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import SalesSearch from './search/inventory_search'
import getStatus from '../../get/status';
import {get_image_src} from '../../get/product';
import {ThumbImage} from '../../blocks/ui/image_u';
//import Widgets from '../../blocks/com/widgets';
//import Collabs from '../../blocks/business/collabs';
import {checkPercentage} from '../../get/product';
import s from './inventory_u.module.scss';
import Moment from 'moment';







const com = ({items, widgets, product_status_options, updateHandler, ...props}) => {
  //if(!items) return (<div></div>) 
  
  const[isFilter, setFilter] = useState({query:'', product_status:'', product_id:'', product_name:''})  

  let items_
  let top_

  const changeHandler=(v)=>{
    console.log("search", v)
    setFilter((prev)=>({...prev, search:v }))
  }
  //console.log("randomstring", randomstring(7))
 // console.log("inventory", items)
  
  if(items){
    items_=items?.map((i, index)=>{      
      i.influencer=i.influencer2
      //console.log("i", i.stats)
      let {sales, available_units} = i.stats[0] ? i.stats[0] : {sales:0, available_units:0}
      //let stats_sales = i.stats[0] ? i.stats[0].sales : 0
      //let available_units = (i.meta && i.meta.available_units) ? i.meta.available_units : 0
      let ps_
      let pc_
      let src=get_image_src(i)
     
      let discountRupee=(i.discount && checkPercentage(i.discount)) ? '' :'Rs'
      let discount_ = i.discount ? 'Offer Discount - '+ i.discount +' '+ discountRupee : ''
      return (
        <div key={index} className={s.item+' item items-center'}>
          <div className={s.image_area}>
            <ThumbImage {...{...i.image}}/>
          </div>
          <div className={s.name_area}>
            <h5 className={s.id}>{i.title}</h5>        
            <div className={s.stock+" font-abhaya"}>In Stock</div>       
            <h6 className={s.discount}> {discount_} </h6>       
          </div> 
          <div className={s.stats+' flex flex-col items-end mr-10 '}>          
            <div>
              <div>Sales: {sales}</div>
              <div>Available Units: {available_units}</div>
            </div>
          </div>
          <div className={s.price_area+' w-48 flex flex-col items-end'}>          
            <h4 className={s.discount}>{i.final_price} Rs.</h4>  
            <div className={'text-sm line-through'}>{i.price} Rs.</div>  
          </div>          
          <div className={s.action_area}>          
            <Button className="mb-4" type="action2" color="black" to={"/app/inventory/"+i.id}>Edit</Button>
            {/*<Button type="action2">Check Sales</Button>*/}
            
          </div>        
        </div>
      )
    })
 

    top_=(
      <div className={s.header}>
        <h3 className="mb-4">Inventory</h3>
        <div className={"flex items-center mb-8"}>
          <div className={"flex-grow"}><Button className={''} type="action2" color="action_blue" to="/app/inventory/new">+ Add new product</Button></div>
          <div className={""}>
            {/*<Button className={'mr-4'} type="action2" color="white" to="/app/inventory/bulk_update">Bulk Product Update</Button>*/}
            <Button className={''} type="action2" color="blue" to="/app/inventory/bulk_upload">Bulk Product Upload</Button>
          </div>
        </div>
        <SalesSearch {...{product_status_options, updateHandler}}/>         
      </div>
    )
  }

  return (
    <Layout {...props} viewType="business_app" showFooter={true} > 
      <div className={s.main}>   
        {top_}     
        <div className={s.items}>                  
          {items_} 
          
        </div>
      </div>
    </Layout>    
  )
}
export default com
