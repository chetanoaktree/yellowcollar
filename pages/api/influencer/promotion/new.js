import _ from "lodash"
import promotion from '../../../../data/influencer/promotion'

export default function handler(req, res) {  
  res.status(200).json({
    result: 'influencer promotion',
    data: promotion
  });
}
