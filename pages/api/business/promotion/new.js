import _ from "lodash"
import promotion from '../../../../data/business/promotion'

export default function handler(req, res) {  
  res.status(200).json({
    result: 'Business promotion',
    data: promotion
  });
}
