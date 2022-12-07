const loadFromLocal2 = () => { 
  let cart_={}
  if(cart_=localStorage.getItem('cart')){    
    cart_ = JSON.parse(cart_) 
  }
  return cart_ 
}

export {
  loadFromLocal2
}
