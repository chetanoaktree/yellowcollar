import React, { useState, useEffect} from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Input from '../../../input2';
import Button from '../../../button';
import AddImage from '../../../blocks/com/add_images';
import {InputText as InputText2, DisplayText as DisplayText2, InputSelect as InputSelect2} from '../../../blocks/ui/ui';
import shortid from 'shortid'
import s from './ie_influencers.module.scss';

import {get_thumb_src} from '../../../get/image';


const com = ({ product_id, user, setTouch, isExtra, setExtra, ikHandler, refreshHandler, imageHandler, saveHandler2, ...props}) => {  
 
  const update = (influencers) =>{ 
    let next={...isExtra, influencers}
    setTouch(1)
    setExtra(next)
  }

  const add = () =>{ 
    let influencers = isExtra.influencers ? isExtra.influencers : [] 
    influencers.push({id:shortid.generate(), label:"img", img:''}) 
    let next={...isExtra, influencers}
    setExtra(next)
  }
  const deleteH = (id) =>{     
    _.remove(isExtra.influencers, {id: id});  
    update(isExtra.influencers)
  }  
  const update_item = (id, v, n) =>{      
    var influencers = _.map(isExtra.influencers, function(a) {
      if(a.id === id) a[n]=v
      return a;
    });  
    update(influencers)
  }  
  const update_item_data = (id, data) =>{      
    var influencers = _.map(isExtra.influencers, function(a) {
      if(a.id === id) a={...a, ...data}  
      console.log("influencer a", a)    
      return a;
    });  
    console.log("influencers", influencers)
    update(influencers)
  }  
  const imageHandler2 = async (d, id) =>{ 
    let d_=await imageHandler(d)
    let out={}  
    if(d_.ik_file){
      out.image_id=d_.ik_file.fileId
      out.image_path=d_.ik_file.filePath
    }  
    update_item_data(id, out)
  }
  const ikHandler2 = async (d, id) =>{ 
    let d_=await ikHandler(d)
    console.log("___d_", d_)
    let out={}  
    if(d_.ik_file){    
      out.image=d_.image
      out.image_id=d_.ik_file.fileId
      out.image_path=d_.ik_file.filePath
    }  
    update_item_data(id, out)
    //saveHandler2()
    //refreshHandler()
    return d_
  }
  
  const sizeOptions=[
    { value: 'col1', label: '1 colums' },
    { value: 'col2', label: '2 columns' },
  ]
  let influencer = (i, index) =>{
    let {id, label, influencer_name, size, img, image, image_path, image_id}=i
    return(
      <div key={index} className={s.item+' flex'}>              
        <div className="flex-grow flex flex-wrap"> 
          <div className="w-2/12 pr-4">
            <AddImage type={"user"} img={img} image={image} image_id={image_id} user={user} product_id={product_id} handler={(d)=>ikHandler2(d, id)}/>            
          </div>         
          <div className="w-10/12 pr-4">
            <div className="mb-4">{InputText2({layout:'vertical', label:'Label', name:'label', value:label, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
            <div className="mb-4">{InputText2({layout:'vertical', label:'Influencer Name', name:'influencer_name', value:influencer_name, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
            <div className="mb-4">{InputSelect2({layout:'vertical', label:'Size', name:'size', value:size, options:sizeOptions, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
            {DisplayText2({layout:'vertical', label:'Img', name:'img', value:image_path})}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ml-4">
          <div className="text-sm opacity-50 mb-4">{id}</div>
          <Button className="" type="text2" size="sm" color="red" clickHandler={()=>deleteH(id)}>Delete</Button>
        </div>
      </div>
    )
  }
  let influencers_
  if(isExtra.influencers){
    influencers_=isExtra.influencers.map((i, index)=>{
      return influencer(i, index)
    })
  }

  return (
    <div className={s.main}>              
      <div className={s.info}>
        <Button type="text2" color="action_blue" className="my-8" clickHandler={add}><div className="flex items-center"><img className="mr-4" src="/images/Add_blue.svg"/> Add Influencer</div></Button>
        {influencers_}       
      </div>
    </div>
  )
}
export default com
