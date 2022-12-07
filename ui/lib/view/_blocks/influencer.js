import s from './influencer.module.scss';
import Moment from 'moment';

const CONSTANTS={
  test:1,
  business_accepted:2,
  influencer_accepted:3,
  collaborate:3,
  init_payment:3,
  init_payment_paid:5,
  live:7,
  completed:8,
  paid:9
}

const status_options=[
  {label:'All', value:''},    
  {label:'Business Accepted', value:'business_accepted'},  
  {label:'Influencer Accepted', value:'influencer_accepted'}, 
  {label:'Init Payment Paid', value:'init_payment_paid'},    
  {label:'Promotion Live', value:'live'}, 
  {label:'Promotion Completed', value:'completed'},  
  {label:'Paid', value:'paid'}, 
]


const industries=[
  {label:"Fashion", name:'fashion'},
  {label:"Entertainment", name:'entertainment'},
  {label:"Technology", name:'technology'},
  {label:"Food", name:'food'},
  {label:"Health", name:'health'},
  {label:"Fitness", name:'fitness'},
  {label:"Beauty", name:'beauty'},
  {label:"Art", name:'art'},
  {label:"Travel", name:'travel'},
  {label:"Decor", name:'decor'},
  {label:"Sport", name:'sport'} 
]

const age_groups=[
  {label:"15-24", name:'g15_24'},
  {label:"25-34", name:'g25_34'},
  {label:"35-44", name:'g35_44'},
  {label:"45-54", name:'g45_54'},
  {label:"55-64", name:'g55_64'}
]
const regions=[
  {label:"India", name:'india'},
  {label:"USA", name:'usa'},
  {label:"UK", name:'uk'}
]
const genders=[
  {label:"Male", name:'male'},
  {label:"Female", name:'female'},
  {label:"Unisex", name:'unisex'}
]
export {
  CONSTANTS,
  industries,
  status_options, 
  age_groups,
  regions,
  genders
}
