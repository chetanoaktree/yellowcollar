const schema = {
   "Influencer": {
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
          "instagram": {
            "$ref": "#/components/schemas/Instagram"
          },
          "facebook": {
            "$ref": "#/components/schemas/Facebook"
          },
          "twitter": {
            "$ref": "#/components/schemas/Twitter"
          },
          "budget": {
            "$ref": "#/components/schemas/Budget"
          },            
      }
  },
  "InfluencerFilters": {
      "type": "object",
      "properties": {
          "pagination": {
              "$ref": "#/components/schemas/Pagination"
          },
          "influencer_name": {
              "type": "string"
          }, 
          "verified": {
              "type": "boolean"
          }, 
          "instagram_verified": {
              "type": "boolean"
          }, 
          "facebook_verified": {
              "type": "boolean"
          }, 
          "twitter_verified": {
              "type": "boolean"
          }, 
          "min_instagram_followers": {
              "type": "integer"
          }, 
          "min_twitter_followers": {
              "type": "integer"
          }, 
          "min_facebook_followers": {
              "type": "integer"
          }, 
          "min_engagement_percentage": {
              "type": "integer"
          }, 
          "max_instagram_story_budget": {
              "type": "integer"
          }, 
          "max_instagram_post_budget": {
              "type": "integer"
          }, 
          "max_twitter_budget": {
              "type": "integer"
          }, 
          "max_facebook_budget": {
              "type": "integer"
          },                                         
      }
  },
  "InfluencerProduct": {
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
          "collab": {
              "$ref": "#/components/schemas/CollabStats"                      
          },
          "created_at": {
              "type": "string"
          },                                      
      }
  },
  "InfluencerUpdate": {
      "type": "object",
      "properties": {                  
          "name": {
              "type": "string"
          },
          "description": {
              "type": "string"
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
          "created_at": {
              "type": "string"
          },                                      
      }
  },
  "InfluencerProductFilters": {
      "type": "object",
      "properties": {
          "pagination": {
              "$ref": "#/components/schemas/Pagination"
          },                
          "product_name": {
              "type": "string"
          }, 
          "business_name": {
              "type": "string"
          },                   
          "price_range": {
              "$ref": "#/components/schemas/PriceRange"
          },
          "isCollaborated": {
              "type": "boolean"
          }, 
          "isPromoted": {
              "type": "boolean"
          },                                                                   
      }
  },
  "InfluencerOrder": {
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
          "status": {
              "type": "string"
          }, 
          "created_at": {
              "type": "string"
          }, 
          "modified_at": {
              "type": "string"
          },                                      
      }
  },
  "InfluencerOrderFilters": {
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
  "InfluencerCollaboration": {
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
  "InfluencerNotification": {
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
          "business_id": {
              "type": "integer"
          },                          
      }
  },
  "InfluencerPromotion": {
      "type": "object",
      "properties": {
          "id": {
              "type": "integer"
          },
          "collaboration_id": {
              "type": "integer"
          },
          "business": {
              "$ref": "#/components/schemas/BusinessCard"
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
  "InfluencerPromotionFilters": {
      "type": "object",
      "properties": {
          "pagination": {
              "$ref": "#/components/schemas/Pagination"
          },                 
          "product_name": {
              "type": "string"
          }, 
          "business_name": {
              "type": "string"
          },
          "products": {
              "$ref": "#/components/schemas/Products"
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
}
export default schema;