//import product from '../../../../process/protected/product'

import action from '../../../../process_api/influencer/product_p'

export default async function handler(req, res) {  
  const query  = req.query
  const { id } = req.query
  

  //let product_=product({id:id})
  //console.log("product_", product_)
  let data=await action({id, ...req.body})
  console.log("product res data", data)
  if(data==false){   
    res.status(200).json({});
  }else{
    data.img='/products/'+data.img  
    res.status(200).json(data);
  }
}
