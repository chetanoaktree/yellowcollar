import _ from "lodash"
import product from '../../../../data/influencer/product'

export default function handler(req, res) {  
  res.status(200).json({
    result: 'Influencer product',
    data: product
  });
}
