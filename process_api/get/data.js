import { supabase } from '../../util/supabaseClient'

import _ from 'lodash'

const get_merged_ids = (ids) => {
  ids=_.filter(ids, function square(n) {
    return n ? true : false
  })
  ids='"'+[...ids].join('","')+'"'    
  console.log("ids", ids)
  return ids
}

export {
  get_merged_ids
}


/*

const get_collab_tresholds = async (items)=>{  
  let ids=_.map(items, function square(n) {    
    return n['influencer'].treshold_id ? n['influencer'].treshold_id : false
  })
  ids=get_merged_ids(ids)
  let data = await get_treshold_from_ids({ids, items}) 

  if(data){
    _.forEach(items, (v, k)=>{     
      let tresholds_=_.filter(data, ['id', v['influencer'].treshold_id])      
      v.treshold = tresholds_[0] ?  tresholds_[0] : {} 
    }) 
  }  
  return items
  //let data=await getVariable({performance_id:42, treshold_id:57}) 
  //return data 
}

*/
