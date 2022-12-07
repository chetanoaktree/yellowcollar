import _ from "lodash"
import influencer from '../../../data/influencer'

export default function handler(req, res) {  
  let item2=_.cloneDeep(influencer); item2.id=2;
  let item3=_.cloneDeep(influencer); item3.id=3;
  let items=[
    item2,
    item3
  ] 
  if (req.method === 'POST') {
    res.status(200).json({
      result: 'Influencer',
      data: influencer
    });
  } else {
     res.status(200).json({
      result: 'Influencers',
      items: items
    });
  }
}
