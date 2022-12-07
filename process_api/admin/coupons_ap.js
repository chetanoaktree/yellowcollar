import { supabase } from '../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import shortid from 'shortid'
import _ from 'lodash'

//import { typeImages, get_image} from '../get/image'

const get_query = (props) => {
  let {action, business_id, start, end, inData} = props
  let switch_=(props.switch && props.switch.value) ? props.switch.value : false  
  let query = supabase
  .from('coupon')
  .select(`
    *,
    users:coupon_user(*)
  `, { count: 'exact' })

  if(switch_) {
    if(switch_=='used'){
      query=query.gt('usage', 0)
    }else if(switch_=='unused'){
      query=query.eq('usage', 0)
    }else{
      query=query.eq('status', switch_)
    }    
  }

  query=query.order('created_at', { ascending: false })
  return query
}
export default async function  process(props) { 
  let {action, id, type, start, end, inData}=props 
  let data={}  
  let query
  let res

  console.log("props", props) 
  
  if(action=='get'){ 
     query=get_query(props)
     if( start && end ) { query = query.range(start-1, end-1) }  
     res=await query
     data=res.data ? res.data : []

  }else if(action=='get_total'){ 
     query=get_query(props)
     res=await query  
     data=res.count ? res.count : 0

  }else if(action=='add_codes'){  
    inData=[
      {code:shortid.generate(), _limit:5, type:'membership', unit:'%', value:0, status:'new'} ,
      {code:shortid.generate(), _limit:5, type:'membership', unit:'%', value:0, status:'new'} 
    ]
       
    let res = await supabase
    .from('coupon')
    .insert(inData)    
    data=res.data ? res.data : []  

  }else if(action=='update_item'){ 
    let {code, _limit, type, usage, unit, value, status} = inData  
    //type=(type && type.value ) ?  type.value : type
    //unit=(unit && unit.value ) ?  unit.value : unit
    //status=(status && status.value ) ?  status.value : status
    let res = await supabase
    .from('coupon')
    .update([{code, _limit, type, usage, unit, value, status}])
    .eq('id',id)    
    data=res.data ? res.data[0] : {}  
  }

  console.log("Cuopons "+action, data)
  return data
}
