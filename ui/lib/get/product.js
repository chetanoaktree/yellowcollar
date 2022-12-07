const trim =(discount) =>{
  discount=discount? discount : ''
  return discount=discount.replace("%", "").trim();    
}
const checkPercentage =(discount='') =>{
  //console.log("d checkPercentage", discount)
  discount=discount? discount : ''
  return discount.search("%")!==-1 ? true : false   
}
const getDiscountedPrice=(price, discount, discountUnit)=>{
  //console.log("d discountUnit", discountUnit)
  //console.log("d discount", discount)
  //console.log("d price", price)
  price=parseInt(price)
  let value  
  if(discountUnit){   
    if(discountUnit.value=="%"){   
      discount=trim(discount);   
      value = parseInt((price * discount)/100)
    }else{
      value = parseInt(discount)
    }    
  }else if(discount.search("%")!==-1){
    discount=trim(discount); 
    value = parseInt((price * discount)/100)     
  }else{
    value = parseInt(discount)
  }
  return parseInt(price - value)
}
const get_image_src = ({image_id, image, img}) =>{
  let src=''
  if(image_id && image){
    src=image.path_
  }else{
    src="/products/"+img
  }
  return src
}
const get_product_title = (i) => {
  let {title, variation=""} = i
  let variation_ =''
  if(variation && variation!=''){
    variation_=_.map(variation, (v, k)=>{
      return v
    })
    variation_=" : "+variation_.join(" : ")
  }   
  return title+variation_
}
export {
  getDiscountedPrice,
  checkPercentage,
  trim,
  get_image_src,
  get_product_title
}
