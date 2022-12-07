import { supabase } from '../../util/supabaseClient'
import {process_membership} from '/ui/lib/get/membership'
import { get_image} from '../get/product'

const get_user_membership = async (data)=>{
  if(data.id) {
    let membership = await supabase
    .from('membership')
    .select('id, plan, status, duration, start_date, end_date, level') 
    .eq("user_id", data.id)
    //console.log("membership", membership)
    if(membership.data && membership.data[0]) {
      const mem=membership.data[0]
      let status=mem['status']       
      data.membership=process_membership(mem) 
      if(status!='expired' && data.membership.status=='expired'){         
        let membership2 = await supabase
        .from('membership')
        .update([{status:'expired'}]) 
        .eq("id", mem.id)
      }
    }
  }
  return data
}
const create_influencer_treshold_details = async (insertData, props)=>{ 
  let {instagram_url} = props 
  let details
  let treshold

  treshold = await supabase
  .from('influencer_treshold')
  .insert([{click_through:0}])        

  details = await supabase
  .from('influencer2_details')
  .insert([{desc:'', instagram_url}]) 
 
  if(details.data && details.data[0]) insertData.details_id=details.data[0].id 
  if(treshold.data  && treshold.data[0]) insertData.treshold_id=treshold.data[0].id   
  return insertData
}
const create_business_details = async (insertData, props)=>{   
  let details
  details = await supabase
  .from('business_details')
  .insert([{desc:''}]) 
 
  if(details.data && details.data[0]) insertData.details_id=details.data[0].id  
  return insertData
}

