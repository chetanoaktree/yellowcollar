import Slate from './slate';
import Input from '../../input2';
import Select from '../../select';

import {get_thumb_src} from '../../get/image';

let ThumbImage=(i)=>{  
  let {src='', path='', tr, size='lg'} = i 
  let width='120px', height='120px'
  if(size=='md'){
     width='80px'
     height='80px'
  }else if(size=='sm'){
     width='44px'
     height='44px'
  }else if(size=='xs'){
     width='32px'
     height='32px'
  }
  let src_=get_thumb_src({src, path, tr})  
  let out=(<div className={"bg-cover bg-center rounded-lg"} style={{backgroundImage:'url("'+src_+'")', width:width, height:height}}></div>)
  return out
}  

export{
  ThumbImage
}