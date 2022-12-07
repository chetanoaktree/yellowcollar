import Slate from './slate';
import Input from '../../input2';
import Select from '../../select';
import s from './ui.module.scss';

let InputText=({layout='', label, name, value, for_='', update_item})=>{    
  return(
    <div className={s.text_a+' '+s[layout]}>
      <div className={s.label+' w-3/12'}>{label}</div>
      <div className={s.input+' w-9/12'}><Input name={name} value={value} changeHandler={(v,e,n)=>update_item(v, n, for_)}/></div>          
    </div> 
  )
} 
let InputSelect=({layout='', label, name, value, defaultValue, options, placeholder, for_='', update_item})=>{    
  return(
    <div className={s.text_a+' '+s[layout]}>
      <div className={s.label+' w-3/12'}>{label}</div>
      <div className={s.input+' w-9/12'}>
        <Select name={name} value={value}  defaultValue={defaultValue} isMulti={false} options={options} placeholder={placeholder}  changeHandler={(v, n)=>{update_item(v, n, for_)}}/>
      </div>          
    </div> 
  )
} 
let InputSlate=({label, name, value, for_='', update_item})=>{    
  return(
    <div className={s.text_a}>
      <div className={s.label+' w-3/12'}>{label}</div>
      <div className={s.input+' w-9/12'}>
        <Slate {...{update_item, name, content:value}}/>
      </div>          
    </div>
  )
}  
  
let DisplayText=({layout='',label, name, value})=>{    
  return(
    <div className={s.text_a+' '+s.display_a+' '+s[layout]}>
      <div className={s.label+' w-3/12'}>{label}</div>
      <div className={s.input+' w-9/12'}><div className={'px-5 py-4'}>{value}</div></div>          
    </div> 
  )
}  

export{
  InputText,
  InputSlate,
  InputSelect,
  DisplayText
}