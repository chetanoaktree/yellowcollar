import React, { useState, useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input2';

import Slate from './ui/slate';
import Moment from 'moment';
import _ from 'lodash'



const com = (props) => { 
  const {s, id, name, title, desc, content, InputText, InputSlate,  DisplayText, update_view_item, Meta, OpenGraph}=props
  console.log("view", props)
  
  return (    
    <div className={s.edit_area}>
      <div className={s.section}>
        {InputText({label:'Title', name:'title', value:title})}
        {DisplayText({label:'Name', name:'name', value:name})}
        {InputText({label:'Description', name:'desc', value:desc})} 
        {InputSlate({label:'Content', name:'content', value:content})}        
      </div>  
      {Meta()}
      {OpenGraph()}                   
    </div>
  )
}
export default com
