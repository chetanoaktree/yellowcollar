import business from '../../../data/business'
export default function handler(req, res) {
  const { id } = req.query
  business.id=id;
  res.status(200).json({
    result: 'Business '+ id,
    data: business
  });
}
