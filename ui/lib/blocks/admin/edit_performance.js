import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import Input from '../../input2';
import Popup, {remove_fixed}  from '../com/popup';
import s from './edit_performance.module.scss';
import Moment from 'moment';

const com = ({isOpen=false, setOpen, item, updatePerformanceHandler, ...props}) => {  
  //console.log("isEdit", item.isEdit)
  let p={id:0, click_through:0, conversions:0, engagement:0, impressions:0, followers:0} 

  const [isData, setData] =useState(p)
  const [isProcessing, setProcessing]= useState(false)

  useEffect(()=>{
    console.log("e0", item)
    if(item){
      console.log("effect_1", item)
    }
    if(item && item.id){
      console.log("effect_2", item)
      console.log("effect_per", item.collab_performance)
      p=item.collab_performance ? item.collab_performance : p 
      setData(p) 
    }
    
  }, [item]) 

  const changeHandler=(name, value)=>{     
    setData((prev)=>{ 
      let next = {...prev, [name]:value}      
      return next
    })
  }

  const updateHandler= async ()=>{     
    setProcessing(true)  
    await updatePerformanceHandler({...isData, collab_id:item.id, performance_id:item.performance_id})
    setProcessing(false)
    //setOpen(false)
  }

  const setOpen2 = (state) =>{
    if(state===false){
      remove_fixed()
    }
    setOpen(state)
  }

  let top 
  let bottom
  let middle 
       
  top=(<h4>Edit Performance {item.id} - {isData.id}</h4>)
  bottom=(
    <div>
      <Button className={"mr-2"} type="action2" color="white" clickHandler={()=>{setOpen2(false);}}>Close</Button>
      <Button isProcessing={isProcessing} type="action2" clickHandler={updateHandler}>Update</Button>
    </div>
  ) 
  middle=(
    <div>
      <div className={s.item}>
        <div className={s.label}>Click Through </div>
        <div>{isData.click_through}</div>
        {/*<Input value={isData.click_through} changeHandler={(v)=>changeHandler("click_through", v)}/>*/}
      </div>
      {/*<div className={s.item}>
        <div className={s.label}>Conversions</div>       
        <Input value={isData.conversions} changeHandler={(v)=>changeHandler("conversions", v)}/>
      </div>*/}
      <div className={s.item}>
        <div className={s.label}>Engagement</div>
        <Input value={isData.engagement} changeHandler={(v)=>changeHandler("engagement", v)}/>
      </div>
      <div className={s.item}>
        <div className={s.label}>Impressions</div>
        <Input value={isData.impressions} changeHandler={(v)=>changeHandler("impressions", v)}/>
      </div>
      {/*<div className={s.item}>
        <div className={s.label}>Followers Conversion</div>
        <Input value={isData.followers} changeHandler={(v)=>changeHandler("followers", v)}/>
      </div>*/}
    </div>
  )

  return(
    <div className={s.main}>
      <Popup  {...{isOpen, setOpen, top, middle, bottom}}/>
    </div>
  )
}
export default com