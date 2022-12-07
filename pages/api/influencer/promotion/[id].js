import promotion from '../../../../data/influencer/promotion'

export default function handler(req, res) {
  const { id } = req.query
  promotion.id=id;
  res.status(200).json({
    result: 'influencer Promotion '+ id,
    data: promotion
  });
}
