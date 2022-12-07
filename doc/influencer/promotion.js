const apis = {
  "/api/influencer/promotion": {
    "post": {
      "tags": ["Influencer Promotion"],
      "summary": "Display Multiple Influencer Promotion",
      "description": "Display Multiple Influencer Promotion",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerPromotionFilters"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Display Multiple Influencer Promotion 2",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerPromotion"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/promotion/new": {
    "post": {
      "tags": ["Influencer Promotion"],
      "summary": "Create Single Influencer Promotion",
      "description": "Create Single Influencer Promotion",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerPromotion"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Influencer Promotion 2",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerPromotion"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/promotion/{id}": {
    "get": {
      "tags": ["Influencer Promotion"],
      "summary": "get Single Promotion",
      "description": "get Single Promotion",
      "parameters": [
          {
              "name": "id",
              "in": "path",
              "description": "The Promotion id in Platovise system",
              "required": true,
              "style": "simple",
              "schema": {
                  "type": "integer"
              },
              "example": 39000452
          }
      ],
      "responses": {
        "200": {
          "description": "display Single Promotion",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerPromotion"
              }
            }
          }
        }
      },
    }
  }, //Influencer        
}
export default apis;