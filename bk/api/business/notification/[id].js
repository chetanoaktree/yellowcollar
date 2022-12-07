import notification from '../../../../data/business/notification'
export default function handler(req, res) {
  const { id } = req.query
  notification.id=id;
  res.status(200).json({
    result: 'Business notification '+ id,
    data: notification
  });
}
