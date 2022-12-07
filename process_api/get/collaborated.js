import { supabase } from '../../util/supabaseClient'

export default async function process(data, influencer_id) { 
  let collab_request = await supabase
  .from('collab_request')    
  .select()
  .order('created_at', { ascending: false } )
  .eq("product_id", data.id)  
  .eq("influencer_id", influencer_id)
  //console.log("collab_request", collab_request)
  if(collab_request.data && collab_request.data[0]) {
    data.collab_request=collab_request.data[0].status
  }else{
    let collab = await supabase
    .from('collab')    
    .select()
    .order('created_at', { ascending: false } )
    .eq("product_id", data.id)  
    .eq("influencer_id", influencer_id)
    //console.log("product collab", collab)
    //console.log("influencer_id", influencer_id)
    
    if(collab.data[0]){
      let d=collab.data[0]

      let forPrevious=collab.data[0]
      if(d){
        data.isOfferSent=d.status=='requested' ? true : false
      } 

      if(collab.data[1] && collab.data[1].status=="paid") {
        forPrevious=collab.data[1]
      }
      /*if(collab.data[0].status=="paid" || collab.data[1].status=="paid") {
        forPrevious=collab.data[1]  
        console.log("forPrevious", collab.data)
        data.isPreviouslyCollaborated= true 
        data.previouslyCollaboratedOn='12.02.2022'
      }*/

      if(forPrevious){      
        data.isPreviouslyCollaborated= true 
        data.previouslyCollaboratedOn=forPrevious.created_at
        data.previouslyCollabId=forPrevious.id 
        data.isCollaborateAgain=forPrevious.status=='paid' ? true : false
      }

      data.influencer_id= influencer_id 
    }
  }

  
  

  return data
}

