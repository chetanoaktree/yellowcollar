import action from '../../../process_api/com/feedback_p'
export default async function handler(req, res) {  
  //const { id } = req.query  
  const data=await action(req.body)
  console.log("data", data)
  //const data={fasty:123}
  res.status(200).json(data);  
}
