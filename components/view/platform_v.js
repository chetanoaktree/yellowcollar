import { useDispatch, useSelector } from "react-redux";
import UI from '../../ui/lib/view/platform_guest_u';
import process from '../process';

const com = ({cat, ...props}) => {  
  const args = process() 
  args.noTopGap=true;  
  args.showFooter=true  
  args.showShopNav=false 
  
  const {user, user_refresh_state} = useSelector((state) => state.pageData);

  return <UI {...props} {...args} ></UI>
}
export default com
