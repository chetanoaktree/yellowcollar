import _ from "lodash"
import order from '../../../../data/influencer/order'

export default function handler(req, res) {  
  res.status(200).json({
    result: 'Influencer order',
    data: order
  });
}
