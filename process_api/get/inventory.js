import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'

const update_product_units = async (items) => {
  let ids=_.map(items, 'id');
  console.log("ids",ids)

  let ids_=[...ids].join(',')
  console.log("ids_",ids_)

  let stats = await supabase
  .from('product_stats')
  .select(`*`) 
  .filter('product_id', 'in', '('+ids_+')')
  console.log("product_stats", stats.data)

  let u_stats=[]  
  _.forEach(items, function(value) {    
    let args={product_id: value.id, sales:value.qty}
    let st=_.filter(stats.data, { product_id: value.id });     
    st = st[0] ? st[0] : {sales:0}   
    if(st.id){     
      args.id=st.id
      args.available_units=parseInt(st.available_units) - parseInt(args.sales)  
      args.sales=parseInt(args.sales) + parseInt(st.sales )       
    }  
    u_stats.push(args)
  });

  console.log("u_stats", u_stats)

  
  if(u_stats.length){
    let u_ids=_.map(u_stats, 'product_id');
    let u_ids_=[...u_ids].join(',')
    let updated_stats = await supabase
    .from('product_stats')
    .upsert(u_stats)    
    console.log("updated_stats", updated_stats.data)
  }
  return ids
}
export { 
  update_product_units
}


/*
let test=[
  {id:6, qty:12},
  {id:17, qty:12},
  {id:18, qty:12},   
]
let ids=await update_product_units(test)
*/

