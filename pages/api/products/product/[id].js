import product from '../../../../process/protected/product'


export default function handler(req, res) {
  const query  = req.query
  const { id } = req.query
  //console.log(query)
  let product_=product({id:id})
  res.status(200).json(product_);
}
