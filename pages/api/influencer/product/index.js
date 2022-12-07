
import action from '../../../../process_api/influencer/product_action_p'

export default async function handler(req, res) {  
  const query  = req.query
  const { id } = req.query
  
  let data=await action(req.body)
  res.status(200).json(data);  
}
