import product from '../../../../data/business/product'

export default function handler(req, res) {
  const { id } = req.query
  product.id=id;
  
  if (req.method === 'PATCH') {
    res.status(200).json({
      result: 'Business Product '+ id + ' updated ',      
      data: product
    });
  } else if (req.method === 'DELETE') {
    res.status(200).json({
      result: 'Business Product '+ id + ' deleted ',      
    });
  } else {
    res.status(200).json({
      result: 'Business Product '+ id,
      data: product
    });
  }
}
