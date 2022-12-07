import _ from 'lodash'
import Moment from 'moment'

let process_membership = (i) =>{
  const {end_date}=i  
  const end=Moment(end_date)
  const current=Moment()
  const check=current.isSameOrAfter(end);
  console.log("check", check)
  if(check==true) i.status='expired'
  return i
}
export {
  process_membership
}
