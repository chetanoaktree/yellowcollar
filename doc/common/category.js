import id from '../param/id';
import getItems from '../param/getItems';
import getExtra from '../param/getExtra';
import offset from '../param/offset';
import limit from '../param/limit';
const requestBody={
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/Category"
      }
    }
  },
  "required": true
};
const response200={
  "description": "Display Category",
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/Category"
      }
    }
  }
};

const apis = {
  "/api/com/category": {
    "post": {
      "tags": ["Category"],
      "summary": "Create Single Category",
      "description": "Create Single Category",
      "requestBody": requestBody,
      "responses": {
        "200": response200
      },
    }
  },
  "/api/com/category/new": {
    "post": {
      "tags": ["Category"],
      "summary": "Create Single Category",
      "description": "Create Single Category",     
      "responses": {
        "200": response200
      },
    },    
  }, //influencer 
  "/api/com/category/{id}": {
    "get": {
      "tags": ["Category"],
      "summary": "get Single Category",
      "description": "get Single Category",
      "parameters": [
          id, getItems, getExtra, offset, limit
      ],
      "responses": {
        "200": response200
      },
    },
    "patch": {
      "tags": ["Category"],
      "summary": "update Single Category",
      "description": "update Single Category",
      "parameters": [
          id
      ],
      "requestBody": requestBody,
      "responses": {
        "200": response200
      },
    },
    "delete": {
      "tags": ["Category"],
      "summary": "delete Single Category",
      "description": "delete Single Category",
      "parameters": [
          id
      ],
      "responses": {
        "200": {
          "description": "Category Deleted",          
        }
      },
    },
  }, //influencer        
}
export default apis;

