import React, { useState, useEffect} from 'react';
import Button from '../../button';

import _ from 'lodash'


import s from './content_ui.module.scss';

let Accordion = ({items}) => {
  const [isOpen, setOpen] = useState(false);
  let block = ({n, t, d, last=false}) => {
    let cc_=isOpen == n ? '':'hidden'
    let i_=isOpen == n ? 'Expand_up_light.svg':'Expand_down_light.svg'
    let c_=last==true ? '' :'border-b border-gray-200'
    return(
      <div className={c_+' w-full '}>
        <Button type="hit_down" className={'w-full'} clickHandler={()=>{setOpen(prev=>{
            return prev==n ? '' : n             
          })}}>
          <div  className={'flex items-center px-6 py-4 md:px-10 md:py-6 w-full'} >
            <div className={'flex-grow text-md md:text-xl font-semibold'} >{t}</div>
            <div  className={' ml-4 md:ml-12 w-12'} ><img src={"/images/"+i_}/></div>
          </div>
        </Button>
        <div className={cc_+' bg-gray-100 px-6 md:px-10 py-6 text-md md:text-lg '}>{d}</div>
      </div>
    )
  }
  let items_=items.map((i, index)=>{
    i.n = index+1
    i.last = index == (items.length-1) ? true : false
    return <div key={index} className={'w-full'}>{block(i)}</div>
  })
  return(
    <div className={s.accordion+' flex flex-wrap border border-gray-200 rounded-2xl w-full'}>
      {items_}
    </div>  
  )
}

export { 
  Accordion
}
