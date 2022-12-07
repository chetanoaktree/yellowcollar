import Button from '../../button';
import Input from '../../input2';
import Select from '../../select';
import _ from 'lodash'
import s from './input_ui.module.scss';


const get_input = ({label, value, change_value='', name, placeholder, onChange}) => {
  let c_=''
  if(change_value) c_+=' '+s.change_value
  return(
    <div className={s.input+" "+c_}>
      <div className={s._inner+""}>
        <input className={s._ic+" "} value={value} placeholder={placeholder} onChange={(e)=>onChange(name, e.target.value) }/>
        <div className={s._l+" "}>{label}</div>
        {change_value && <div className={s._cv+" "}>{change_value}</div>}
      </div>
    </div>
  )
}
const get_select = ({label, value, change_value='', name, onChange, options, defaultValue, isMulti=false, placeholder}) => {
  let c_=''
  if(change_value.value) c_+=' '+s.change_value
  return(
    <div className={s.input+" "+c_}>
      <div className={s._inner+""}>        
        <Select className={s._ic+" "} name={name} defaultValue={defaultValue} value={value} isMulti={isMulti} options={options} placeholder={placeholder}  changeHandler={(v, n)=>{onChange(n, v)}}/>
        <div className={s._l+" "}>{label}</div>
        {change_value.value && <div className={s._cv+" "}>{change_value.value}</div>}
      </div>
    </div>
  )
}
const get_display = ({label, value, change_value='', name, placeholder, onChange}) => {
  let c_=''  
  return(
    <div className={s.input+" bg-gray-100 bg-opacity-50 rounded-lg p-3 "+c_}>
      <div className={s._inner+""}>        
        <div className={s._ic+" "}>{value}</div>
        <div className={s._l+" "}>{label}</div>
        {change_value.value && <div className={s._cv+" "}>{change_value.value}</div>}
      </div>
    </div>
  )
}

export {
  get_input,
  get_select,
  get_display
}

/*
let i_=get_input({label, name, value, change_value, onChange:inputHandler}) 
let i_=get_select({label, name, value:{label:value, value:value}, change_value:{label:change_value, value:change_value}, onChange:selectHandler, options})    
*/