import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from 'supertokens-node/recipe/session/framework/express'
import supertokens from 'supertokens-node'
import { backendConfig } from '../../../config/backendConfig'
import NextCors from "nextjs-cors";
import Session from "supertokens-node/recipe/session";

supertokens.init(backendConfig())

import action from '../../../process_api/user/action'

export default async function user(req, res) {
    console.log("SESSION USER start", 1)    
    let session = await Session.getSession(req, res);
    //console.log("SESSION USER session", session)    
    if (session === undefined) {
        if(session) return res.json({status_code:"no_session_user"})
    }
    //if(!req.session) return res.json({status_code:"no_session_user"})
    // NOTE: We need CORS only if we are querying the APIs from a different origin
    /*await NextCors(req, res, {
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "https://localhost:3000",
        credentials: true,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    });*/

    // we first verify the session
    await superTokensNextWrapper(
        async (next) => {
            return await verifySession()(req, res, next)       
        },
        req, res
    )
    
    //console.log("SESSION USER session", req.session)
    // if it comes here, it means that the session verification was successful
    
    const user=await action({action:'loginById', user_id:req.session.getUserId(), from:'get_user'})
    console.log("SESSION USER", user)

    return res.json({
        note:
            'Fetch any data from your application for authenticated user after using verifySession middleware',
        user: user,
        userId: req.session.getUserId(),
        sessionHandle: req.session.getHandle(),
        userDataInAccessToken: req.session.getAccessTokenPayload(),
    })
   
}