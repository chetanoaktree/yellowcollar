import React, { useState, useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input2';
import AddImage from '../../../blocks/com/add_images';
import Banners from './blocks/banners';
import Brands from './blocks/brands';
import Slate from './ui/slate';
import Moment from 'moment';
import _ from 'lodash'



const com = (props) => { 
  const {s, user, id, name,  slug, desc, content, InputText, InputSlate, DisplayText, imageHandler, ikHandler, update_view, update_view_item,  Meta, OpenGraph, meta}=props
  console.log("view", props)

  meta = meta ? meta : {banners:[], brands:[]}
  meta.banners = meta.banners ? meta.banners : []
  meta.brands = meta.brands ? meta.brands : []
  meta.banner_image = meta.banner_image ? meta.banner_image : {img:'', image_id:'', image:{}}
  let {banners, brands, banner_image} = meta  

  const imageHandler2 = async (d) =>{ 
    let d_=await imageHandler(d) 
    let out={img:d_.img}
    if(d_.ik_file) {
      out.image_id=d_.ik_file.fileId
      out.image_path=d_.ik_file.filePath 
    }   
    update_view_item(out, "banner_image", 'meta')
  }
  const ikHandler2 = async (d) =>{ 
    let d_=await ikHandler(d) 
    let out={img:d_.img}
    if(d_.ik_file) {
      out.image_id=d_.ik_file.fileId
      out.image_path=d_.ik_file.filePath 
    }   
    update_view_item(out, "banner_image", 'meta')
    update_view() 
    return d_  
  }
  
  return (    
    <div className={s.edit_area}>
      <div className={s.section}>  
        <div className={"flex"}> 
          <div  className={"w-2/12"}><AddImage type={"site"} img={banner_image.img} image={banner_image.image} image_id={banner_image.image_id} user={user} product_id={1} handler={(d)=>ikHandler2(d)}/>   </div>
          <div  className={"w-10/12"}>     
            {InputText({label:'Title', name:'name', value:name})}
            {DisplayText({label:'Name', name:'slug', value:slug})}
            {InputText({label:'Description', name:'desc', value:desc})} 
          </div> 
        </div>      
        {/*<div className={s.text_a}>
          <div className={s.label+' w-3/12'}>Content</div>
          <div className={s.input+' w-9/12'}>
            <Slate {...{update_view_item, name:'content', content:content}}/>
          </div>          
        </div>*/}
      </div>      
      {Meta()}
      {OpenGraph()}                   
    </div>
  )
}
export default com
