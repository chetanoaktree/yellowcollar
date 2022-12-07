import _ from "lodash"
import signup from '../../../../data/common/signup'

export default function handler(req, res) { 
  signup.isEmailVerified=true;   
  res.status(200).json({
    result: 'Email Verification Successfull',
    data: signup,
  });
}
