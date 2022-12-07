import React, { useState,  useEffect, useMemo} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from '../../../button';
import Pagination from '../../../blocks/com/pagination';

import {ItemTimeStamp, User, get_id, tag} from '../../_blocks/ui';
import {ItemCollabContent, ItemCollabExpand, ItemCollabAction, itemCollabStatus, item_collab_config} from './d_a_collab_au';
import {ItemProductContent, ItemProductExpand, ItemProductAction, itemProductStatus, item_product_config} from './d_a_product_au';
import {ItemOnboardingContent, ItemOnboardingExpand, ItemOnboardingAction, itemOnboardingStatus, item_onboarding_config} from './d_a_onboarding_au';
//import {ItemInfluencerContent, ItemInfluencerExpand, ItemInfluencerAction, itemInfluencerStatus, item_influencer_config} from './d_a_influencer_au';
import s from './d_actions_au.module.scss';

import Moment from 'moment';

const com = ({actions_handler, ...props}) => { 
  let handler=actions_handler
  const {name, title, content, update_item }=props 

  const [isPagiConfig, setPagiConfig] = useState({total:0, result:0, limit:10})
  const [isFilter, setFilter] = useState({switch:{value:''}, start:1, end:10})
  const [isData, setData]= useState({})
  let items_  

  
  const getData = async(i) => {
    let data = await handler({admin_action:'get_actions', ...i})     
    setData(data) 
  }
  const getTotal = async(i) => {
    let data = await handler({admin_action:'get_actions_total', ...i})     
    setPagiConfig(prev=>({...prev, total:data})) 
  }
  useEffect(async() => {    
    await getData(isFilter)   
    await getTotal(isFilter)   
  }, []); 

  console.log("isData", isData) 

  const pagiHandler = async (i) => {
    console.log("pagination", i)   
    await getData(i) 
    await getTotal(i)     
   // let data = await handler({action:'get', ...i}) 
   // console.log("Pagi Data", data) 
    //setData(data) 
    //updateCache({data, filter:i})  
  } 
  
  
  const Status =({status, done, not_done, action, bottom})=>{      
    return(
      <div className={"flex flex-col justifiy-center items-center text-center w-48"}>
        <div className={"mb-2 w-full"}>
          {!status && tag({size:"md", ...not_done})}
          {status=='done' && tag({size:"md", ...done})}
        </div>
        <div>{tag({size:"sm", ...action})}</div>
        <div className={"text-xs mt-2 opacity-50"}>{bottom}</div>
      </div>
    )
  }

  const Item = (i) => {
    i={...i, handler}    
    let {id, type, action, status, collab, created_at}=i  
   
    const [isS, setS]= useState(status)  
    const [isE, setE]= useState(false)    
    const [isL, setL]= useState({}) 
    const [isItem, setItem]= useState(i)      

   
    let status_
    let config={action:false}
    let item_expand_
    let item_content_
    let item_action_
    
    
    const id_=(
      <div className={s.id2}>{get_id(i)}</div>
    )
    let item_args={...i, isE, setE, isS, setS, isItem, setItem}
    if(type=="collab"){ 
      status_ = (<Status {...{status:isS, ...itemCollabStatus(item_args)}}/>)
      item_content_ = (<ItemCollabContent   {...item_args} />)
      item_expand_ = (<ItemCollabExpand {...item_args} />)
      item_action_ = (<ItemCollabAction {...item_args} />) 
      config = item_collab_config(item_args)     
    } else if(type=="product"){ 
      status_ = (<Status {...{status:isS, ...itemProductStatus(item_args)}}/>)
      item_content_ = (<ItemProductContent   {...item_args} />)
      item_expand_ = (<ItemProductExpand {...item_args} />)
      item_action_ = (<ItemProductAction {...item_args} />) 
      config = item_product_config(item_args)     
    } else if(type=="onboarding"){ 
      status_ = (<Status {...{status:isS, ...itemOnboardingStatus(item_args)}}/>)
      item_content_ = (<ItemOnboardingContent   {...item_args} />)
      item_expand_ = (<ItemOnboardingExpand {...item_args} />)
      item_action_ = (<ItemOnboardingAction {...item_args} />) 
      config = item_onboarding_config(item_args)     
    } else if(type=="influencer"){ 
      status_ = (<Status {...{status:isS, ...itemInfluencerStatus(item_args)}}/>)
      item_content_ = (<ItemInfluencerContent   {...item_args} />)
      item_expand_ = (<ItemInfluencerExpand {...item_args} />)
      item_action_ = (<ItemInfluencerAction {...item_args} />) 
      config = item_influencer_config(item_args)  
    }     
    
    const take_action_=(
      <div>
        {(!isE && !isS && config.action==false) && <Button type="action2" size="xs" color="" clickHandler={()=>setE(prev => !prev)}>
          Click here to take action
        </Button>}
        {item_action_}
      </div>
    )
    const expand_=(
      <div>
        {config.expand && <div>
          {isE==false && <Button type="default" clickHandler={()=>setE(prev => !prev)}><img src={"/images/Expand_down_light.svg"}/></Button>}
          {isE==true && <Button type="default" color="action_blue" clickHandler={()=>setE(prev => !prev)}><img src={"/images/Expand_up_light.svg"}/></Button>}
        </div>}
      </div>
    )

    return(
      <div className={s.item+' ml-8 flex flex-col'}>
        <div className={'flex items-center'}>
          <div className={'-ml-12'}>{id_}</div> {/* Date Updated On*/}
          <div className={'-ml-6 mr-2'}>{status_}</div>
          <div className={''}>{item_content_}</div>
          <div className={'flex-grow'}></div>
          <div className={''}>{take_action_}</div>
          <div className={'ml-4 flex flex-col items-end'}>
            <ItemTimeStamp {...{created_at}}/>
            {expand_}
          </div>
        </div>
        {isE && <div className={'mt-4 flex items-center'}>
          {item_expand_}
        </div>}
      </div>
    )
  }

  if(isData.length){
    items_=isData.map((i, index)=>{
      return <Item key={index} {...i}/>
    })
  }

  const Refresh = () => {
    const refreshHandler=async()=>{
      await getData()
      console.log("refresh")
    }
    return(
      <div className={s.refresh} >
        <Button clickHandler={()=>refreshHandler()}><img src="/images/Refresh_light.svg"/></Button>
      </div>
    )
  }
  
  return (    
    <div className={s.actions+' h-full overflow-auto flex flex-col'}>
      <div className={"flex items-center"}>
        <h4 className={"mb-4 flex-grow"}>Live Actions</h4>
        <Pagination {...{isConfig:isPagiConfig, isFilter, setFilter, updateHandler:pagiHandler}} />        
        <div className={"ml-2"}><Refresh/></div>
      </div>
      <div className={s.items+' flex-grow h-64 lg:h-full relative'}>
        <Scrollbars className={' w-full h-full'} style={{height:'100%', width:'100%'}}>
          {items_}         
        </Scrollbars>
      </div>
    </div>
  )
}
export default com
