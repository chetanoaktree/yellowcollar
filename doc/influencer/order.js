import id from '../param/id';
const apis = {
  "/api/influencer/order": {
    "post": {
      "tags": ["Influencer Order"],
      "summary": "Display Multiple Influencer Order",
      "description": "Display Multiple Influencer Order",     
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerOrderFilters"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Display Multiple Influencer Order",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerOrder"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/order/new": {
    "post": {
      "tags": ["Influencer Order"],
      "summary": "Create Single Influencer Order",
      "description": "Create Single Influencer Order",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerOrder"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Influencer Order",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerOrder"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/order/{id}": {
    "get": {
      "tags": ["Influencer Order"],
      "summary": "get Single Order",
      "description": "get Single Order",
      "parameters": [
          id,
      ],
      "responses": {
        "200": {
          "description": "display Single Order",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerOrder"
              }
            }
          }
        }
      },
    },
    "patch": {
      "tags": ["Influencer Order"],
      "summary": "Update Single Order",
      "description": "Update Single Order",
      "parameters": [
        id       
      ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerOrder"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Update Single Order",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerOrder"
              }
            }
          }
        }
      },
    }
  }, //Influencer        
}
export default apis;