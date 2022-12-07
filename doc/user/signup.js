import id from '../param/id';
import offset from '../param/offset';
import limit from '../param/limit';
const requestBody={
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/Signup"
      }
    }
  },
  "required": true
};
const response200={
  "description": "Display User",
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/Signup"
      }
    }
  }
};
const inResponse200={
  "description": "Display Influencer User",
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/Signup"
      }
    }
  }
};
const buResponse200={
  "description": "Display Business User",
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/Signup"
      }
    }
  }
};

const apis = {
  "/api/user/signup": {
    "post": {
      "tags": ["User"],
      "summary": "Signup User",
      "description": "Signup User",
      "requestBody": requestBody,
      "responses": {
        "200": response200
      },
    }
  },
  "/api/user/signup/verify-email/": {
    "post": {
      "tags": ["User"],
      "summary": "Email Verification",
      "description": "Email Verification",
      "requestBody": requestBody,
      "responses": {
        "200": inResponse200
      },
    }
  }, 
  "/api/user/signup/influencer/": {
    "post": {
      "tags": ["User"],
      "summary": "Influencer Signup User",
      "description": "Influencer Signup User",
      "requestBody": requestBody,
      "responses": {
        "200": inResponse200
      },
    }
  }, 
  "/api/user/signup/business/": {
    "post": {
      "tags": ["User"],
      "summary": "Business Signup User",
      "description": "Business Signup User",
      "requestBody": requestBody,
      "responses": {
        "200": buResponse200
      },
    }
  },       
}
export default apis;