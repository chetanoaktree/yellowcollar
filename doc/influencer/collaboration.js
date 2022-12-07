const apis = {
  "/api/influencer/collab": {
    "post": {
      "tags": ["Influencer Collaboration"],
      "summary": "Create Single collaboration",
      "description": "Create Single collaboration",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {              
              "$ref": "#/components/schemas/InfluencerCollaboration"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Collaboration",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerCollaboration"
              }
            }
          }
        }
      },
    }
  },
  "/api/influencer/collab/{id}": {
    "get": {
      "tags": ["Influencer Collaboration"],
      "summary": "get Single collaboration",
      "description": "get Single collaboration",
      "parameters": [
          {
              "name": "id",
              "in": "path",
              "description": "The collaboration id in Platovise system",
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
          "description": "display Single collaboration",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InfluencerCollaboration"
              }
            }
          }
        }
      },
    }
  }, //influencer        
}
export default apis;