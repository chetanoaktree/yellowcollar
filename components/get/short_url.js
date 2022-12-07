const com = (code) => { 
  let origin='http://localhost:3001'  
  if(window) {
    console.log("window.location", window.location)
    origin=window.location.origin
  }   
  return origin+'/'+code
}
export default com
