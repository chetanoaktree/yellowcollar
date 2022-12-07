import { supabase } from '../../util/supabaseClient'
import _ from 'lodash'



const getUser = async (items) =>{
  let values = new Set([])  
  _.forEach(items, (v, k)=>{      
    values.add(v['code'])
  })  
  let values_=[...values].join('","')
  values_='("'+values_+'")'
  //console.log("values_", values_)
  let res = await supabase
  .from('signup_code_user')
  .select()     
  .filter('code', 'in', values_) 
  let list=res.data ? res.data : []
  //console.log("res", res)
  return list
}

const signupCodeUsers = async (items) => {
  let users=await getUser(items)
  //console.log("users", users)
  _.forEach(items, (v, k)=>{         
    let users_=_.filter(users, ['code', v.code]) 
    items[k]['users']=users_ ?  users_ : []
  }) 
  return items
}

export {
  signupCodeUsers
}
