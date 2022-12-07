import orders from '../../../../process_api/influencer/orders_p'
export default async function handler(req, res) {  
  //const { id } = req.query  
  const data=await orders(req.body)
  //console.log(req)
  //const data={fasty:123}
  res.status(200).json(data);  
}
