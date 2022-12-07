const apis = {
  "/api/business/collab": {
    "post": {
      "tags": ["Business Collaboration"],
      "summary": "Display multiple Business collaboration",
      "description": "Display multiple  Business collaboration",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessCollaborationFilters"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "Display multiple  Business Collaboration 2",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessCollaboration"
              }
            }
          }
        }
      },
    }
  },
  "/api/business/collab/new": {
    "post": {
      "tags": ["Business Collaboration"],
      "summary": "Create Single Business collaboration",
      "description": "Create Single Business collaboration",
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/BusinessCollaboration"
            }
          }
        },
        "required": true
      },
      "responses": {
        "200": {
          "description": "display created Single Business Collaboration 2",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BusinessCollaboration"
              }
            }
          }
        }
      },
    }
  },  
  "/api/business/collab/{id}": {
    "get": {
      "tags": ["Business Collaboration"],
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
                "$ref": "#/components/schemas/BusinessCollaboration"
              }
            }
          }
        }
      },
    }
  }, //Business        
}
export default apis;