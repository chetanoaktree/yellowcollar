//import products from '../../../../process/protected/products'
import action from '../../../../process_api/influencer/cat_p'


export default async function handler(req, res) {
  const query  = req.query
  const { cat } = req.query
  //console.log(req.body)
  let cat_products=await action({cat:cat, ...req.body})
  let cat_products2={sd:12}
  res.status(200).json(cat_products);
}
