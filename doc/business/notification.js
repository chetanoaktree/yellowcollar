const apis = {
  "/api/business/notification": {
    "post": {
      "tags": ["Business Notification"],
      "summary": "Create Single Business Notification",
      "description": "Create Single Business Notification",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessNotification"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Business Notification 2",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessNotification"
              }
            }
          }
        }
      },
    }
  },
  "/api/business/notification/{id}": {
    "get": {
      "tags": ["Business Notification"],
      "summary": "get Single Notification",
      "description": "get Single Notification",
      "parameters": [
          {
              "name": "id",
              "in": "path",
              "description": "The Notification id in Platovise system",
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
          "description": "display Single Notification",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessNotification"
              }
            }
          }
        }
      },
    }
  }, //Business        
}
export default apis;