import React, { useState , useEffect} from "react";
import Title from '../../../title';
import Button from '../../../button';
import Input from '../../../input2';
import Select from '../../../select';
import Popup, {remove_fixed} from '../../../blocks/com/popup';
import {industries, age_groups, regions, genders} from '../../_blocks/influencer';
import {genderOptions,  industryOptions, verifiedOptions, followersOptions} from '../../_blocks/campaign';
import s from './edit_influencer_demographic.module.scss';
import Moment from 'moment';

const com = ({isOpen=false, setOpen, item, influencer_id, getHandler, updateHandler, ...props}) => {   

  influencer_id = influencer_id ? influencer_id : item.influencer_id

  let meta={
    i_gender:{},
    i_industry:[],
    i_followers:{}
  }
  let p2={
    region:[],
    industry:[],
    gender:[],
    age_group:[],
    meta:meta
  } 

  //console.log("item", influencer_id)
  
  const [isData2, setData2] =useState(p2)
  let inData2={...p2, ...isData2}

  let render_objects={
    age_group:age_groups,
    industry:industries,
    region:regions,
    gender:genders,    
  }  

  useEffect(async()=>{
    let isMounted=true
    if(isMounted && isOpen){
      let d=await getHandler({action:'get_influencer_demographic', influencer_id})
      setData2(d)
      //console.log("data", d)
    }
    return (()=>isMounded=false)
  }, [isOpen]) 

  const changeHandler=(name, value)=>{     
    setData((prev)=>{ 
      let next = {...prev, [name]:value}      
      return next
    })
  }

  const updateHandler2= async ()=>{  
    console.log("isData2", isData2)     
    let d=await getHandler({action:'update_influencer_demographic', influencer_id, inData:isData2})
    remove_fixed()
    setOpen(false)
  }

  const objectHandler=(object, index, value, name, label)=>{     
    setData2((prev)=>{ 
      let object_=prev[object] ? prev[object] : []
      if(!object_[index]) object_[index]={value:0, name, label}
      object_[index].value=value
      let next = {...prev, [object]:object_}
      console.log("next", next)      
      return next
    })
  }
  let getObject=(object, label)=>{
    let object_=render_objects[object].map((i, index)=>{
      let value=(isData2[object] && isData2[object][index]) ? isData2[object][index].value : 0
      return(
        <div key={index} className={s.item}>
          <div className={s.label}>{i.label}</div>
          <Input name={i.name} value={value} changeHandler={(v,e,n)=>objectHandler(object, index, v, n, i.label)}/>
        </div>
      )
    })
    return (
      <div className={"mb-8"}>
        <div className={"px-0 md:px-4"}>
          <h5 className={s.label+' mb-4'}>{label}</h5>
          {object_}
        </div>
      </div>
    )
  }  
  const metaChangeHandler=(v, name)=>{     
    setData2((prev)=>{
      let ret={...prev}
      let meta2=ret.meta ? ret.meta : meta
      meta2[name]=v
      ret.meta=meta2
      //console.log("ret", ret)  
      return (ret)
    })
  }
  let {i_gender, i_followers, i_industry} = inData2.meta ? inData2.meta : {}
  
  let top=(<div className={"mx-auto"} style={{maxWidth:'1240px'}}><h4>Edit Influencer Audience Demographic</h4></div>)
  let middle=(
    <div className={"mx-auto"} style={{maxWidth:"1240px"}}>
      <div className={"flex flex-wrap mb-8"}>
        <div className={"w-full md:w-4/12 pr-2" }>
          <div className={s.label}>Gender</div>
          <Select name="i_gender" value={i_gender} isMulti={false} options={genderOptions} placeholder="select gender"  changeHandler={(v, n)=>{metaChangeHandler(v, n)}}/>          
        </div>
        <div className={"w-full md:w-4/12 pr-2" }>
          <div className={s.label}>Followers</div>
          <Select name="i_followers" value={i_followers} isMulti={false} options={followersOptions} placeholder="select followers"  changeHandler={(v, n)=>{metaChangeHandler(v, n)}}/>          
        </div>
        <div className={"w-full md:w-4/12" }>
          <div className={s.label}>Industry</div>
          <Select name="i_industry" value={i_industry} isMulti options={industryOptions} placeholder="select industry"  changeHandler={(v, n)=>{metaChangeHandler(v, n)}}/>          
        </div>
      </div>  
      <div className="flex flex-wrap mx-auto" >
        <div className={"w-full md:w-6/12"}>
          {getObject("gender", "🧑 Gender")}
          {getObject("region", "🌐 Region")}  
        </div>
        <div className={"w-full md:w-6/12"}>
          {getObject("age_group", "😊 Age Group")}       
        </div>
      </div>
    </div>
  )
  let bottom=(
    <div>
    <Button className={"mr-2"} type="action2" color="white" clickHandler={()=>{setOpen(false); remove_fixed();}}>Close</Button>
    <Button type="action2" clickHandler={updateHandler2}>Update</Button>
    </div>
  ) 

  return(
    <div className={s.main}>
      <Popup  size="full"  {...{isOpen, setOpen, top, middle, bottom}}/>
    </div>
  )
}
export default com