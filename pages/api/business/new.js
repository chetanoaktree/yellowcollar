import _ from "lodash"
import business from '../../../data/business'

export default function handler(req, res) {  
  res.status(200).json({
    result: 'Business',
    data: business
  });
}
