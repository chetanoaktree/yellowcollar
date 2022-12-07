import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from '../../title';
import Button from '../../button';
import Input from '../../input2';
import s from './b_coupon_u.module.scss';

const com = (props) => { 
  let {outData, couponHandler} = props
  const [isData, setData] = useState({code:'', type:'membership'})
  const [isT, setT] = useState(false)
  const [isE, setE] = useState(false)
  const [isM, setM] = useState('')

  const {handlers} = useSelector((state) => state.pageData);

  let message= ''
  let m_= s.message
  let a_= 'white'
  let cou_t= 'text2'
  if(isData.code!='') a_='yellow'
  if(isT==false){
    if(isM=='active'){
      m_+=' '+s.applied
      message='Applied'
      cou_t='action2'
    }else if(isM=='invalid'){
      m_+=' '+s.invalid
      message='Invalid'
    }else if(isM=='expired'){
      m_+=' '+s.expired
      message='Expired'
    }
  }
  const close = async () =>{
    setE(false)
  }
  const apply = async () =>{ 
    if(!isData.code) return  
    let data = await handlers.coupon({action:'apply', inData:isData})
    setT(false)  
    setM(data.status)
    outData(prev=>({...prev, ...data, touch:false}))
    console.log("Coupon DATA", data)
  }
  const expand = () =>{
    setE(true)
  }
  const inputHandler = (v, n) => {
    setT(true)
    outData(prev=>({...prev, code:'', value:0, touch:true}))
    setData(prev=>{
      let next={...prev, [n]:v}
      return next
    })
  }
  return(
    <div className={s.main+' flex items-center '}>
      <div className={s.inner+' flex items-center'}>
        {isE && <div className={s.input_a+' flex items-center mr-4 ml-4'}>
          <Input placeholder="Enter coupon code..." value={isData.code} name={'code'} changeHandler={(v, e, n)=>inputHandler(v, n)} />          
        </div>}
        {(isE==true && isM!='') && <div className={m_+' mr-2'}>{message}</div>}
        {isE==true && <Button type="action2" color={a_} className={''} clickHandler={apply}>Apply</Button>}
        {isE==true && <Button type="default" className={'ml-2 mr-2'} clickHandler={close}><img src={"/images/Close_square.svg"}/></Button>}
        {isE==false && <Button type={cou_t} color={"green"} className={''} clickHandler={expand}>Coupon</Button>}
        
      </div>     
    </div>
  )
}
export default com