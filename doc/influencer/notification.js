const apis = {
  "/api/influencer/notification": {
    "post": {
      "tags": ["Influencer Notification"],
      "summary": "Create Single Influencer Notification",
      "description": "Create Single Influencer Notification",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InfluencerNotification"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Influencer Notification 2",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerNotification"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/notification/{id}": {
    "get": {
      "tags": ["Influencer Notification"],
      "summary": "get Single Influencer Notification",
      "description": "get Single Influencer Notification",
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
                "$ref": "#/components/schemas/InfluencerNotification"
              }
            }
          }
        }
      },
    }
  }, //Business        
}
export default apis;