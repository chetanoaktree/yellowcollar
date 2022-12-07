import buy from '../../../process_api/influencer/buy'
export default async function handler(req, res) {  
  //const { id } = req.query  
  const data=await buy(req.body)
  console.log(req)
  //const data={fasty:123}
  res.status(200).json(req.body);  
}
