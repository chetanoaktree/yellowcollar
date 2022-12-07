import order from '../../../../data/influencer/order'

export default function handler(req, res) {
  const { id } = req.query
  order.id=id;
  res.status(200).json({
    result: 'Influencer order '+ id,
    data: order
  });
}
