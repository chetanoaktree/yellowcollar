import React, { useState, useEffect, useMemo} from 'react';
import Link from 'next/link'
import Title from '../../../../title';
import Button from '../../../../button';
import Input from '../../../../input2';
import AddImage from '../../../../blocks/com/add_images';
import {InputText as InputText2, DisplayText as DisplayText2} from '../ui/ui';
import shortid from 'shortid'
import _ from 'lodash'

const com = (props) => { 
  let {s, user, banners, update_view_item, imageHandler, ikHandler, update_view}=props  

  console.log("banners", banners) 

  const addBanner = () =>{ 
    let next = banners 
    next.push({id:shortid.generate(), label:"img"}) 
    update_view_item(next, "banners", "meta")
  }
  const deleteBanner = (id) =>{ 
    
    _.remove(banners, {id: id});  
    console.log(id, banners)  
    update_view_item(banners, "banners", "meta")
  }
  const update_item = (id, v, n) =>{   
    //let o=_.update(banners, 'cpp[0].java.python', function(n) { return n * n; });
    var banners_ = _.map(banners, function(a) {
      if(a.id === id) a[n]=v
      return a;
    });
    console.log("banners", banners_)   
    update_view_item(banners_, "banners", "meta")
  }
  const update_item_data = (id, d) =>{       
    var banners_ = _.map(banners, function(a) {
      if(a.id === id) a={...a, ...d}
      return a;
    });
    console.log("banners", banners_)   
    update_view_item(banners_, "banners", "meta")
  }
  const imageHandler2 = async (d, id) =>{ 
    let d_=await imageHandler(d)
    console.log("Image return", d_)
    let out={img:d_.img}
    if(d_.ik_file) out.image_id=d_.ik_file.fileId
    if(d_.ik_file) out.image_path=d_.ik_file.filePath
    update_item_data(id, out)    
  }
  const ikHandler2 = async (d, id) =>{ 
    let d_=await ikHandler(d)
    console.log("Image return", d_)
    let out={img:d_.img}
    if(d_.ik_file) out.image_id=d_.ik_file.fileId
    if(d_.ik_file) out.image_path=d_.ik_file.filePath
    update_item_data(id, out) 
    update_view() 
    return d_  
  }

  

  let banner = (i, index) =>{
    let {id, label, img,  image, image_id,  image_path,  product, promo_type, usp_1, usp_2, usp_3, usp_4}=i
    return(
      <div key={index} className={s.item+' '+s.dark}>  
        <div className="w-2/12 pr-4">
          <AddImage type={"site"} img={img} image={image} image_id={image_id} user={user} product_id={1} handler={(d)=>ikHandler2(d, id)}/>            
        </div>      
        <div className="w-8/12 flex-grow"> 
          <div className="">{InputText2({label:'Label', name:'label', value:label, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
          <div className="">{InputText2({label:'Product', name:'product', value:product, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
          <div className="">{DisplayText2({label:'Image Url', name:'img', value:image_path})}</div>
          <div className="">{InputText2({label:'Promo Type', name:'promo_type', value:promo_type, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
          <div className="">{InputText2({label:'USP 1', name:'usp_1', value:usp_1, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
          <div className="">{InputText2({label:'USP 2', name:'usp_2', value:usp_2, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
          <div className="">{InputText2({label:'USP 3', name:'usp_3', value:usp_3, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
          <div className="">{InputText2({label:'USP 4', name:'usp_4', value:usp_4, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
        </div>
        <div className="flex flex-col justify-center items-center ml-4">
          <div className="text-sm opacity-50 mb-4">{id}</div>
          <Button className="" type="text2" size="sm" color="red" clickHandler={()=>deleteBanner(id)}>Delete</Button>
        </div>
      </div>
    )
  }
  let banners_=banners.map((i, index)=>{
    return banner(i, index)
  })

  
  
  return (    
    <div className={s.section}>
      <h5 className="mb-4 flex items-center">
        <div  className="flex-grow">Banners</div>
        <Button type="text2" color="action_blue" clickHandler={addBanner}><div className="flex items-center"><img className="mr-4" src="/images/Add_blue.svg"/> Add banner</div></Button>
      </h5> 
      <div className="mb-8">
        {banners_}           
      </div>    
    </div>  
  )
}
export default com
