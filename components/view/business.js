import Business from '../../ui/lib/view/business';
import process from '../process';

const com = ({cat, ...props}) => {  
  const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true
  args.noTopGap=true;  
  args.showFooter=true 

  const subscribeHandler=({status})=>{
    //if(status=="success") 
    //console.log("status", status)    
    window.open(args.subscribeBusinessHref , "_blank");
  }
  //console.log("guest args", args)
  return (
    <Business {...args}  subscribeHandler={subscribeHandler}></Business>
  )
}
export default com
