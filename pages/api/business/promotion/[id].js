import promotion from '../../../../data/business/promotion'

export default function handler(req, res) {
  const { id } = req.query
  promotion.id=id;
  res.status(200).json({
    result: 'Business Promotion '+ id,
    data: promotion
  });
}
