import React, { useState, useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input2';
import {InputText as InputText2} from './ui/ui';
import Banners from './blocks/banners';
import Brands from './blocks/brands';

import Slate from './ui/slate';
import Moment from 'moment';
import shortid from 'shortid'
import _ from 'lodash'



const com = (props) => { 
  let {s, user, id, name, title, desc, content, InputText,  DisplayText, update_view_item, imageHandler, ikHandler, update_view, Meta, OpenGraph, meta}=props
  console.log("view", props)

  meta = meta ? meta : {banners:[], brands:[]}
  meta.banners = meta.banners ? meta.banners : []
  meta.brands = meta.brands ? meta.brands : []
  let {banners, brands} = meta  
  console.log("meta", meta) 
  
  return (    
    <div className={s.edit_area}>
      <div className={s.section}>
        {InputText({label:'Title', name:'title', value:title})}
        {DisplayText({label:'Name', name:'name', value:name})}
        {InputText({label:'Description', name:'desc', value:desc})}      
      </div>
      <Banners {...{s, banners, user, update_view_item, imageHandler, ikHandler, update_view}}/>  
      <Brands {...{s, brands, user, update_view_item, imageHandler, ikHandler, update_view}}/>     
      {Meta()}
      {OpenGraph()}                   
    </div>
  )
}
export default com
