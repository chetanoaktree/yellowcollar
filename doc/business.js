import collaboration from './business/collaboration';
import notification from './business/notification';
import product from './business/product';
import promotion from './business/promotion';
import sale from './business/sale';
import id from './param/id';
const apis = {
  "/api/business/": {
    "post": {
      "tags": ["Business"],
      "summary": "Display Multiple Business",
      "description": "Display Multiple  Business",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessFilters"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Display Multiple Business",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Business"
              }
            }
          }
        }
      },
    }
  },
  "/api/business/new": {
    "post": {
      "tags": ["Business"],
      "summary": "Create Single Business",
      "description": "Create Single Business",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Business"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Business",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Business"
              }
            }
          }
        }
      },
    },
  },
  "/api/business/{id}": {
    "get": {
      "tags": ["Business"],
      "summary": "get Single Business",
      "description": "get Single Business",
      "parameters": [
          id,
      ],
      "responses": {
        "200": {
          "description": "display Single Business",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Business"
              }
            }
          }
        }
      },
    },
    "patch": {
      "tags": ["Business"],
      "summary": "Update Single Business",
      "description": "Update Single Business",
      "parameters": [
          id,
      ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Business"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display Update Single Business",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Business"
              }
            }
          }
        }
      },
    }
  }, //Business    
  ...product,  
  ...collaboration,    
  ...notification,
  ...promotion,
  ...sale,  
}
export default apis;