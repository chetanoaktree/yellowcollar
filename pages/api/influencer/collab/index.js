import collabs from '../../../../process_api/influencer/collabs'
export default async function handler(req, res) {
  //console.log("influencer_collabs", req.body)  
  const { id } = req.query  
  const data=await collabs(req.body)  
  res.status(200).json(data);
}
