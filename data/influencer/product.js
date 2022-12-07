import seo from '../seo';
import image from '../image';
import category from '../category';
import businessCard from '../businessCard';
let item={
  id:1,  
  name:'',
  description:'',
  images:[
    image,
  ],
  sku:'',
  price:'',
  discount:'',
  seo:seo, 
  categories:[
    category
  ],
  business:businessCard,
  purchase:{
    isLastPurchased:'',
    lastPurchasedOn:'',
  },
  collab:collab,
  url:'',
}

export default item
