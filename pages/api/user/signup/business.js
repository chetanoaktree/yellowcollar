import _ from "lodash"
import signup_business from '../../../../data/common/signup_business'

export default function handler(req, res) {    
  res.status(200).json({
    result: 'Buesiness Signup Successfull',
    data: signup_business,
  });
}
