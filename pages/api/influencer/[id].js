import influencer from '../../../data/influencer'
export default function handler(req, res) {
  const { id } = req.query
  influencer.id=id;
  res.status(200).json({
    result: 'Influencer '+ id,
    data: influencer
  });
}
