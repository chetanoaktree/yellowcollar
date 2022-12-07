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
  let {s, user, brands, update_view_item, imageHandler, ikHandler, update_view}=props  

  console.log("brands", brands) 

  const addBrand = () =>{ 
    let next = brands 
    next.push({id:shortid.generate(), label:"img"}) 
    update_view_item(next, "brands", "meta")
  }
  const deleteBrand = (id) =>{ 
    
    _.remove(brands, {id: id});  
    console.log(id, brands)  
    update_view_item(brands, "brands", "meta")
  }
  const update_item = (id, v, n) =>{   
    //let o=_.update(brands, 'cpp[0].java.python', function(n) { return n * n; });
    var brands_ = _.map(brands, function(a) {
      if(a.id === id) a[n]=v
      return a;
    });
    console.log("brands", brands_)   
    update_view_item(brands_, "brands", "meta")
  }
  const update_item_data = (id, d) =>{       
    var brands_ = _.map(brands, function(a) {
      if(a.id === id) a={...a, ...d}
      return a;
    });
    console.log("brands", brands_)       
    update_view_item(brands_, "brands", "meta")
  }
  const imageHandler2 = async (d, id) =>{ 
    let d_=await imageHandler(d)
    //console.log("Image return", d_)
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

  
  let brand = (i, index) =>{
    let {id, label, img, image_id,  image, image_path, product, promo_type, usp_1, usp_2, usp_3, usp_4}=i
    return(
      <div key={index} className={s.item+' '+s.dark}>        
        <div className="flex-grow flex flex-wrap"> 
          <div className="w-2/12 pr-4">
            <AddImage type={"brand"} img={img} image_id={image_id} image={image} user={user} product_id={1} handler={(d)=>ikHandler2(d, id)}/>            
          </div>         
          <div className="w-10/12 pr-4">
            <div className="mb-4">{InputText2({layout:'vertical', label:'Label', name:'label', value:label, update_item:(v, n)=>{update_item(id, v, n)}})}</div>
            {DisplayText2({layout:'vertical', label:'Img', name:'img', value:image_path})}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ml-4">
          <div className="text-sm opacity-50 mb-4">{id}</div>
          <Button className="" type="text2" size="sm" color="red" clickHandler={()=>deleteBrand(id)}>Delete</Button>
        </div>
      </div>
    )
  }
  let brands_=brands.map((i, index)=>{
    return brand(i, index)
  })

  
  
  return (    
    <div className={s.section}>
      <h5 className="mb-4 flex items-center">
        <div  className="flex-grow">Brands</div>
        <Button type="text2" color="action_blue" clickHandler={addBrand}><div className="flex items-center"><img className="mr-4" src="/images/Add_blue.svg"/> Add brand</div></Button>
      </h5> 
      <div className="mb-8">
        {brands_}           
      </div>    
    </div>  
  )
}
export default com
