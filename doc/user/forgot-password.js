import id from '../param/id';
import offset from '../param/offset';
import limit from '../param/limit';
const requestBody={
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/ForgotPasswordReq"
      }
    }
  },
  "required": true
};
const response200={
  "description": "New Password Sent to your email",
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/ForgotPasswordRes"
      }
    }
  }
};
const apis = {
  "/api/user/forgot-password": {
    "post": {
      "tags": ["User"],
      "summary": "Forgot Passwordr",
      "description": "Forgot Password",
      "requestBody": requestBody,
      "responses": {
        "200": response200
      },
    }
  },  
}
export default apis;