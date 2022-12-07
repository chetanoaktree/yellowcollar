import axios from 'axios';
export default async function handler(req, res) {   
  let { code } = req.query  
  //const data=await collab({id, ...req.body })
  //let client_id='3361757314145378'
  //let client_secret='31389e1ec378edce52a84976f3e98fbd'
  let client_id='417895830367589'
  let client_secret='66605b90bddaf9d1c0326b8bac26261a'
  let grant_type='authorization_code'
  let redirect_uri=process.env.API+'/api/instagram'
  //let code='AQAV47FYHaBmKB3RjSR7mOL4-IDGDq9if9H7pgfoNywUsKYGeDqdeBAtZjDV9lm8e4O0AFAhbMLh_iD3LS3HNpKuf35ITN6vIRyTRonZNtSAuBP17Kc1ry_dgGK8jYPc0QK_MElbnnAv72T-RK40RVkci_tI95V3mlIoG9dS9cS30ZwiJSpCfvHPS86eruron9HPsdRW_ZMAvamtvGoHXFq7Rdh8CkmxEMpGiP0ph5PMlg'
  const options = {
    headers: { 'Content-Type': 'application/json' },
  }
  const body={ code, client_id, client_secret, grant_type, redirect_uri}
  //const response = await axios.post('https://api.instagram.com/oauth/access_token', body, options) 
  //const response = await axios.get('https://localhost:3000/fasty')

  var formBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const config ={
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    //body:JSON.stringify(body)
    body:formBody
  }
  const response = await fetch('https://api.instagram.com/oauth/access_token', config)
  const json = await response.json()
  console.log("json", json)
  console.log("code", code)
  res.status(200).json({code, json});  
}

//redirect_uri
///https://developers.facebook.com/docs/instagram-basic-display-api/reference/oauth-access-token
