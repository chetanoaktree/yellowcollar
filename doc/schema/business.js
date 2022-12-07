const schema = {
   "Business": {
        "type": "object",
        "properties": {
            "id": {
            "type": "integer"
            },
            "name": {
            "type": "string"
            },
            "bio": {
            "type": "string"
            },
            "email": {
            "type": "string"
            },
            "gst": {
            "type": "string"
            },
            "instagram": {
            "$ref": "#/components/schemas/Instagram"
            },
            "facebook": {
            "$ref": "#/components/schemas/Instagram"
            },
            "twitter": {
            "$ref": "#/components/schemas/Instagram"
            },            
        }
    },
    "BusinessFilters": {
        "type": "object",
        "properties": {
            "pagination": {
                "$ref": "#/components/schemas/Pagination"
            },
            "business_name": {
                "type": "string"
            },                                                             
        }
    },
    "BusinessCollaboration": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "business_id": {
                "type": "integer"
            },
            "type": {
                "type": "string"
            },
            "content": {
                "type": "string"
            },
            "payment": {
                "$ref": "#/components/schemas/PaymentStats"
            },
            "promotion": {
                "$ref": "#/components/schemas/Promotion"
            },  
            "created_at": {
                "type": "string"
            }, 
            "modified_at": {
                "type": "string"
            },               
        }
    },
    "BusinessCollaborationFilters": {
        "type": "object",
        "properties": {
            "pagination": {
                "$ref": "#/components/schemas/Pagination"
            },
            "product_name": {
                "type": "string"
            }, 
            "influencer_name": {
                "type": "string"
            }, 
            "products": {
                "$ref": "#/components/schemas/Products"
            },                                  
            "influencers": {
                "$ref": "#/components/schemas/Influencers"
            },                  
            "isAccepted": {
                "type": "boolean"
            },
            "isRejected": {
                "type": "boolean"
            },                  
            "product_name": {
                "type": "string"
            },                                                     
        }
    },
    "BusinessNotification": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "type": {
                "type": "string"
            },
            "date": {
                "type": "string"
            },
            "content": {
                "type": "string"
            },
            "formatted_content": {
                "type": "string"
            },
            "readOn": {
                "type": "string"
            },  
            "influencer_id": {
                "type": "integer"
            },                          
        }
    },
    "BusinessProduct": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "name": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "image": {
            "$ref": "#/components/schemas/Image" 
            },
            "images": {
                "type": "object"
            },
            "categories": {
            "$ref": "#/components/schemas/Category"              
            },
            "sku": {
                "type": "string"
            },
            "price": {
                "type": "integer"
            },
            "discount": {
                "type": "string"
            },
            "seo": {
                "$ref": "#/components/schemas/SEO"
            },
            "business": {
                "$ref": "#/components/schemas/BusinessCard"
            },
            "purchased": {
                "$ref": "#/components/schemas/PurchasedStats"                      
            },                  
            "created_at": {
                "type": "string"
            },                                      
        }
    },
    "BusinessProductFilters": {
        "type": "object",
        "properties": {
            "pagination": {
                "$ref": "#/components/schemas/Pagination"
            },                
            
            "product_name": {
                "type": "string"
            }, 
            "inflencer_name": {
                "type": "string"
            },                   
            "price_range": {
                "$ref": "#/components/schemas/PriceRange"
            },                                  
            "isPublished": {
                "type": "boolean"
            },
            "isCollaborated": {
                "type": "boolean"
            }, 
            "isPromoted": {
                "type": "boolean"
            },                                                                   
        }
    },
    "BusinessPromotion": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            }, 
            "collaboration_id": {
                "type": "integer"
            },                 
            "influencer": {
                "$ref": "#/components/schemas/InfluencerCard"
            },                  
            "product": {
                "$ref": "#/components/schemas/Product"
            },
            "status": {
                "type": "string"
            },
            "isAccepted": {
                "type": "boolean"
            },
            "isRejected": {
                "type": "boolean"
            },
            "isLive": {
                "type": "boolean"
            },
            "isCompleted": {
                "type": "boolean"
            },
            "isPaid": {
                "type": "boolean"
            },
            "rejectedOn": {
                "type": "string"
            },
            "acceptedOn": {
                "type": "string"
            },
            "liveOn": {
                "type": "string"
            },
            "completedOn": {
                "type": "integer"
            },
            "paidOn": {
                "type": "string"
            },                  
            "created_at": {
                "type": "string"
            },                                      
        }
    },
    "BusinessPromotionFilters": {
        "type": "object",
        "properties": {
            "pagination": {
                "$ref": "#/components/schemas/Pagination"
            }, 
            "product_name": {
                "type": "string"
            },
            "influencer_name": {
                "type": "string"
            },
            "products": {
                "$ref": "#/components/schemas/Products"
            },                 
            "influencers": {
                "$ref": "#/components/schemas/Influencers"
            },                  
            "isAccepted": {
                "type": "boolean"
            },
            "isRejected": {
                "type": "boolean"
            },
            "isCompleted": {
                "type": "boolean"
            },
            "isLive": {
                "type": "boolean"
            },
            "isPaid": {
                "type": "boolean"
            },                                                                     
        }
    },
    "BusinessSale": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "itemsCount": {
                "type": "integer"
            },
            "itemsTotal": {
                "type": "integer"
            },
            "itemsDiscount": {
                "type": "integer"
            },
            "ItemsTax": {
                "type": "integer"
            },
            "tax": {
                "type": "integer"
            },
            "discount": {
                "type": "integer"
            },
            "total": {
                "type": "integer"
            },
            "note": {
                "type": "string"
            }, 
            "items": {
                "$ref": "#/components/schemas/OrderItem"                      
            },                 
            "shipping": {
                "$ref": "#/components/schemas/Shipping"                      
            },
            "payment": {
                "$ref": "#/components/schemas/Payment"                      
            },
            "created_at": {
                "type": "string"
            }, 
            "modified_at": {
                "type": "string"
            },                                      
        }
    },
    "BusinessSaleFilters": {
        "type": "object",
        "properties": {
            "pagination": {
                "$ref": "#/components/schemas/Pagination"
            },
            "order_id": {
                "type": "string"
            },                 
            "product_name": {
                "type": "string"
            }, 
            "status": {
                "type": "string"
            },
            "shipping_status": {
                "type": "string"
            }, 
            "payment_status": {
                "type": "string"
            },
            "business_name": {
                "type": "string"
            },
            "date_range": {
                "$ref": "#/components/schemas/DateRange"
            },                   
            "price_range": {
                "$ref": "#/components/schemas/PriceRange"
            },                                                                 
        }
    }, 
}
export default schema;