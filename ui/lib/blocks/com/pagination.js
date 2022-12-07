import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import s from './pagination.module.scss';

const com = (props) => { 
  let {isConfig, isFilter, setFilter, updateHandler} = props
  let {start, end} = isFilter  
  let {limit, total, result} = isConfig   
  let end_limit=limit

  const [isProcessing, setProcessing] = useState(false)

  //console.log(`start:${start}, end:${end}, limit:${limit}, total:${total}`)
  let c_=''
  const update = async (i, trigger) => {
    let next={...isFilter, ...i}
    setFilter(next)
    setProcessing(trigger)
    await updateHandler(next)
    setProcessing(false)
  }
  const prevHandler = () => {    
    if(isFilter.start > 1){
      let start=isFilter.start-limit
      let end=start+(limit-1)
      update({start, end}, 'prev')
    }   
  }
  const nextHandler = () => {
    if(isFilter.end <= total){
      let start=isFilter.start+limit
      let end=(start+(limit-1)) <= total ? (start+(limit-1)) : total
      update({start, end}, 'next')
    }
  }
  let prev_
  let next_  
  if(start<=1) prev_=s.disabled
  if(end>=total) next_=s.disabled
  let end_= end
  if(end_>=total) end_=total
  if(start>=end_) start=0
  
  return(
    <div className={s.main+' flex items-center '+c_}>
      <div className={s.info+' flex items-center'}>
        <div className={s.value}>{start} - {end_}</div>
        <div className={s.label}>of</div>     
        <div className={s.value}>{total}</div>
      </div>
      <div className={s.prev+' '+s.btn+' '+prev_}>
        <Button type="icon_hit" {...{isProcessing:isProcessing=='prev' ? true : false}} clickHandler={prevHandler}><img src={"/images/Arrow_left_light.svg"}/></Button>
      </div>
      <div className={s.next+' '+s.btn+' '+next_}>
        <Button type="icon_hit" {...{isProcessing:isProcessing=='next' ? true : false}} clickHandler={nextHandler}><img src={"/images/Arrow_right_light.svg"}/></Button>        
      </div>
    </div>
  )
}
export default com