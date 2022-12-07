const com = (code) => { 
  let origin='https://yc.club/'
  origin='http://localhost:3000'
  if(window) {
    //console.log("window.location", window.location)
    origin=window.location.origin
  }   
  return origin+'/url/'+code
}
export default com
