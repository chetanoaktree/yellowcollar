import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

import {IKDelete} from '../com/image_upload/imagekit'

const process_image_path = ({image}) =>{ 
  if(!image) return {} 
  if(image.path) image.path_=process.env.IKENDPOINT+image.path  
  return image
}


const _is_array_image_id = (list, o, parent='') => { 
  if(_.isArray(o)) {
    _.forEach(o, (v, k)=>{
      let u=v
      if(parent!='') {
        u=u[parent]
        list.push(u.image_id)
      }
    })
  }else{
    //console.log(parent, o)
    if(o.image_id) list.push(o.image_id)
  }
  return list
}

const _set_image = (list, o) => {
  let images_=_.filter(list, ['image_id', o.image_id])
  let image = images_[0] ?  images_[0] : {} 
  if(image){
    o.image=process_image_path({image})  
  }
}
const _set_array_image = (list, o, parent='') => { 
  if(_.isArray(o)) {
    _.forEach(o, (v, k)=>{
      let u=v
      if(parent!='') {
        u=u[parent]
        _set_image(list, u)
      }
    })
  }else{    
    if(o.image_id) {
      _set_image(list, o)
    }
  } 
}
const _getImages = async ({ids}) => {
  console.log('ids', ids)
  ids=_.filter(ids, function square(n) {
    return n ? true : false;
  })
  ids='"'+[...ids].join('","')+'"' 
  console.log('ids', ids)   

  let res = await supabase
  .from('image')
  .select()     
  .filter('image_id', 'in', '('+ids+')')  

  let images=res.data ? res.data : []
  console.log('images', images)
  return images
}
// `*, items:order_item(*, product:product_id(title, image_id))`
// items = await getImagesFromParent(items, 'product', 'items')
const getImagesFromParent = async (items, parent='', superParent='') =>{ 
  let list=[] 
  _.forEach(items, (v, k)=>{
    let o = v 
    if(superParent!='' && parent!='') {
      o=o[superParent]
      list=_is_array_image_id(list, o, parent) 

    }else if(parent!='') {
      o=o[parent]
      list=_is_array_image_id(list, o)
     
    }else{
      if(o.image_id) list.push(o.image_id)
    }  
  })  
  
  let images = await _getImages({ids:list})
 
  if(images.length){
     _.forEach(items, (v, k)=>{
      let o = v 
      if(superParent!='' && parent!='') {
        o=o[superParent]
        _set_array_image(images, o, parent)

      }else if(parent!='') {
        o=o[parent]
        _set_array_image(images, o)
       
      }else{
        _set_image(images, o)
      } 
    })   
  }
  return items
}
const getImages = async (items, type='') =>{ 
  let list=[] 
  let ids2=_.map(items, function square(n) {
    let o = n
    if(type!='' && n[type]) o = n[type]
    return o.image_id ? o.image_id : false;
  })
  ids2=_.filter(ids2, function square(n) {
    return n ? true : false;
  })
  ids2='"'+[...ids2].join('","')+'"' 
   
  //console.log("ids", ids2)

  let res = await supabase
  .from('image')
  .select()     
  .filter('image_id', 'in', '('+ids2+')')  

  list=res.data 
  return list
}
const typeImages = async (items, type='') => {  
  let list=await getImages(items, type)
  //console.log("list", list)
  if(list){
    _.forEach(items, (v, k)=>{
      let o=v
      let t=false
      let image_id=''
      if(type!='' && o[type]) {
        o=o[type]   
        t=true        
      }  

      if(o.image_id!=null) {
        image_id=o.image_id
        console.log("v", o.image_id)
      }
       
      if(image_id!=''){
        let images_=_.filter(list, ['image_id', image_id])
        let image = images_[0] ?  images_[0] : {} 
        if(image){
          o.image=process_image_path({image})  
        }
      }else{
        o.image={}
        o.image_id=''
      }
    }) 
  }
  return items
}
const productImages = async (items) => {
  if(!(items && items[0])) return items
  let type='product'
  if(items[0].image_id){
    type=''
  }
  items=await typeImages(items, type)
  return items
}
const influencerImages = async (items) => {
  if(!(items && items[0])) return items
  let type='influencer'
  if(items[0].image_id){
    type=''
  }
  items=await typeImages(items, type)
  return items
}
const businessImages = async (items) => {
  if(!(items && items[0])) return items
  let type='business'
  if(items[0].image_id){
    type=''
  }
  items=await typeImages(items, type)
  return items
}

const insert_image = async({ik_file, source}) => {
   //console.log("ik_file", ik_file)
   let args = false
   let ret = {image_id:''}
   if(ik_file){
     let { fileId, name, filePath }=ik_file
     args= { name, image_id:fileId, path:filePath, source}
   }
   if(args){      
      let res = await supabase
        .from('image')
        .insert([args]) 
      ret = res.data ? res.data[0] : ret
      ret=process_image_path({image:ret})   
   }  
   return ret
}
const delete_image = async({image_id}) => {
   if(!image_id)  return {}
   let res = await supabase
    .from('image')
    .delete()
    .eq("image_id", image_id) 
   //console.log("ik_file res", res)
   IKDelete({file_id:image_id})
   return res.data ? res.data[0] : {}
}
const get_image = async ({image_id, image}) => {  
   if(!image_id)  return {}
   if(!image){
    let res = await supabase
      .from('image')
      .select()
      .eq("image_id", image_id)    
      image=res.data ? res.data[0] : {}      
    }
   image=process_image_path({image})   
   return image
}



export { 
  typeImages,
  productImages,
  influencerImages,
  businessImages,
  insert_image,
  delete_image,
  get_image,
  process_image_path,
  getImagesFromParent
}
