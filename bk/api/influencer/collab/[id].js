import collabaration from '../../../../data/influencer/collabaration'
export default function handler(req, res) {
  const { id } = req.query
  collabaration.id=id;
  res.status(200).json({
    result: 'Collabaration '+ id,
    data: collabaration
  });
}
