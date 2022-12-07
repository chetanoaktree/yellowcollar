import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import Popup from './popup';
import s from './performance.module.scss';
import Moment from 'moment';

const com = ({isOpen=false, setOpen, item, ...props}) => {   
  const {click_through, conversions, engagement, impressions, followers} = (item && item.collab_performance) ? item.collab_performance : {}
  let top=(<h4>Performance Breakdown</h4>)
  let middle=(
    <div>
      <div className={s.item}>
        <div className={s.label}>Click Through</div>
        <div className={s.sep}>:</div>
        <div className={s.value}>{click_through}</div>
      </div>
      {/*<div className={s.item}>
        <div className={s.label}>Conversions</div>
        <div className={s.sep}>:</div>
        <div className={s.value}>{conversions}</div>
      </div>*/}      
      <div className={s.item}>
        <div className={s.label}>Engagement</div>
        <div className={s.sep}>:</div>
        <div className={s.value}>{engagement}</div>
      </div>
      <div className={s.item}>
        <div className={s.label}>Impressions</div>
        <div className={s.sep}>:</div>
        <div className={s.value}>{impressions}</div>
      </div>
      {/*<div className={s.item}>
        <div className={s.label}>Followers Conversion</div>
        <div className={s.sep}>:</div>
        <div className={s.value}>{followers}</div>
      </div>*/}
    </div>
  )
  let bottom=(
    <div>      
      <Button type="action2" clickHandler={()=>setOpen(false)}>Done</Button>
    </div>
    )
  

  return(
    <div className={s.main}>
      <Popup  {...{isOpen, setOpen, top, middle, bottom}}/>
    </div>
  )
}
export default com