import notification from '../../../../data/influencer/notification'
export default function handler(req, res) {
  const { id } = req.query
  notification.id=id;
  res.status(200).json({
    result: 'Influencer notification '+ id,
    data: notification
  });
}
