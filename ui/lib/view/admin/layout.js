import Nav from './nav';
import Footer from '../../footer';
import s from './layout.module.scss';
const com = ({navArgs, userType, children, isLogged, showFooter, footerArgs={}, socialMediaArgs, ...props}) => {
  //console.log("showShopNav ", showShopNav)
  let c_ = s.admin

  return (
    <main className={s.main+' '+c_}>
      {isLogged && <Nav {...navArgs} user={props.user}></Nav>}    
      <div className={s.container}>        
        <div className={s.children}>{children}</div>
      </div>
      {showFooter && <Footer {...footerArgs} socialMediaArgs={socialMediaArgs}></Footer>}
    </main>    
  )
}
export default com
