import category from '../../../../data/common/category'
import {extra} from '../../../../data/common/category'

export default function handler(req, res) {
  const { id, getItems, getExtra } = req.query
  category.id=id;

  if(getItems!=1)  delete category.products
  if(getExtra!=1)  delete category.seo
  console.log("getItems", req)
  //category.products=12
  if (req.method === 'PATCH') {
    res.status(200).json({
      result: 'category '+ id + ' updated ',      
      data: category
    });
  } else if (req.method === 'DELETE') {
    res.status(200).json({
      result: 'category '+ id + ' deleted ',      
    });
  } else {
    res.status(200).json({
      result: 'category '+ id,
      data: category
    });
  }
}
