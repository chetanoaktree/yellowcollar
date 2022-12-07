import UI from '../../ui/lib/view/home_u';
import process from '../process';
import axios from 'axios';


const com = ({cat, ...props}) => {  
  //console.log("home", props)
  const args = process()
  //args.navArgs.home="/app/shop/"
  args.noTopGap=true;
  args.showFooter=true 
  args.showShopNav=false  
  //console.log("guest args", args)
    

  args.handler = async (i)=>{  
    console.log('handler', i)
    const res = await axios.post(process.env.API+'/api/home', i);
    console.log('handler res', res.data)
    return res.data
  } 
  return (
    <UI {...args}></UI>
  )
}
export default com
