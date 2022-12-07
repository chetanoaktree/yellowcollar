import _ from "lodash"
import signup from '../../../../data/common/signup'

export default function handler(req, res) {    
  res.status(200).json({
    result: 'Signup Successfull',
    data: signup,
  });
}
