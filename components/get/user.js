const com = () => {   
  let user_={}
  let user=localStorage.getItem('user'); 
  if(user){
    user_=JSON.parse(user)
  } 
  
  return user_
}
const set_user = (data) => {   
  if(data){
    let page_data={isLogged:true, user:data}
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('page', JSON.stringify(page_data));  
  
    if(data.membership){
      localStorage.setItem('membership', JSON.stringify(data.membership)); 
    }
    //const user=JSON.parse(localStorage.getItem('user'));
    //console.log("user", data)    
  }
}

export{
  set_user
}
export default com
