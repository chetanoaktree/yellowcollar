import _ from "lodash"
import collabaration from '../../../../data/influencer/collabaration'
/**
 * @swagger
 * /api/influencer/collab/:
 *   get:
 *     tags:
 *     - Influencer Collabaration
 *     description: display Influencer collabarations
 *     produces: application/json *      
 *     responses:
 *       200:
 *         description: display Influencer collabarations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfluencerCollabaration'
 */
export default function handler(req, res) {  
  let item2=_.cloneDeep(collabaration); item2.id=2;
  let item3=_.cloneDeep(collabaration); item3.id=3;
  let items=[
    item2,
    item3
  ] 
  if (req.method === 'POST') {
    res.status(200).json({
      result: 'Collabaration',
      data: collabaration
    });
  } else {
     res.status(200).json({
      result: 'Collabarations',
      items: items
    });
  }  
}
