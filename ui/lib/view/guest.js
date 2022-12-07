import React, { useState, useEffect } from "react";
//import Nav from '../nav2';
import Nav from '../nav3';
//import Footer from '../footer';
import Footer from '../footer2';
import ShopNav from '../shopNav';
import Loading from '../blocks/com/loading';
import { useDispatch, useSelector } from "react-redux";
import { usePage } from "../hooks/usePage";
import s from './guest.module.scss';
const com = (props) => {
  let {navArgs, noTopGap, viewType, footerArgs={}, socialMediaArgs, shopNavArgs, showShopNav, showFooter, children, isLogged}=props
  const [isScroll, setScroll]=useState(0)
  const page=usePage()
  //console.log("GUEST props ", props)
  let c_ = s.guest
  //let viewType=''
  
  if(props.userType =='user'){
    c_=s.user; c_+=' app'
  }else if(props.userType =='new_user'){
    c_=s.new_user; c_+=' app'
  }else if(props.userType =='business'){
    c_=s.business; c_+=' app'
    //viewType='business_app'
  }else if(props.userType =='influencer'){
    c_=s.influencer; c_+=' app'
  }else if(props.userType =='admin'){
    c_=s.admin; c_+=' app'
  }
  if(noTopGap){
    c_+=' '+s.noTopGap
  }

  if(!showShopNav){
    c_+=' '+s.noShopNav
  }
  if(page.isLoading) c_+=' '+s.loading

  useEffect(() => {
    if(window){
      window.addEventListener("scroll", () => {
        //console.log("Scroll", window.scrollY);
        
        
       
        if(window.scrollY >500){
          document.body.classList.add('scroll_500')
        }else if(window.scrollY >300){
          document.body.classList.add('scroll_300')
        }else if(window.scrollY >100){
          document.body.classList.add('scroll_100')
        }else{
          document.body.classList.remove('scroll_100')
          document.body.classList.remove('scroll_300')
          document.body.classList.remove('scroll_500')
        }   
       
        
        setScroll((prev)=>{
          let scroll=prev
          let dif=(scroll-window.scrollY) 
          dif = dif>=0 ? dif : dif *-1
          //console.log(scroll+' '+window.scrollY, dif)
          if(window.scrollY > 300){
            
            if(window.scrollY < scroll) {
              document.body.classList.add('scroll_up')  
              document.body.classList.remove('scroll_down')         
            }else{
              document.body.classList.add('scroll_down')
              document.body.classList.remove('scroll_up')     
            }
            
          }else{
            document.body.classList.remove('scroll_up')
            document.body.classList.remove('scroll_down')
          }
         
          return window.scrollY
        })
      });
      
    } 
    
    return (()=>{
       window.removeEventListener("scroll", ()=>{
         document.body.classList.remove('scroll_up')
         document.body.classList.remove('scroll_down')
         document.body.classList.remove('scroll_100')
         document.body.classList.remove('scroll_300')
       })
    })   
  }, []);

  return (   
    <main className={s.main+' '+c_}>
      {isLogged && <Nav {...navArgs} viewType={viewType} user={props.user} userType={props.userType}></Nav>}      
      <div className={s.container+' children'}>
        {showShopNav!==false && <ShopNav {...shopNavArgs}></ShopNav>} 
        <div className={s.children}>{children} <Loading id="guest"></Loading></div>
        
      </div>
      {showShopNav}
      {showFooter && <Footer {...footerArgs} navArgs={navArgs} socialMediaArgs={socialMediaArgs}></Footer>}
      
    </main>   
  )
}
export default com
