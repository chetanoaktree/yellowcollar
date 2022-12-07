import action from '../../../../process_api/com/membership/action'

const handler = async (req, res) => {
  
  //console.log("req", req) 
  //const { id } = req.query  
  const data=await action(req.body)  
  //console.log(req)
  //const data={fasty:123}
  res.status(200).json(data);  
}

export default handler
