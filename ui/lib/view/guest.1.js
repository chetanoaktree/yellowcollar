import Nav from '../nav2';
import Footer from '../footer';
import ShopNav from '../shopNav';
import Loading from '../blocks/com/loading';
import { useDispatch, useSelector } from "react-redux";
import { usePage } from "../hooks/usePage";
import s from './guest.module.scss';
const com = (props) => {
  let {navArgs, noTopGap, viewType, footerArgs={}, socialMediaArgs, shopNavArgs, showShopNav, showFooter, children, isLogged}=props

  const pageData = useSelector((state) => state.pageData);
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
  return (   
    <main className={s.main+' '+c_}>
      {isLogged && <Nav {...navArgs} viewType={viewType} user={props.user} userType={props.userType}></Nav>}      
      <div className={s.container+' children'}>
        {showShopNav!==false && <ShopNav {...shopNavArgs}></ShopNav>} 
        <div className={s.children}>{children} <Loading id="guest"></Loading></div>
        
      </div>
      {showShopNav}
      {showFooter && <Footer {...footerArgs} socialMediaArgs={socialMediaArgs}></Footer>}
      
    </main>   
  )
}
export default com
