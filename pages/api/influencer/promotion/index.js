import _ from "lodash"
import promotion from '../../../../data/influencer/promotion'

export default function handler(req, res) {  
  let item2=_.cloneDeep(promotion); item2.id=2;
  let item3=_.cloneDeep(promotion); item3.id=3;
  let items=[
    item2,
    item3
  ] 
  res.status(200).json({
    result: 'influencer promotion',
    items: items
  });
}
