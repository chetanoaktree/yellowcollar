import id from '../param/id';
import offset from '../param/offset';
import limit from '../param/limit';
const requestBody={
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/ChangePasswordReq"
      }
    }
  },
  "required": true
};
const response200={
  "description": "Change Password Successfull",  
};
const apis = {
  "/api/user/change-password": {
    "post": {
      "tags": ["User"],
      "summary": "Change Password",
      "description": "Change Password",
      "requestBody": requestBody,
      "responses": {
        "200": response200
      },
    }
  },  
}
export default apis;