export default async function  process(props) {  
  let {action, user_id, email, name, pw, userType, from} = props
  //console.log("props", props)
  let data={userType:'guest'} 
  let user_base={}
  let user={}
  let newuser
  let details
  let treshold
  let insertData
  
  if(action=='loginById'){  
     user_base = await supabase
    .from('user')
    .select() 
    .eq("user_id", user_id) 

    //console.log("user_base", user_id, user_base)
    //console.log("user_base2", user_base.data)
    let userC= user_base.data[0]
    
    if(userC){
      if(userC.userType=="influencer") {      
        user = await supabase
        .from('influencer2')
        .select() 
        .eq("user_id", user_id)     

      }else if(userC.userType=="business") {      
        user = await supabase
        .from('business')
        .select() 
        .eq("user_id", user_id)
        
      }else{      
        data = userC
      }

      if(user.data && user.data[0]){
        data=user.data[0] 
        data=await get_user_membership(data) 
        data.userType=userC.userType  
      }
       
    }else if(user_id){
      let data2
      user = await supabase
      .from('influencer2')
      .select() 
      .eq("user_id", user_id)  
      if(user.data && user.data[0]) data2=user.data[0] 

      user = await supabase
      .from('business')
      .select() 
      .eq("user_id", user_id)  
      if(user.data && user.data[0]) data2=user.data[0] 
      if(data2)  {
        data=data2
      }else if(from=="get_user"){
        data={userType:'user'} 
      }
    } 
      

  }else if(action=='create_role'){ 

    let {industry, mobile, website, fullname, profession, companyName, onek_followers, instagram_url} = props

    insertData={user_id, email, name:fullname, from:'live' } 

    if(userType=="influencer") { 
      insertData={...insertData, profession}
      insertData.meta={mobile, industry, profession, onek_followers, instagram_url}
      insertData=await create_influencer_treshold_details(insertData, props)      
      user = await supabase
      .from('influencer2')
      .insert([insertData]) 
      
    }else if(userType=="business") { 
      insertData.company_name=companyName 
      insertData.meta={mobile, companyName, website, instagram_url}
      insertData=await create_business_details(insertData, props)
      user = await supabase
      .from('business')
      .insert([insertData])       
    }

    if(user.data && user.data[0]){
      data=user.data[0]       
      data.userType=userType      
    }

    user_base = await supabase
    .from('user')
    .update([{userType:userType}]) 
    .eq("user_id", user_id) 

    //console.log("user_base", user_base)
    

  }else if(action=='login'){  
    if(email=="admin@gmailtest.com") {      
      user={id:1, email:"admin@gmailtest.com"} 
      userType="admin"
    }else if(userType=="influencer") {      
      user = await supabase
      .from('influencer2')
      .select() 
      .eq("email", email)
    }else if(userType=="business") {   
      user = await supabase
      .from('business')
      .select() 
      .eq("email", email)
    }
    if(user && user.data && user.data[0]){
      data=user.data[0]  
    }else if(user.id && user.id){
      data=user  
    }else{
      data={status:'user_not_exists'}  
    }    
    if(userType!='') data.userType=userType 

    data=await get_user_membership(data)
    /*if(data.id) {
      
      let membership = await supabase
      .from('membership')
      .select('id, plan, status, duration, start_date, end_date, level') 
      .eq("user_id", data.id)

      if(membership.data && membership.data[0]) {
        const mem=membership.data[0]
        let status=mem['status']       
        data.membership=process_membership(mem) 
        if(status!='expired' && data.membership.status=='expired'){         
          let membership2 = await supabase
          .from('membership')
          .update([{status:'expired'}]) 
          .eq("id", mem.id)
        }
      }
    }*/

  }else if(action=='signup_user'){
    insertData={user_id, email, userType:"new_user"}  
    let user2 = await supabase
    .from('user')
    .insert([insertData])  
    data=user2.data[0]
       
  }else if(action=='signup'){  
    if(userType=="influencer") {        
      /*treshold = await supabase
      .from('influencer_treshold')
      .insert([{click_through:0}])        

      details = await supabase
      .from('influencer2_details')
      .insert([{desc:''}]) 

      insertData={user_id, email}
      if(details.data && details.data[0]) insertData.details_id=details.data[0].id 
      if(treshold.data  && treshold.data[0]) insertData.treshold_id=treshold.data[0].id */
      insertData=await create_influencer_treshold_details(insertData)
      newuser = await supabase
      .from('influencer2')
      .insert([insertData]) 
    }
    if(newuser.data && newuser.data[0]) data=newuser.data[0] 
    if(userType!='') data.userType=userType 
    //console.log("details", details.data)
    //console.log("treshold", treshold.data)    
    //console.log("user created")
    
  }else if(action=='fb_user'){  
    data.status='success'
    let checkuser
    if(userType=="influencer") {     
      checkuser = await supabase
      .from('influencer2')
      .select() 
      .eq("email", email)
    }else{
      checkuser = await supabase
      .from('business')
      .select() 
      .eq("email", email)
    }
    if(checkuser.data && checkuser.data[0]){
      //console.log("user Exists")
      data=checkuser.data[0]  
    }else{     

      if(userType=="influencer") {
        
        /*treshold = await supabase
        .from('influencer_treshold')
        .insert([{click_through:0}])        

        details = await supabase
        .from('influencer2_details')
        .insert([{desc:''}]) 

        insertData={email, name}
        if(details.data && details.data[0]) insertData.details_id=details.data[0].id 
        if(treshold.data  && treshold.data[0]) insertData.treshold_id=treshold.data[0].id */
        insertData=await create_influencer_treshold_details(insertData)
        newuser = await supabase
        .from('influencer2')
        .insert([insertData]) 
      }else{
        details = await supabase
        .from('business_details')
        .insert([{desc:''}]) 

        newuser = await supabase
        .from('business')
        .insert([{email, name, details_id:details.data[0].id}])         
      }
      if(newuser.data && newuser.data[0]) data=newuser.data[0] 
      //console.log("details", details.data) 
      //console.log("user not Exists")
      //console.log("user created")
    }
    if(userType!='') data.userType=userType 
    
  }
  if(data && data.image_id) data.image = await get_image(data)

  console.log("login DATA", data)
  return data
}
