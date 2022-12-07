import { supabase } from '../../util/supabaseClient'
import {process_collab, get_collab} from '../get/collab'

export default async function  process(props) {
  let {id, business_id} = props    

  let collab= await get_collab(props)
  console.log("props - ", props)

  let event = await supabase
  .from('collab_event')
  .select()
  .eq('collab_id', id)
  .order('created_at', { ascending: true }) 
  

  let data2={
    ...collab,
    events:event.data
  }
  return data2
}
