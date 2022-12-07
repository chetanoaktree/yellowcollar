import _ from "lodash"
import category from '../../../../data/common/category'

export default function handler(req, res) {  
  res.status(200).json({
    result: 'category',
    data: category
  });
}
