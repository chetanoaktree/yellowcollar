import { supabase } from '../../util/supabaseClient'

const range = (query, props) => { 
  let {start, end} = props
  if( start && end ) { query = query.range(start-1, end-1) }  
  return query
}

export {
  range
}