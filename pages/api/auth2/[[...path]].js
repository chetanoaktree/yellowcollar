import supertokens from 'supertokens-node';
import { middleware } from 'supertokens-node/framework/express';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { backendConfig } from '../../../config/backendConfig';

supertokens.init(backendConfig())

export default async function superTokens(req, res) {
  try{
    await superTokensNextWrapper(
      async (next) => {
        await middleware()(req, res, next)
      },
      req,
      res
    )
  }catch (error){
    console.log("res error", error.message)
    //console.log("res status", res)
    res.status(404).send('Some error')
  }
  
  //console.log("res status", res)
  //console.log("res status", req)
  if (!res.writableEnded) {
    res.status(404).send('Not found')
  }
}