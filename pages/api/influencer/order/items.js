import items from '../../../../process_api/influencer/order/items'
export default async function handler(req, res) {  
  //const { id } = req.query  
  const data=await items(req.body)
  //console.log(req)
  //const data={fasty:123}
  res.status(200).json(data);  
}
