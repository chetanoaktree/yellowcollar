const getTreshold = (i, tresholds=[]) => {   
  let treshold=_.filter(tresholds, ['id', i.influencer_id]) 
  i.influencer=i.influencer2
  i.treshold=treshold[0] ? treshold[0] : {}  
  return i
}

let post_types=[
  {label:"Story", value:'story', name:"story"},
  {label:"Reel", value:'reel', name:"reel"},
  {label:"Video", value:'video', name:"video"},
  {label:"Post", value:'post', name:"post"}       
]

export {
  getTreshold,
  post_types
}
