import stats from '../../../process_api/influencer/stats'
export default async function handler(req, res) {  
  //const { id } = req.query  
  const data=await stats(req.body)
  //console.log(req)
  //const data={fasty:123}
  res.status(200).json(data);  
}
