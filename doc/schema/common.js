const schema = {
   "paramId":{  
        "in": "path",          
        "name": "id",   
        "type": "string",        
        "description": "The Promotion id in Platovise system",
        "required": true,
        "style": "simple",           
        "example": 39000452        
    },         
    "Influencers": {
        "type": "object",
        "properties": {
            influencer_id:{
            "type": "integer"
            },
            influencer_name:{
            "type": "string"
            }
        }
    }, 
    "Products": {
        "type": "object",
        "properties": {
            id:{
            "type": "integer"
            },
            name:{
            "type": "string"
            }
        }
    },
    "Product": {
        "type": "object",
        "properties": {
            id:{
            "type": "integer"
            },
            name:{
            "type": "string"
            }
        }
    },
    "Category": {
        "type": "object",
        "properties": {
            id:{
                "type": "integer"
            },
            slug:{
                "type": "string"
            },
            name:{
                "type": "string"
            },
            description:{
                "type": "string"
            },
            products:{
                type: "array",
                items:{
                    "$ref": "#/components/schemas/Product"
                }                               
            },
            seo:{
                "$ref": "#/components/schemas/SEO"
            },
            url:{
                "type": "string"
            },
        }
    },
    "Shipping": {
        "type": "object",
        "properties": {
            mode:{
            "type": "integer"
            },
            address1:{
            "type": "string"
            },
            address2:{
            "type": "string"
            },
            city:{
            "type": "string"
            },
            country:{
            "type": "string"
            },
            postcode:{
            "type": "string"
            },
            status:{
            "type": "string"
            }
        }
    },   
    "Payment": {
        "type": "object",
        "properties": {
            mode:{
            "type": "integer"
            },
            gateway:{
            "type": "string"
            },
            status:{
            "type": "string"
            },
            transaction_id:{
            "type": "string"
            }, 
            transaction:{
            "$ref": "#/components/schemas/Transaction"
            },            
        }
    },    
    "Transaction": {
        "type": "object",
        "properties": {
            id:{
            "type": "integer"
            },
            onDate:{
            "type": "string"
            },
            note:{
            "type": "string"
            },                          
        }
    },           
    "OrderItem": {
        "type": "object",
        "properties": {
            id:{
            "type": "integer"
            },
            product_id:{
            "type": "integer"
            },
            name:{
            "type": "string"
            },
            description:{
            "type": "string"
            },
            sku:{
            "type": "string"
            },
            selling_price:{
            "type": "integer"
            },
            regular_price:{
            "type": "integer"
            },
            tax:{
            "type": "integer"
            },
            discount:{
            "type": "integer"
            },
            quantity:{
            "type": "integer"
            },
            total:{
            "type": "integer"
            },
            image:{
            "$ref": "#/components/schemas/Image"
            }
        }
    },
    "Test": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "traceId": {
                "type": "string"
            },
            "success": {
                "type": "boolean",
                "example": true
            },
            "showType": {
                "type": "integer",
                "example": 0
            },
            "errorCode": {
                "type": "string",
                "example": "SUCCESS"
            },
            "errorMessage": {
                "type": "string"
            },
            "host": {
                "type": "string"
            }
        }
    },
    "Product": {
        "type": "object",
        "properties": {
        id:{
            "type": "integer"
        },
        name:{
            "type": "string"
        }, 
        url:{
            "type": "string"
        },                
        image:{
            "$ref": "#/components/schemas/Image"
        }
        }
    },         
    "Image": {
        "type": "object",
        "properties": {
        name:{
            "type": "string"
        },
        imageUrl:{
            "type": "string"
        },
        thumbImageUrl:{
            "type": "string"
        }
        }
    },
    "Pagination": {
        "type": "object",
        "properties": {
        offset:{
            "type": "integer"
        },
        limit:{
            "type": "integer"
        },
        page:{
            "type": "integer"
        }
        }
    },
    "PriceRange": {
        "type": "object",
        "properties": {
        min:{
            "type": "integer"
        },
        max:{
            "type": "integer"
        },                
        }
    }, 
    "DateRange": {
        "type": "object",
        "properties": {
        start:{
            "type": "string"
        },
        end:{
            "type": "string"
        },                
        }
    },          
    "SEO": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "keywords": {
                "type": "string"
            },
            "imageUrl": {
                "type": "string"
            },
        }
    },
    "InfluencerCard": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "name": {
                "type": "string"
            },
            "imageUrl": {
                "type": "string"
            },
            "url": {
                "type": "string"
            },                            
        }
    },
    "BusinessCard": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "company_name": {
                "type": "string"
            },
            "imageUrl": {
                "type": "string"
            },
            "url": {
                "type": "string"
            },                            
        }
    },
    "PurchasedStats": {
        "type": "object",
        "properties": {
            "isLastPurchased": {
                "type": "boolean"
            },
            "lastPurchasedOn": {
                "type": "string"
            },                                       
        }
    },
    "CollabStats": {
        "type": "object",
        "properties": {
            "isRequested": {
                "type": "boolean"
            },
            "isAccepted": {
                "type": "boolean"
            },
            "requestedOn": {
                "type": "string"
            },
            "acceptedOn": {
                "type": "string"
            },                                                        
        }
    },
    "PromotionStats": {
        "type": "object",
        "properties": {
            "isLive": {
                "type": "boolean"
            },
            "isCompleted": {
                "type": "boolean"
            },
            "liveOn": {
                "type": "string"
            },  
            "completedOn": {
                "type": "string"
            },                                                                        
        }
    },
    "Instagram": {
        "type": "object",
        "properties": {
            "handle": {
                "type": "string"
            },
            "followers": {
                "type": "integer"
            },
            "isVerified": {
                "type": "boolean",
                "example": true
            }, 
            "story_budget": {
                "type": "integer",
                "example": 5000
            }, 
            "post_budget": {
                "type": "integer",
                "example": 5000
            },             
        }
    },    
    "Facebook": {
        "type": "object",
        "properties": {
            "handle": {
                "type": "string"
            },
            "followers": {
                "type": "integer"
            },
            "isVerified": {
                "type": "boolean",
                "example": true
            },            
        }
    },
    "Twitter": {
        "type": "object",
        "properties": {
            "handle": {
                "type": "string"
            },
            "followers": {
                "type": "integer"
            },
            "isVerified": {
                "type": "boolean",
                "example": true
            },           
        }
    },
    "Budget": {
        "type": "object",
        "properties": {            
            "instagram_story_budget": {
                "type": "integer",
                "example": 5000
            }, 
            "instagram_post_budget": {
                "type": "integer",
                "example": 5000
            }, 
            "facebook_post_budget": {
                "type": "integer",
                "example": 5000
            }, 
            "twitter_post_budget": {
                "type": "integer",
                "example": 5000
            },             
        }
    },
    "PaymentStats": {
        "type": "object",
        "properties": {
            "amount": {
                "type": "string"
            },
            "paidOn": {
                "type": "integer"
            },                      
        }
    },
    "Promotion": {
        "type": "object",
        "properties": {
            "status": {
                "type": "string"
            },
            "liveOn": {
                "type": "string"
            },
            "rejectedOn": {
                "type": "string"
            }, 
            "acceptedOn": {
                "type": "string"
            },
            "completedOn": {
                "type": "string"
            },                       
        }
    },
}
export default schema;