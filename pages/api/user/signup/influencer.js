import _ from "lodash"
import signup_influencer from '../../../../data/common/signup_influencer'

export default function handler(req, res) {    
  res.status(200).json({
    result: 'Influencer Signup Successfull',
    data: signup_influencer,
  });
}
