const com = (item) => {
  let stats;
  if(item){
    if(item.isOfferSent){
      stats=(<div>Offer Sent</div>)
    }else if(item.isPreviouslyCollaborated){
      stats=(<div>Previously Collaborated</div>)
    }else  if(item.isPreviouslyPurchased){
      stats=(<div>Previously Purchased</div>)
    }else{
      stats=false
    }
  }
  
  //console.log("product item", item)
  return stats
}
export default com
