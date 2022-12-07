import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import Popup from '../com/popup';
import s from './performance.module.scss';
import Moment from 'moment';

const com = ({isOpen=false, setOpen, item, ...props}) => {  
  //console.log("isEdit", item.isEdit)
  let p={click_through:0, conversions:0, engagement:0, impressions:0, followers:0}   

  let top 
  let bottom
  let middle
  
  const view = () =>{    
    top=(<h4>Performance Breakdown</h4>)
    middle=(
      <div>
        <div className={s.item}>
          <div className={s.label}>Click Through</div>
          <div className={s.sep}>:</div>
          <div className={s.value}>{p.click_through}</div>
        </div>
        {/*<div className={s.item}>
          <div className={s.label}>Conversions</div>
          <div className={s.sep}>:</div>
          <div className={s.value}>{p.conversions}</div>
        </div>*/}
        <div className={s.item}>
          <div className={s.label}>Engagement</div>
          <div className={s.sep}>:</div>
          <div className={s.value}>{p.engagement}</div>
        </div>
        <div className={s.item}>
          <div className={s.label}>Impressions</div>
          <div className={s.sep}>:</div>
          <div className={s.value}>{p.impressions}</div>
        </div>
        {/*<div className={s.item}>
          <div className={s.label}>Followers Conversion</div>
          <div className={s.sep}>:</div>
          <div className={s.value}>{p.followers}</div>
        </div>*/}
      </div>
    )
    bottom=(<Button type="action2" clickHandler={()=>setOpen(false)}>Done</Button>)     
  }

  if(item !==" " && item.id){
    p=item.collab_performance ? item.collab_performance : p   
    view() 
  }


  return(
    <div className={s.main}>
      <Popup  {...{isOpen, setOpen, top, middle, bottom}}/>
    </div>
  )
}
export default com