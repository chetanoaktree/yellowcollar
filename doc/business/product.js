import id from '../param/id';
const apis = {
  "/api/business/product": {
    "post": {
      "tags": ["Business Product"],
      "summary": "Display Multiple Business Product",
      "description": "Display Multiple Business Product",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessProductFilters"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Display Multiple Business Product",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessProduct"
              }
            }
          }
        }
      },
    }
  },
  "/api/business/product/new": {
    "post": {
      "tags": ["Business Product"],
      "summary": "Create Single Business Product",
      "description": "Create Single Business Product",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessProduct"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Business Product 2",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessProduct"
              }
            }
          }
        }
      },
    }
  },
  "/api/business/product/{id}": {
    "get": {
      "tags": ["Business Product"],
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
                "$ref": "#/components/schemas/BusinessProduct"
              }
            }
          }
        }
      },
    },
    "patch": {
      "tags": ["Business Product"],
      "summary": "update Single Product",
      "description": "update Single Product",
      "parameters": [
          id,
      ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessProduct"
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
                "$ref": "#/components/schemas/BusinessProduct"
              }
            }
          }
        }
      },
    },
    "delete": {
      "tags": ["Business Product"],
      "summary": "Delete Single Product",
      "description": "Delete Single Product",
      "parameters": [
          id,
      ],      
      "responses": {
        "200": {
          "description": "Delete Product Successfull",          
        }
      },
    }
  }, //Business        
}
export default apis;