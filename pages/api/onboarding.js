import action from '../../process_api/onboarding_p'
export default async function handler(req, res) {  
  //const { id } = req.query  
  const data=await action(req.body)
  //console.log(req)
  //const data={fasty:123}
  res.status(200).json(data);  
}
