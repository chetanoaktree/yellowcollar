import sales from '../../../../process_api/business/sales_p'
export default async function handler(req, res) {  
  const { id } = req.query  
  const data=await sales(req.body)
  res.status(200).json(data);
}
