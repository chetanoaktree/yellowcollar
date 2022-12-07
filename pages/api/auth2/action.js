import {deleteUser} from "supertokens-node";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import supertokens from 'supertokens-node'
import { backendConfig } from '../../../config/backendConfig'

supertokens.init(backendConfig())

export default async function handler(req, res) { 
  let { action, userid } = req.query
  let { user_id } = req.body    
  let ret={status:'ok'}
  if(action=="delete")  {
    ret.data=await deleteUser(userid); 
    ret.status='deleted'
  }else if(action=="get_user_info")  {
    ret.data = await EmailPassword.getUserById(user_id);
  }  
  res.status(200).json(ret);  
}

//redirect_uri
///https://developers.facebook.com/docs/instagram-basic-display-api/reference/oauth-access-token
//https://localhost:3000/api/auth2/action?action=delete&userid=54667082-aef8-4c64-9a90-c42a1f138153
