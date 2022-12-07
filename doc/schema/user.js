const schema = {   
    "Signup": {
        "type": "object",
        "properties": {
            id:{
                "type": "integer"
            },
            first_name:{
                "type": "string"
            },
            last_name:{
                "type": "string"
            },
            email:{
                "type": "string"
            },            
            isSocialLogin:{
                "type": "boolean"
            },
            facebookLogin:{
                "type": "object",
                properties:{
                    email:{
                        type:"string"
                    },
                    name:{
                        type:"string"
                    }
                }
            },
            googleLogin:{
                "type": "object",
                properties:{
                    email:{
                        type:"string"
                    },
                    name:{
                        type:"string"
                    }
                }
            },
            isEmailVerified:{
                "type": "boolean"
            },
            subscription_plan:{
                "type": "string"
            }, 
            primaryRole:{
                "type": "string"
            },            
        }
    },   
    "Signin": {
        "type": "object",
        "properties": {            
            email:{
                "type": "string"
            },
            password:{
                "type": "string"
            },                   
        }
    },  
    "ForgotPasswordReq": {
        "type": "object",
        "properties": {            
            email:{
                "type": "string"
            },                              
        }
    },
    "ForgotPasswordRes": {
        "type": "object",
        "properties": {            
            result:{
                "type": "string"
            },                              
        }
    }, 
    "ChangePasswordReq": {
        "type": "object",
        "properties": {            
            email:{
                "type": "string"
            }, 
            password:{
                "type": "string"
            },                              
        }
    },
    "EmailSubscribeReq": {
        "type": "object",
        "properties": {            
            email:{
                "type": "string"
            },                              
        }
    },  
}
export default schema;