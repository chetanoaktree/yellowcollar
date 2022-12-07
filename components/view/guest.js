import Guest from '../../ui/lib/view/guest';
import process from '../process';

const com = (props) => {   
  const args = process();
  //console.log("guest args", args)
  return (
    <Guest {...args} ></Guest>
  )
}
export default com
