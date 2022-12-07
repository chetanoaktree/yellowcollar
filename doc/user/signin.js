import id from '../param/id';
import offset from '../param/offset';
import limit from '../param/limit';
const requestBody={
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/Signin"
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
const apis = {
  "/api/user/signin": {
    "post": {
      "tags": ["User"],
      "summary": "Signin User",
      "description": "Signin User",
      "requestBody": requestBody,
      "responses": {
        "200": response200
      },
    }
  }, 
}
export default apis;
