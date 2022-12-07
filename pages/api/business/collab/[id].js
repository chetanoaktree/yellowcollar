import collab from '../../../../process_api/business/collab'
export default async function handler(req, res) {  
  const { id } = req.query   
  const data=await collab({id, ...req.body})
  res.status(200).json(data);
}
