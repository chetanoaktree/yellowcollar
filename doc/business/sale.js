import id from '../param/id';
const response200={
  "description": "Display Multiple Business Sale",
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/BusinessSale"
      }
    }
  }
};
const requestBody={
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/BusinessSaleFilters"
      }
    }
  },
  "required": true
};

const apis = {
  "/api/business/sale": {
    "post": {
      "tags": ["Business Sale"],
      "summary": "Display Multiple Business Sale",
      "description": "Display Multiple Business Sale",     
      "requestBody": requestBody,
      "responses": {
        "200": response200,
      },
    }
  },
  "/api/business/sale/new": {
    "post": {
      "tags": ["Business Sale"],
      "summary": "Create Single Business Sale",
      "description": "Create Single Business Sale",
      "requestBody": requestBody,
      "responses": {
        "200": response200,
      },
    }
  },
  "/api/business/sale/{id}": {
    "get": {
      "tags": ["Business Sale"],
      "summary": "get Single Sale",
      "description": "get Single Sale",
      "parameters": [
          id,
      ],
      "responses": {
        "200": response200,
      },
    },
    "patch": {
      "tags": ["Business Sale"],
      "summary": "Update Single Sale",
      "description": "Update Single Sale",
      "parameters": [
        id       
      ],
      "requestBody": requestBody,
      "responses": {
        "200": response200,
      },
    }
  }, //Business        
}
export default apis;