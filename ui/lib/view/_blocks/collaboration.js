import {get_id, dot as dot2, dot_gradient, tag, percentage_tag, collab_status_tag, collab_main_status_tag} from './ui';
import {COLLAB_CONSTANTS, collab_levels} from '../../get/constants';
import s from './collaboration.module.scss';
import Moment from 'moment';

const CONSTANTS=COLLAB_CONSTANTS
const levels=collab_levels

const collab_status_options=[
  {label:'All', value:''},    
  {label:'Business Accepted', value:'business_accepted'},  
  {label:'Influencer Accepted', value:'influencer_accepted'}, 
  {label:'Init Payment Paid', value:'init_payment_paid'},    
  {label:'Promotion Live', value:'live'}, 
  {label:'Promotion Completed', value:'completed'},  
  {label:'Paid', value:'paid'}, 
]


const getEventDate = ({type, i}) =>{
  let date
  if(i.events){    
    let events_=_.filter(i.events, ['type', type])    
    let event= events_[0] ?  events_[0] : []
    //console.log("event "+i.id, event)
    date=Moment(event.created_at).format('MMM Do YYYY')
  }
  return date
}

const getPaymentDetails = ({i}) =>{
  let out={total_amount:0, to_platform:0, to_business:0}
  if(i.payments){  
    _.forEach(i.payments, (v, k)=>{   
     // console.log("payment ", v)         
      out.total_amount+=v.amount
      if(v.meta){
        out.to_platform+=v.meta.platform_fee
        out.to_business+=v.meta.sub_total
      }      
    }) 
    out.total_amount=Math.round(out.total_amount*100)/100
    out.to_platform=Math.round(out.to_platform*100)/100
    out.to_business=Math.round(out.to_business*100)/100
  }  
  
  return out
}
const status_tag = (status)=>{  
  return collab_status_tag({status})
}

const act_arrow = ({level, status}) =>{
  let img='Arrow_right_light.svg' ; let c_    
  if(levels[status]>=level) {
    img = 'Arrow_right_green.svg'; c_+=' '+s.active
  }
  return(
    <div className={s.act_arrow+' '+c_}>
      <img src={"/images/"+img}/>
    </div>
  )
}
const act_item = ({label, value, level, status, i}) =>{
  let date
  if(!i) return (<div></div>)
  let type;
  //console.log("i "+i.id, i)
  if(i.events){
    if(i.status=='business_accepted') {
      type='business_accept'
    }else if(i.status=='influencer_accepted') {
      type='influencer_accept'
    }else{
      type=i.status
    }    
    date=getEventDate({type, i})
  }
  let c_
  if(levels[status]>=level) c_+=' '+s.active
  return(
    <div className={s.act_item+' '+c_}>
      <div className={s.value_a}><div className={s.value}>{value}</div></div>
      <div className={s.label}>{label}</div>
      <div className={s.date}>{date}</div>
    </div>
  )
}

const dot = ({level, status}) =>{
    return dot2({level, status, levels})
}
const gradient = ({status}) => {  
  return dot_gradient({status, levels})
}
const getID=(i)=>{
  return get_id(i)
}

const itemLayout = (props) => {
  let {id, profiles, activity, details, track, empty} =props
  return (
    <div className={s.itemLayout+' flex flex-col px-4 py-4 mb-4'}>
      <div className={s.top+ ' flex mb-2'}>
        <div className={s.id_a+' flex flex-col mr-2'}>          
          {id} 
        </div>
        <div className={s.profiles_a+' mr-2'}>
          {profiles}   
        </div>
        <div className={s.activity_a+' flex-grow mr-2'}>
          {activity}   
        </div>
        <div className={s.details_a+' mr-2'}>
          {details}   
        </div>        
      </div>  
      <div className={s.bottom+' flex items-center'}>  
        <div className={s.track_a+' mr-2'}>{track}</div>
        <div className={s.empty_a+' flex-grow'}>{empty}</div>
      </div> 
    </div>
  )
}

export {
  CONSTANTS,  
  tag,
  status_tag,  
  percentage_tag,  
  dot,
  gradient,
  getID,
  
  act_item,
  act_arrow,
  
  getEventDate,
  getPaymentDetails,
  collab_status_options, 
  collab_main_status_tag,
  itemLayout, 
}
