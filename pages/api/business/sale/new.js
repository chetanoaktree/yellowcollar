import _ from "lodash"
import sale from '../../../../data/business/sale'

export default function handler(req, res) {  
  res.status(200).json({
    result: 'business sale',
    data: sale
  });
}
