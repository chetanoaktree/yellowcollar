import _ from "lodash"
import product from '../../../../data/business/product'

export default function handler(req, res) {  
  res.status(200).json({
    result: 'Business product',
    data: product
  });
}
