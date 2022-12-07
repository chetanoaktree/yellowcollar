import _ from "lodash"
import collabaration from '../../../../data/business/collabaration'
/**
 * @swagger
 * /api/business/collab/:
 *   get:
 *     tags:
 *     - Business Collabaration
 *     description: display business collabarations
 *     produces: application/json *      
 *     responses:
 *       200:
 *         description: Successfull
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
      result: 'Business Collabaration',
      data: collabaration
    });
  } else {
     res.status(200).json({
      result: 'Business Collabarations',
      items: items
    });
  }  
}
