import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import Input from '../../input2';
import Popup, {remove_fixed} from '../com/popup';
import s from './edit_influencer.module.scss';
import Moment from 'moment';

const com = ({isOpen=false, setOpen, item, updateInfluencerHandler, ...props}) => { 
  let p={id:0, click_through:0, conversions:0, engagement:0, impressions:0, followers:0} 
  console.log("item", item)
  const [isData, setData] =useState(p)
  const [isProcessing, setProcessing]= useState(false)

  useEffect(()=>{
    console.log("e0", item)
    if(item){
      console.log("effect_1", item)
    }
    if(item && item.id){
      console.log("effect_2", item)
      console.log("effect_treshold", item.treshold)
      p=item.treshold ? item.treshold : p 
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
    await updateInfluencerHandler({...isData, influencer_id:item.influencer_id})    
    setProcessing(false)
  }

  const setOpen2 = (state) =>{
    if(state===false){
      remove_fixed()
    }
    setOpen(state)
  }

  let top=(<h4>Edit Influencer Average Parameters</h4>)
  let middle=(
    <div>
      <div className={s.item}>
        <div className={s.label}>Click Through </div>
        <Input value={isData.click_through} changeHandler={(v)=>changeHandler("click_through", v)}/>
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
  let bottom=(
    <div>
      <Button className={"mr-2"} type="action2" color="white" clickHandler={()=>{setOpen2(false);}}>Close</Button>
      <Button isProcessing={isProcessing} type="action2" clickHandler={updateHandler}>Update</Button>
    </div>    
  ) 

  return(
    <div className={s.main}>
      <Popup  {...{isOpen, setOpen, top, middle, bottom}}/>
    </div>
  )
}
export default com