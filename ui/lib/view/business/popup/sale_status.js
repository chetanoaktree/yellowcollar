import React, { useState , useEffect} from "react";
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input2';
import Select from '../../../select';
import Popup, {remove_fixed} from '../../../blocks/com/popup';
import {status_tag, levels} from '../../_blocks/sale';



import s from './sale_status.module.scss';
import Moment from 'moment';

const com = (props) => {     
  let {isOpen=false, setOpen, isData, handler} = props
  if(!isData.changeToStatus) return (<div></div>)
  let {changeToStatus, item} = isData
  
  const [isState, setState]= useState({}) 

  let top, middle, bottom, content_

  //console.log("isData", isData)
  //console.log("level", levels[item.order.status])
 
  top=(<h4>Change Order Status</h4>)

  useEffect(()=>{
    if(changeToStatus=='processing'){
      setState({expected_delivery_date:''})      
    }else if(changeToStatus=='shipped'){
      setState({courier_service:''})     
    }else if(changeToStatus=='cancelled'){
      setState({cancelled_reason:''})     
    }else if(changeToStatus=='delivered'){
      setState({delivered_to:''})      
    }  
  }, [isData.changeToStatus])

  //console.log("isState", isState)

  const changeHandler = (v, n) => {
    setState(prev=>({...prev, [n]:v}))
  }
  const handler2 = () => {    
    handler( {action:'update_activity', order_item_id:item.item_id, status:changeToStatus, meta:isState})
    console.log("meta", {action:'update_activity', item_id:item.item_id, status:changeToStatus, meta:isState})
    close()
  }
  const close = () => {
    setOpen(false); remove_fixed();
  }

  if(changeToStatus=='processing'){    
     content_=(
      <div className={"flex flex-col items-start"}>
        <div className="mb-2">Expected Delivery Date</div>
        <Input name={'expected_delivery_date'} value={isState.expected_delivery_date} changeHandler={(v,e,n)=>changeHandler(v, n)}/>
      </div>
    )
  }else if(changeToStatus=='shipped'){    
    content_=(
      <div className={"flex flex-col items-start"}>
        <div className="mb-2">Courier Service</div>
        <Input name={'courier_service'} value={isState.courier_service} changeHandler={(v,e,n)=>changeHandler(v, n)}/>
      </div>
    )
  }else if(changeToStatus=='cancelled'){    
    content_=(
      <div className={"flex flex-col items-start "}>
        <div className="mb-2">Cancelled Reason</div>
        <Input name={'cancelled_reason'} value={isState.cancelled_reason} changeHandler={(v,e,n)=>changeHandler(v, n)}/>
      </div>
    )
  }else if(changeToStatus=='delivered'){    
    content_=(
      <div className={"flex flex-col items-start"}>
        <div className="mb-2">Delivered To</div>
        <Input name={'delivered_to'} value={isState.delivered_to} changeHandler={(v,e,n)=>changeHandler(v, n)}/>
      </div> 
    )
  }

  middle=(
    <div className={"flex flex-col items-center"}>
      <div className={"flex flex-wrap items-center mb-8"}>
        {status_tag({status:item.order.status})}
        <div className={"mx-4"}> <img src={"/images/Arrow_right_light.svg"}/></div>
        {status_tag({status:changeToStatus})}
      </div> 
      <div className="w-full">
        {content_}
      </div>     
    </div>
  )
 
  bottom=(
    <div>
    <Button className={"mr-2"} type="action2" color="white" clickHandler={close}>Close</Button>
    <Button type="action2" clickHandler={handler2}>Update {changeToStatus}</Button>
    </div>
  ) 

  return(
    <div className={s.main}>
      <Popup  {...{isOpen, setOpen, top, middle, bottom}}/>
    </div>
  )
}
export default com