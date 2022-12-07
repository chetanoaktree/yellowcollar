import products from '../../../../process/protected/products'


export default function handler(req, res) {
  const query  = req.query
  const { cat } = req.query
  console.log(query)
  let cat_products=products({cat:cat})
  res.status(200).json(cat_products);
}
