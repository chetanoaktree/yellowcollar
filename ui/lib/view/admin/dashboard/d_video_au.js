import React, { useState , useEffect} from "react";
import Title from '../../../title';
import Button from '../../../button';

import Popup, {remove_fixed} from '../../../blocks/com/popup';
import s from './d_video_au.module.scss';
import Moment from 'moment';

const com = (props) => {  
  let {isOpen=false, setOpen, src, handler} = props
 
  const [isData, setData] =useState({})
  const [isProcessing, setProcessing] =useState(false)
 
  const setOpen2 = (state) =>{
    if(state===false){
      remove_fixed()
    }
    setOpen(state)
  }

  let top=(<h4>Video</h4>)
  let middle=(
    <div className={"mx-auto"} style={{width:'300px', maxWidth:"100%"}}>
      <video className={"w-full"} controls>
        <source src={src} type="video/mp4"/>
        Your browser does not support the video tag.
      </video> 
    </div>
  )
  let bottom=(
    <div>
      <Button className={"mr-2"} type="action2" color="white" clickHandler={()=>{setOpen2(false);}}>Close</Button>      
    </div>    
  ) 
  return(
    <div className={s.main}>
      <Popup  {...{isOpen, setOpen, top, middle, bottom}}/>
    </div>
  )
}
export default com