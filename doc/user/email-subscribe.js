import id from '../param/id';
import offset from '../param/offset';
import limit from '../param/limit';
const requestBody={
  "content": {
    "application/json": {
      "schema": {
        "$ref": "#/components/schemas/EmailSubscribeReq"
      }
    }
  },
  "required": true
};
const response200={
  "description": "Email Subscription Successfull",  
};
const apis = {
  "/api/user/email-subscribe": {
    "post": {
      "tags": ["User"],
      "summary": "Email Subscribe",
      "description": "Email Subscribe",
      "requestBody": requestBody,
      "responses": {
        "200": response200
      },
    }
  },  
}
export default apis;