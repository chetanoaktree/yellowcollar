import _ from "lodash"
import notification from '../../../../data/influencer/notification'
/**
 * @swagger
 * /api/influencer/notification/:
 *   get:
 *     tags:
 *     - Influencer Notification
 *     description: display influencer notification
 *     produces: application/json *      
 *     responses:
 *       200:
 *         description: Successfull
 */
export default function handler(req, res) {  
  let item2=_.cloneDeep(notification); item2.id=2;
  let item3=_.cloneDeep(notification); item3.id=3;
  let items=[
    item2,
    item3
  ] 
  if (req.method === 'POST') {
    res.status(200).json({
      result: 'influencer notification',
      data: notification
    });
  } else {
     res.status(200).json({
      result: 'influencer notification',
      items: items
    });
  }  
}
