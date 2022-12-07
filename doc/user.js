import signup from './user/signup';
import signin from './user/signin';
import forgotPassowrd from './user/forgot-password';
import emailSubscribe from './user/email-subscribe';
import changePassword from './user/change-password';
const apis = {  
  ...signup,
  ...signin,
  ...forgotPassowrd,
  ...emailSubscribe,
  ...changePassword,
}
export default apis;