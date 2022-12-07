import ReactSlider from 'react-input-slider';
import Validator from 'simple-react-validator';
import User from '../../blocks/com/user';
import Button from '../../button';
import {tag} from './ui';

import _ from 'lodash'




import s from './ui.module.scss';


class Valid {
  constructor(name, year, useState) {
    let state = useState({});
    this.touch = {}
    this.validator= new Validator()
    this.name = name;
    this.year = year;
    this.setTouch = state[1];
    this.isTouch = state[0];
  }
  message(name, value, required=''){
    this.validator.message(name, value, required)
    this.touch[name]=false
  }
  get(){
    return this.name
  }
  fields(){
    return this.validator.fields
  }
  is_all_valid(){
    let y = _.every(this.validator.fields, Boolean);
    return y
  }
  set_touch(name, value=true){   
    //this.touch[name]=value
    //console.log("TOUCH", this.touch)
    this.setTouch(prev => {
      return {...prev, [name]:value}
    })
  } 
  set_touches(names, callback=false){      
    let names_={}
    _.forEach(names, (v, i)=>{
      names_[v]=true
    })
    this.setTouch(prev => {
      let next={...prev, ...names_}
      if(callback!=false) callback(next)
      return next
    })
  }   
  is_touch(name){     
    console.log("TOUCH "+name, this.isTouch[name])
    return this.isTouch[name] ? this.isTouch[name] : false
  }
  is_exist(name){      
    return this.validator.fields[name] ? true : false
  }
  is_valid(name){      
    //return this.validator.fields[name] ? this.validator.fields[name] : false
    return this.validator.fields[name]
  }
  is_touch_valid(name){
    let touch = this.is_touch(name)
    let valid = this.is_valid(name)
    return (touch && valid) ? true : false
  }
  is_touches_valid(names){
    let ret=true    
    _.forEach(names, (v, i)=>{
      let t=this.is_valid(v)
      if(t==false) ret=false
    })   
    return ret
  }
  is_touch_error(name){    
    let touch = this.is_touch(name)
    let valid = this.is_valid(name)
    return (touch && !valid) ? true : false
  }
  isTouchError({name, message}){   
    if(!this.is_touch_error(name)) return (<div></div>)
    if(!message) message='required'
    return tag({label:message, size:'sm', color:'red'})    
  }
}




export {
  Valid
}
