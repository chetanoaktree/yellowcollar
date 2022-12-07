import id from '../param/id';
const apis = {
  "/api/influencer/product": {
    "post": {
      "tags": ["Influencer Product"],
      "summary": "Display Multiple Influencer Product",
      "description": "Display Multiple Influencer Product",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerProductFilters"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Display Multiple Influencer Product",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerProduct"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/product/new": {
    "post": {
      "tags": ["Influencer Product"],
      "summary": "Create Single Influencer Product",
      "description": "Create Single Influencer Product",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerProduct"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Influencer Product 2",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerProduct"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/product/{id}": {
    "get": {
      "tags": ["Influencer Product"],
      "summary": "get Single Product",
      "description": "get Single Product",
      "parameters": [
          id,
      ],
      "responses": {
        "200": {
          "description": "display Single Product",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerProduct"
              }
            }
          }
        }
      },
    },
    "patch": {
      "tags": ["Influencer Product"],
      "summary": "update Single Product",
      "description": "update Single Product",
      "parameters": [
          id,
      ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerProduct"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display Single Product",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerProduct"
              }
            }
          }
        }
      },
    }
  }, //Influencer        
}
export default apis;