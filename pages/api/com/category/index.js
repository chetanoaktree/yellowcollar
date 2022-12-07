import _ from "lodash"
import category from '../../../../data/common/category'

export default function handler(req, res) {  
  let item2=_.cloneDeep(category); item2.id=2;
  let item3=_.cloneDeep(category); item3.id=3;
  let items=[
    item2,
    item3
  ] 
  res.status(200).json({
    result: 'category',
    items: items
  });
}
