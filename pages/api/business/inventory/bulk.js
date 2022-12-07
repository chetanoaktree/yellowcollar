import {config as config_, savePostFile} from "../../com/temp_upload"
import action from '../../../../process_api/business/inventory/i_bulk_p'

//export const config = {...config_}


export default async function handler(req, res) {  
  //console.log("sd", req.body)
  //const { id } = req.query  
  const data=await action(req.body)
  //console.log(req)
  //const data={fasty:123}
  res.status(200).json(data);  
}