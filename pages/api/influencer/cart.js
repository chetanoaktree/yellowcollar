import action from '../../../process_api/influencer/cart'
export default async function handler(req, res) {  
  const { id } = req.query  
  const data=await action(req.body)
  //const data={fasty:123}
  res.status(200).json(data);  
}
