//import notification from '../../../../data/business/notification'
import notification from '/process/business/notification'
export default function handler(req, res) {
  const { id } = req.query
  //notification.id=id;
  let data=notification(req.query)
  res.status(200).json({
    result: 'Business notification '+ id,
    data: data
  });
}
