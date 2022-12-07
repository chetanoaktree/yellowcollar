import sale from '../../../../data/business/sale'

export default function handler(req, res) {
  const { id } = req.query
  sale.id=id;
  res.status(200).json({
    result: 'business sale '+ id,
    data: sale
  });
}
