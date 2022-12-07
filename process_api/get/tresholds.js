import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'



const getTresholds = async (items) =>{
  let treshold_ids = new Set([])
  let tresholds=[]
  //console.log("ITEMS", items)

  _.forEach(items, (v, k)=>{   
    v.influencer=  v.influencer2 ? v.influencer2 : v.influencer 
    //treshold_ids.push(v.influencer_id)
    treshold_ids.add(v.influencer.treshold_id)
  }) 

  let tresholds2 = await supabase
  .from('influencer_treshold')
  .select()     
  .filter('id', 'in', '('+[...treshold_ids].join(',')+')')

  tresholds=tresholds2.data
  //console.log("tresholds", tresholds2.data)
  return tresholds
}

const collabTresholds = async (items) => {
  let tresholds=await getTresholds(items)
  //console.log("tresholds", tresholds)

  _.forEach(items, (v, k)=>{  
    v.influencer=  v.influencer2 ? v.influencer2 : v.influencer           
    let treshold=_.filter(tresholds, ['id', v.influencer.treshold_id]) 
    items[k]['treshold']=treshold[0] ?  treshold[0] : {}
  }) 
  return items
}

export default getTresholds

export {
  getTresholds,
  collabTresholds
}
