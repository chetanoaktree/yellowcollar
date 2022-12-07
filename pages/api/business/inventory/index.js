import filter from '../../../../process_api/business/inventory/filter'


export default async function handler(req, res) { 
  let env=process.env
  //console.log("Data2", env)
 
  const { id } = req.query  
  const data=await filter(req.body, env)
  res.status(200).json(data);
}
