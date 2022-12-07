import id from '../param/id';
const apis = {
  "/api/business/promotion": {
    "post": {
      "tags": ["Business Promotion"],
      "summary": "Display Multiple Business Promotion",
      "description": "Display Multiple Business Promotion",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessPromotionFilters"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Display Multiple Business Promotion",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessPromotion"
              }
            }
          }
        }
      },
    }
  },
  "/api/business/promotion/new": {
    "post": {
      "tags": ["Business Promotion"],
      "summary": "Create Single Business Promotion",
      "description": "Create Single Business Promotion",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessPromotion"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Business Promotion",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessPromotion"
              }
            }
          }
        }
      },
    }
  },
  "/api/business/promotion/{id}": {
    "get": {
      "tags": ["Business Promotion"],
      "summary": "get Single Promotion",
      "description": "get Single Promotion",
      "parameters": [
          id
      ],
      "responses": {
        "200": {
          "description": "display Single Promotion",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessPromotion"
              }
            }
          }
        }
      },
    },
    "patch": {
      "tags": ["Business Promotion"],
      "summary": "Update Single Promotion",
      "description": "Update Single Promotion",
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
                "$ref": "#/components/schemas/BusinessPromotion"
              }
            }
          }
        }
      },
    }
  }, //Business        
}
export default apis;