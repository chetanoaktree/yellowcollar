import React from 'react'
import Button from '../../button';

import _ from 'lodash'

import {get_input, get_select, get_display} from './input_ui';

const LocalUI = (props) => {
    let {isL, setL, isA, setA, new_changes={} } = props
    function doing (a=12) {
      console.log("Doing", a)
    }
    let nxt = ({prev, n, v, parent=''}) => {
      let next = {...prev}
      if(parent && parent!=''){
        next[parent] = next[parent] ? next[parent] : {}
        next[parent][n]=v
      }else{
        next[n]=v
      }
      return next
    }
    const inputHandler = (n, v, parent) => {
      setA('update')
      setL(prev=>{
        let next = nxt({prev, n, v, parent})
        return next
      })
    }
    const selectHandler = (n, v, parent) => {
      console.log("n", v)
      setA('update')
      setL(prev=>{
        let next = nxt({prev, n, v:v.value, parent})
        return next       
      })
    }
    const metaHandler = (n, v) => {
      setL(prev=>{
        let next={...prev, meta:prev.meta ? prev.meta :{}}
        next.meta[n]=v
        return next
      })
    }

    const get_value = ({name, parent=''}) => {
      let value 
      if(parent!=''){
        isL[parent] = isL[parent] ? isL[parent] : {}
        value=isL[parent][name]   
      }else{
        value=isL[name]   
      }      
      return value
    }

    let select = ({label, name, parent, options, className='w-6/12'}) => {
      //console.log("options", options)
      let value=get_value({name, parent})     
      let cv = (new_changes && new_changes[name]) ? new_changes[name] : ''
      let change_value= (cv && (value != cv)) ? cv : ''
      let i_=get_select({label, name, value:{label:value, value:value}, defaultValue:options[0], change_value:{label:change_value,value:change_value}, onChange:(n, v)=>{selectHandler(n, v, parent)}, options})      
      let ret = <div className={className}>
        { i_}
      </div>  
      return ret
    }  
    let input = ({label, name, parent, className='w-6/12', placeholder}) => {
      let value=get_value({name, parent})    
      let cv = (new_changes && new_changes[name]) ? new_changes[name] : ''
      let change_value= (cv && (value != cv)) ? cv : ''
      let i_=get_input({label, name, value, change_value, placeholder, onChange:(n,v)=>{inputHandler(n,v, parent)}})      
      let ret = <div className={className}>
        { i_}
      </div>  
      return ret
    } 
    let display = ({label, name, parent, className='w-6/12', placeholder}) => {
      let value=get_value({name, parent})    
      let cv = (new_changes && new_changes[name]) ? new_changes[name] : ''
      let change_value= (cv && (value != cv)) ? cv : ''
      let i_=get_display({label, name, value, change_value, placeholder, onChange:(n,v)=>{inputHandler(n,v, parent)}})      
      let ret = <div className={className}>
        { i_}
      </div>  
      return ret
    } 
    return {
      doing,
      select,
      input,
      display
    }
}
export {
  LocalUI
}

/*
const check_action = (i) =>{
  if(i.status=='updated'){
    return 'update2inv' 
  }else if(i.product_id!=null){
    return 'added2inv' 
  }else {
    return "add2inv"
  }   
}
const check_data = (_d) =>{
  setL(prev=>({...prev, ..._d}))
  setA(check_action(_d))
}
let [isA, setA] = useState(check_action(isL))   
let lui = LocalUI({isL, setL, isA, setA,  new_changes })
//console.log("lui", lui)
//lui.doing("df")

let select = ({label, name, options}) => {
  let ret =lui.select({label, name, options})
  return ret
}  
let input = ({label, name}) => {
  let ret =lui.input({label, name})
  return ret
}   

let i_=get_input({label, name, value, change_value, onChange:inputHandler}) 
let i_=get_select({label, name, value:{label:value, value:value}, change_value:{label:change_value, value:change_value}, onChange:selectHandler, options})    
*/