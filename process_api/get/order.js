import _ from 'lodash'


let get_address = ({s_address1, s_city, s_country, s_postcode, s_state  }, format=false) =>{
  let out =''
  if(format==true){
    out = s_address1+', '+s_city+'<br> '+s_state+' '+s_postcode+', '+s_country.label+'.'   
  }else{
    out = s_address1+', '+s_city+', '+s_state+' '+s_postcode+', '+s_country.label+'.'
  }  
  return out
}

const getDiscountedPrice=(price, discount)=>{  
  price=parseInt(price)
  let value  
  if(discount && discount.search("%")!==-1){
    discount=discount.replace('%', '')
    value = parseInt((price * discount)/100)     
  }else{
    value = parseInt(discount)
  }
  return parseInt(price - value)
}

const getDiscountValue=(price, discount)=>{  
  price=parseInt(price)
  let value    
  if(discount && discount.search("%")!==-1){
    discount=discount.replace('%', '')
    value = parseInt((price * discount)/100)     
  }else{
    value = parseInt(discount)
  } 
  return value
}


const get_discount=( items)=>{  
 
  let out=0
  _.forEach(items, function(i, key) {
    if(i==null) return         
    out+=getDiscountValue(i.price, i.discount)     
  });
  return out  
}

const get_subtotal=(items)=>{  
  let total=0
  _.forEach(items, function(i, key) {
    if(i==null) return    
    total+=parseInt(i.price)    
  });
  return total  
}

const get_total=({subtotal, discount})=>{  
  let out=parseInt(subtotal)-parseInt(discount)
  return out  
}



export { 
  get_discount,
  getDiscountValue,
  getDiscountedPrice
}
