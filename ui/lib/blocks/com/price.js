import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import Popup from './popup';
import s from './price.module.scss';
import Moment from 'moment';

const com = ({item, isOpen=false, setOpen, ...props}) => { 
  const {init_fixed_fee} = (item && item.influencer) ? item.influencer : {} 
  const {variable, total} = item ? item : {} 
  //const {click_through, conversions, engagement, impressions, followers} = (item && item.collab_performance) ? item.collab_performance : {} 
  //console.log("price item", item) 
  let top=(<h4>Price Breakdown</h4>)
  let middle=(
    <div>
      <div className={s.item}>
        <div className={s.label}>Base price</div>
        <div className={s.sep}>:</div>
        <div className={s.value}>Rs. {init_fixed_fee}</div>
      </div>
      <div className={s.item}>
        <div className={s.label}>Variable price</div>
        <div className={s.sep}>:</div>
        <div className={s.value}>Rs. {variable}</div>
      </div>
      <div className={s.item}>
        <div className={s.label}>Total price</div>
        <div className={s.sep}>:</div>
        <div className={s.value}>Rs. {total}</div>
      </div>
    </div>
  )
  let bottom=(<Button type="action2" clickHandler={()=>setOpen(false)}>Done</Button>)

  return(
    <div className={s.main}>
      <Popup  {...{isOpen, setOpen, top, middle, bottom}}/>
    </div>
  )
}
export default com