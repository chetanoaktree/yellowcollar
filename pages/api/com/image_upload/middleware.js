import  nextConnect  from  'next-connect';
import  multipartFormParser  from  './multipart_form_parser';

const  middleware = nextConnect();

middleware.use(multipartFormParser)

export  default  middleware;