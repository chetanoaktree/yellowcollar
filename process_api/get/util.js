import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

const get_ids = ({items, id_key=''}) =>{   
  if(!id_key) return ''
  let list=[] 
  let ids=_.map(items, (v, k) => {    
    return v[id_key] ? v[id_key] : false;
  })
  ids=_.filter(ids, (v) => {
    return v ? true : false;
  })
  ids='"'+[...ids].join('","')+'"'   
  return ids
}

export { 
  get_ids
}
