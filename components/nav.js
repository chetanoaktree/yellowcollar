//import Nav from '../ui/lib/nav2';
import Nav from '../ui/lib/nav3';
import process from './process';

const com = (props) => {   
  //const args = process();
  //console.log("guest args", args)
  return (
    <Nav {...props.navArgs}></Nav>
  )
}
export default com
