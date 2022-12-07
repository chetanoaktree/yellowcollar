import _ from "lodash"
import influencer from '../../../data/influencer'
/**
 * @swagger
 * /api/influencer/:
 *   get:
 *     tags:
 *     - Influencer
 *     description: display all Influencers
 *     produces: application/json *      
 *     responses:
 *       200:
 *         description: Successfull
 */
export default function handler(req, res) {
  let item={
    id:1,
    name:'',
    bio:'',
    email:'',
    instagram:{
      handle:'',
      followers:'',
      isVerified:true,
    },
    facebook:{
      handle:'',
      followers:'',
      isVerified:true,
    },
    twitter:{
      handle:'',
      followers:'',
      isVerified:true,
    }
  }
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
