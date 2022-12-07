import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
           palette: {
                background: '#ffffff',
                /*error: '#ad2e2e',
                textTitle: "white",
                textLabel: "white",
                textInput: '#a9a9a9',
                textPrimary: "white",
                textLink: '#a9a9a9',   */                         
            },
            style: {
                button: {
                    backgroundColor: '#FFFF01',
                    color:'#253C64',
                    border: '0px',                    
                    margin: '0 auto',
                    borderRadius:'100px',
                    fontSize:'16px',
                    height:'auto',                    
                    fontWeight:400,
                    padding:'10px 20px',
                    boxShadow:'0px 30px 20px -16px rgba(0,0,0,0.05), 0px 2px 4px 0px rgba(0,0,0,0.05)',
                },
                emailVerificationButtonWrapper:{
                    maxWidth:'auto',
                },
                superTokensBranding: {
                    display:'none',
                },
                headerTitle:{
                   fontWeight:600, 
                },
                container:{
                    boxShadow:'0px 30px 20px -16px rgba(0,0,0,0.05), 0px 2px 4px 0px rgba(0,0,0,0.05)',
                }
            },
            emailVerificationFeature: {
                mode: "REQUIRED"
            },          
            signInAndUpFeature: {
                signUpForm: {
                    termsOfServiceLink: process.env.API+"/terms-conditions",
                    privacyPolicyLink: process.env.API+"/privacy-policy",
                    formFields: [{
                        id: "fullname",
                        label: "Full name",
                        placeholder: "First name and last name"
                        //optional: true
                    },
                    /*{
                        id: "signup_code",
                        label: "Signup Code",
                        placeholder: "Enter signup code"
                        //optional: true
                    }*/
                    ]
                }
            },
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,

                        // we will only be overriding what happens when a user
                        // clicks the sign in button.
                        signIn: async function (input) {

                            // TODO: some custom logic
                            console.log("frontend res input", input)
                            // or call the default behaviour as show below
                            let res=await originalImplementation.signIn(input);
                            console.log("frontend res res", res)
                            res.message="fasty"
                            return res
                        }
                        // ...
                        // TODO: override more functions
                    }
                },              
            }
      }),
      SessionReact.init(),
    ],
  }
}