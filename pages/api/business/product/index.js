import _ from "lodash"
import product from '../../../../data/business/product'

export default function handler(req, res) {  
  let item2=_.cloneDeep(product); item2.id=2;
  let item3=_.cloneDeep(product); item3.id=3;
  let items=[
    item2,
    item3
  ] 
  res.status(200).json({
    result: 'Business product',
    items: items
  });
}
