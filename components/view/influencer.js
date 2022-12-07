import Influencer from '../../ui/lib/view/influencer';
import process from '../process';

const com = ({cat, ...props}) => {  
  const args = process()
  //args.navArgs.home="/app/shop/"
  //args.showShopNav=true
  args.noTopGap=true;  
  args.showFooter=true  
  //console.log("guest args", args)

  const subscribeHandler=({status})=>{
    //if(status=="success") 
    //console.log("status", status)
    window.open(args.subscribeIfluencerHref , "_blank");
  }

  return (
    <Influencer {...args}  subscribeHandler={subscribeHandler}></Influencer>
  )
}
export default com
