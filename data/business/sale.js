import order_item from '../order_item';
import shipping from '../shipping';
import payment from '../payment';

let item={
  id:1,
  itemsCount:'',
  itemsTotal:'',
  itemsDiscount:'',
  itemsTax:'',
  items:[
    order_item,
  ],
  shipping:shipping,
  payment:payment,  
  discount:'',
  total:'',
  note:'',
  status:'',
  created_at:'',
  modiled_at:'',
}

export default item
