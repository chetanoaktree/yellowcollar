import React, { useState , useEffect, useRef} from "react";
import ClickAwayListener from 'react-click-away-listener'
import Link from 'next/link'
import { usePage } from "../../../hooks/usePage";
import Title from '../../../title';
import Button from '../../../button';
import Loading from './../loading_simple';
import s from './index.module.scss';
import axios from 'axios';



const com = ({viewType}) => {
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [isItems, setItems] = useState(false)

  const page=usePage()
  const user=page.getUser()
  //console.log("Notification User", user) 
  let items=[]  

  let c_=''
  let View =()=>{
    return (<div className={s.view}></div>)
  }

  if(viewType) c_+=' '+s[viewType]
  const showNotifications = async(init=true) =>{
    if(init) {
      setLoading(true)
      setOpen(!isOpen)
    }      
    items=await page.getNotifications() 
    //const items = await axios.post(process.env.API+'/api/com/notification/', {business_id:4});    
    //console.log("Notifications", items)
    setItems(items)  
    setLoading(false)
  }
  
  const CollabBusinessAction = (i) => {
    const {type, event}=i
    const acceptHandler= async ()=>{
      setLoading(true)
      let test=await page.notification({action:'business_accept', type:i.type, id:i.id, collab_id:i.meta.collab_id})
      await showNotifications(false)
      console.log("test1", test)
    }
    const rejectHandler= async ()=>{
      setLoading(true)
      let test=await page.notification({action:'business_reject', type:i.type, id:i.id, collab_id:i.meta.collab_id})
      await showNotifications(false)
      console.log("test1", test)
    }
    return(
      <div className={s.action}>
        <Button type="action2" color="white" clickHandler={rejectHandler}>Reject</Button>
        <Button type="action2" color="blue" clickHandler={acceptHandler}>Accept</Button>
      </div>
    )
  }
  const NoData= () =>{
    return(
      <div className={s.no_data}>No Notification</div>
    )
  }
  const BusinessActions = (i) =>{
    let act
    if(i.type=="collab"){
      act=<CollabBusinessAction {...i}/>
    }
    return act
  }
  if(isItems){
    View = ()=>{
      let items_=isItems.map((i, index)=>{
        i.influencer=i.influencer2
        let link="/app/collab/"+i.meta.collab_id
        let img=i.influencer.profile_pic
        let product_img=i.product.img        
        let title='Collaboration request'
        let desc=i.influencer.name        
        //console.log("i", i)
        let image =img ? "/db_images/users/"+img : '/images/User_light.svg'
        return(
          <div key={index} className={s.item}>
            <Link href={link}>
            <div className={s.item_inner}>
              <div className={s.left}>
                <div className={s.img}><img src={image}/></div>
              </div>
              <div className={s.middle}>
                <div className={s.title}>{title}</div>
                <div className={s.desc}>{desc}</div>
              </div>
              <div className={s.right}>
                <div className={s.product_img}><img src={'/products/'+product_img}/></div>
              </div>
            </div>
            </Link>
            {user.userType=="business" && <BusinessActions {...i}/>}
          </div>
        )
      })
      return(
        <div className={s.view}>
          <div className={s.inner}>
            <div className={s.header}>
              <div className={s.title}>Notifications</div>
            </div>
            <div className={s.content}>
              {items_}
              {!isItems.length && <NoData/>}
              {isLoading && <Loading/>}
            </div>
          </div>          
        </div>
      )
    }
  }
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={c_}>        
        <div className={s.trigger} onClick={()=>showNotifications()}><img src="/images/Bell.svg"/></div>        
        {isOpen && <View/>}
      </div>
    </ClickAwayListener>
  )
}


export default com