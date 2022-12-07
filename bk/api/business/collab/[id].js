import collabaration from '../../../../data/business/collabaration'
export default function handler(req, res) {
  const { id } = req.query
  collabaration.id=id;
  res.status(200).json({
    result: 'Business Collabaration '+ id,
    data: collabaration
  });
}
