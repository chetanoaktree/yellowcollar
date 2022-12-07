import React, { useState , useEffect} from "react";
import ClickAwayListener from 'react-click-away-listener'
import Title from '../../title';
import Button from '../../button';
import s from './dropdown.module.scss';

const com = (props) => { 
  let {className, trigger='', size="", header="", content="", footer="", isOpen, setOpen} = props
  
  const [isUserPopup, setUserPopup] = useState(false)

  let c_=''
  if(isOpen===true){
    c_+=' '+s.active
    //document.body.classList.add('fixed2');    
  }
  if(size=='full'){
    c_+=' '+s.full
  }  
  const click = () => {
    setUserPopup(true)
  }
  return(
    <div className={s.main+' '+className}>      
        <div className={s.trigger} onClick={click}>{trigger}</div>
        {isUserPopup && (
          <ClickAwayListener onClickAway={() => setUserPopup(false)}>
            <div className={s.dropdown+' '+c_}>
              {header && <div className={s.header}>{header}</div>}
              {content && <div className={s.content}>{content}</div>}
              {footer && <div className={s.footer}>{footer}</div>}
            </div>
          </ClickAwayListener>
        )}
    </div>
  )
}
const test = () => {

}
export {
  test
}
export default com