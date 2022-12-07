import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

import { getStats, updateStats, get_type_stats} from './stats'

let data_type="influencer"

const getStats2 = async (i) =>{  
  let {influencer_id} = i  
  let type_id=influencer_id
  let ret = await getStats({data_type, type_id})
 // console.log(data_type+" meta", ret)     
  return ret
}

const collabStats = async (i) =>{ 
  let {influencer_id} = i  
  let get_stats=await getStats2(i)
  let {id, meta} = get_stats ?  get_stats : {meta:{total_items:{}}}
  let d = get_type_stats({meta, type:'collabs', init_data:{total_items:0}}) 
  d.total_items+=1 
  meta.collabs=d   

  let ret=await updateStats({id, data_type, inData:{influencer_id, meta}})
  return ret
}
const earningsStats = async (i) =>{  
  let {influencer_id, amount=0} = i 
  let get_stats=await getStats2(i)
  let {id, meta} = get_stats ?  get_stats : {meta:{earnings:{}}}
  let d = get_type_stats({meta, type:'earnings', init_data:{amount:0}})  
  d.amount+=parseInt(amount) 
  meta.earnings=d     
  let ret=await updateStats({id, data_type, inData:{influencer_id, meta}})
  return ret
}


export {
  collabStats,
  earningsStats
}
