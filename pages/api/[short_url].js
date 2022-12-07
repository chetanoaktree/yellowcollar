export default async function handler(req, res) {  
  const { short_url } = req.query  
  //const data=await collab({id, ...req.body })
  res.status(200).json({
    short_url:short_url
  });
}
