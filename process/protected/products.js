import product1 from '../../data/products/product1'
import product2 from '../../data/products/product2'
import product3 from '../../data/products/product3'
import product4 from '../../data/products/product4'
import product5 from '../../data/products/product5'

export default function process({cat}) {
  product1.cat=cat
  let data={
    cat:cat,  
    items:[
      product1,
      product2,
      product3,
      product4,
      product5,
      product1,
      product2,
      product3,
      product4,
      product5
    ],    
  }
  return data
}
