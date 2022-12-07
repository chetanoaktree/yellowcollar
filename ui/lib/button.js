//import seo from '../seo';
import Link from 'next/link'
import s from './button.module.scss';
const com = ({children, isActive=false, outline=false, state=false, isProcessing=false, className, contentClass='',  input_type, type, color, size="md", isIcon, to, width='', target, clickHandler}) => {
  let _c=s.main
  let test=''
  _c+=' '+className
  if(type=='action' || type=='action2'){
    _c+=' '+s.action
  }else if(type=='text'  || type=='text2'){
    _c+=' '+s.text
  }
  
  if(type=='action2'){
    _c+=' '+s.action2
  }
  if(type=='text2'){
    _c+=' '+s.text2
  }
  if(type=='link'){
    _c+=' '+s.link
  }
  if(type=='hit'){
    _c+=' '+s.hit
  }
  if(type=='hit_down'){
    _c+=' '+s.hit_down
  }
  if(type=='icon_hit'){
    _c+=' '+s.icon_hit
  }
  if(type=='item_hit'){
    _c+=' '+s.item_hit
  }
  if(type=='default'){
    _c+=' '+s.default
  }
  if(color=='black'){
    _c+=' '+s.black
  }else if(color=='blue'){
    _c+=' '+s.blue
  }else if(color=='yellow'){
    _c+=' '+s.yellow
  }else if(color=='action_blue'){
    _c+=' '+s.action_blue
  }else if(color=='light_gray'){
    _c+=' '+s.light_gray
  }else if(color=='white'){
    _c+=' '+s.white
  }else if(color=='red'){
    _c+=' '+s.red
  }else if(color=='green'){
    _c+=' '+s.green
  }else if(color=='blue_pink'){
    _c+=' '+s.blue_pink
  }
  if(outline==true){
    _c+=' '+s.outline
  }
  if(isIcon){
    _c+=' '+s.icon
  }
  if(width=="full"){
    _c+=' '+s.w_full    
  }

  if(size=='lg'){
    _c+=' '+s.lg
  }else if(size=='md'){
    _c+=' '+s.md
  }else if(size=='sm'){
    _c+=' '+s.sm
  }else if(size=='xs'){
    _c+=' '+s.xs
  }

  if(state==true){
    _c+=' '+s.state
  }
  if(isActive==true){
    _c+=' '+s.isActive
  }

  const clickHandler2=(e)=>{
    if(isProcessing==false) {
      console.log("clicked")
      if(clickHandler) clickHandler(e)
    }
  }

  if(isProcessing===true) _c+=' '+s.isProcessing
  if(to){
    return (
      <Link href={to}><a className={_c} target={target} rel="noopener noreferrer">
        {children}
      </a></Link>
    )
  }else{    
    if(input_type=="submit"){
      return (
        <div className={_c} onClick={clickHandler2}>
          <button type="submit">
            <div className={s.content+' '+contentClass}>{children}{test}</div>
            <div className={s.processing}>
              <img className={s.darkLoading} src="/images/loading.svg"/>
              <img className={s.lightLoading} src="/images/loadingLight.svg"/>
            </div>
          </button>
        </div>
      )
    }else{
       return (
        <div className={_c} onClick={clickHandler2}>
          <div className={s.content+' '+contentClass}>{children}{test}</div>
          <div className={s.processing}>
            <img className={s.darkLoading} src="/images/loading.svg"/>
            <img className={s.lightLoading} src="/images/loadingLight.svg"/>
          </div>
        </div>
      )
    }
  }
  
}
export default com
