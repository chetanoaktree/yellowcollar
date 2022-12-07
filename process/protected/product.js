import product1 from '../../data/products/product1'
import product2 from '../../data/products/product2'
import product3 from '../../data/products/product3'
import product4 from '../../data/products/product4'
import product5 from '../../data/products/product5'
import desc1 from '../../data/products/desc1'

export default function process({id}) {  
  const products=[
    product1,
    product2,
    product3,
    product4,
    product5,
  ]
  let data=products[id-1]
  data.description=desc1
  return data
}
