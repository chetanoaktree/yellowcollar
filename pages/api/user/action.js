import action from '../../../process_api/user/action'
export default async function handler(req, res) {  
  //const { id } = req.query  
  const data=await action(req.body)
  //console.log(data)
  //const data={fasty:123}
  res.status(200).json(data);  
}
