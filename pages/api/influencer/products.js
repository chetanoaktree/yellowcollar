let API=process.env.API
import action from '../../../process_api/influencer/products_p'
export default async function handler(req, res) {  
  //const { id } = req.query  
  const data=await action({...req.body, API})
  //console.log(req)
  //const data={fasty:123}
  res.status(200).json(data);  
}
