import collaboration from './influencer/collaboration';
import notification from './influencer/notification';
import product from './influencer/product';
import promotion from './influencer/promotion';
import order from './influencer/order';
import id from './param/id';
const apis = {
  "/api/influencer/": {
    "post": {
      "tags": ["Influencer"],
      "summary": "get multiple Influencer",
      "description": "get multiple Influencer",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerFilters"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display Multiple Influencer",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Influencer"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/{id}": {
    "get": {
      "tags": ["Influencer"],
      "summary": "get Single Influencer",
      "description": "get Single Influencer",
      "parameters": [
          id,
      ],
      "responses": {
        "200": {
          "description": "display Single Influencer",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Influencer"
              }
            }
          }
        }
      },
    },
    "patch": {
      "tags": ["Influencer"],
      "summary": "update Single Influencer",
      "description": "update Single Influencer",
      "parameters": [
          id,
      ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerUpdate"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display Single Influencer",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Influencer"
              }
            }
          }
        }
      },
    }
  }, //influencer 
  ...product, 
  ...collaboration,    
  ...notification, 
  ...promotion, 
  ...order, 
}
export default apis;