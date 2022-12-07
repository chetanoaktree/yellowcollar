import EmailPasswordNode from 'supertokens-node/recipe/emailpassword'
import SessionNode from 'supertokens-node/recipe/session'
import jwt from "jsonwebtoken";
import { appInfo } from './appInfo'

import { supabase } from '../util/supabaseClient'
//import { getSupabase } from '../util/supabaseClient_2'
import action from '../process_api/user/action'
import auth_action from '../process_api/user/auth'



let supabase_signing_secret = process.env.SUPABASE_SIGNING_SECRET 

const check_signup_code = async (input) => {
    let status='fail'
    let fullname=''
    let email=''
    let code=''
    let data = await Promise.all(input.formFields.map(async (f) => {
        if (f.id === "signup_code") {
            code=f.value
            console.log("Signup Code", code)  
            let signup_code=await auth_action({action:"get_signup_code", code})
            status=signup_code.status
            return {
                ...f,
                value: f.value
                //value: inputMask(f.value)
            }
        }
        if (f.id === "email") {
            email=f.value
        }
        if (f.id === "fullname") {
            fullname=f.value
        }
        return f;
    }))  
    if(email && code) {
        let signup_code=await auth_action({action:"check_signup_code", code, email, fullname})
        status=signup_code.status
    }
    //if(status=="available")  await auth_action({action:"add_email", code, email:})
    return status
}

export const backendConfig = () => {
  //console.log("backend", process.env.SUPERTOKENS_CONNECTION_URI)
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init({          
          signUpFeature: {
                formFields: [{
                    id: "fullname",
                    validate: async (value) => {
                        // Your own validation returning a string or undefined if no errors.
                        return undefined;
                    }
                }/*,{
                    id: "signup_code",
                    validate: async (value) => {
                        // Your own validation returning a string or undefined if no errors.
                        return undefined;
                    }
                }*/]
            },
          override: {              
              emailVerificationFeature: {
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            verifyEmailPOST: async function (input) {

                                if (originalImplementation.verifyEmailPOST === undefined) {
                                    throw Error("Should never come here");
                                }

                                // First we call the original implementation
                                let response = await originalImplementation.verifyEmailPOST(input);

                                

                                // Then we check if it was successfully completed
                                if (response.status === "OK") {
                                    let { id, email } = response.user;
                                    await action({action:'signup_user', user_id:id, email:email})
                                    await auth_action({action:"add_user", user_id:id, email:email})                                    
                                    // TODO: post email verification logic
                                }
                                return response;
                            }
                        }
                    }
                },
              apis: (originalImplementation) => {
                  return {
                      ...originalImplementation,                     
                      signInPOST: async function (input) {
                          //console.log("signInPOST USER", input)                         

                          // First we call the original implementation of signInPOST.
                          let response = await originalImplementation.signInPOST(input);

                          // Post sign up response, we check if it was successful
                          if (response.status === "OK") {
                              let { id, email } = response.user;
                              console.log("SIGNIN USER", response.user)
                              //await action({action:'login', userType:'influencer', email:email})
                              //await action({action:'signup', userType:'influencer', user_id:id, email:email})
                              //const accessTokenPayload = response.session.getAccessTokenPayload();
                              //const supabase = getSupabase(accessTokenPayload.supabase_token);                                                      

                             /*const { error } = await supabase
                              .from('influencer2')
                              .insert({user_id:id, email}) 

                              if (error !== null) {
                                  throw error;
                              }*/

                              // These are the input form fields values that the user used while signing in
                              let formFields = input.formFields
                              // TODO: post sign in logic
                          }
                          return response;
                      },
                      signUpPOST: async function (input) {
                            console.log("signupPOST USER", input)
                            /* //CAN ENABLE LATER
                            let status=await check_signup_code(input)                           
                            if(status=='fail' || status=='full'){
                                console.log("Action Failed", status)
                                input.options.res.setStatusCode(404); // or any other status code
                                input.options.res.sendJSONResponse({
                                    message: "my custom response",                           
                                })

                                return {
                                    status: "OK",
                                    exists: false
                                };
                            } else{
                                console.log("Action Success", status)
                            }  */                        

                            // First we call the original implementation of signUpPOST.
                            let response = await originalImplementation.signUpPOST(input);
                            console.log("signup response", response)
                            // Post sign up response, we check if it was successful
                            if (response.status === "OK") {
                                let { id, email } = response.user;
                                console.log("SIGNUP USER", response.user)
                                //await action({action:'signup', userType:'influencer', user_id:id, email:email})
                                //await action({action:'signup_user', user_id:id, email:email})
                                
                                // // These are the input form fields values that the user used while signing up
                                let formFields = input.formFields;
                                // TODO: post sign up logic
                            }
                            return response;
                        }
                  }
              }
          }
      }),
      SessionNode.init({
          override: {
              functions: (originalImplementation) => {
                  return {
                      ...originalImplementation,
                      // We want to create a JWT which contains the users userId signed with Supabase's secret so
                      // it can be used by Supabase to validate the user when retrieving user data from their service.
                      // We store this token in the accessTokenPayload so it can be accessed on the frontend and on the backend.
                      createNewSession: async function (input) {
                          console.log("INPUT", input)
                          const payload = {                              
                              userId: input.userId,
                              exp: Math.floor(Date.now() / 1000) + 60 * 60,
                          };

                          const supabase_jwt_token = jwt.sign(payload, supabase_signing_secret);

                          //const user=await action({action:'loginById', userType:'influencer', user_id:input.userId})
                          const user=await action({action:'loginById', user_id:input.userId})
                          console.log("SESSION USER", user)

                          input.accessTokenPayload = {
                              ...input.accessTokenPayload,
                              supabase_token: supabase_jwt_token,
                              user: user
                          };
                          

                          return await originalImplementation.createNewSession(input);
                      },
                  };
              },
          },
      }),
    ],
    isInServerlessEnv: true,
  }
}