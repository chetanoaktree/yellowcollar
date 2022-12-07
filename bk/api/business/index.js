import _ from "lodash"
import business from '../../../data/business'
/**
 * @swagger
 * /api/business/:
 *   get:
 *     tags:
 *     - Business
 *     description: display all Businesss
 *     produces: application/json *      
 *     responses:
 *       200:
 *         description: Successfull
 */
export default function handler(req, res) {  
  let item2=_.cloneDeep(business); item2.id=2;
  let item3=_.cloneDeep(business); item3.id=3;
  let items=[
    item2,
    item3
  ] 
  if (req.method === 'POST') {
    res.status(200).json({
      result: 'Business',
      data: business
    });
  } else {
     res.status(200).json({
      result: 'businesses',
      items: items
    });
  }
}
