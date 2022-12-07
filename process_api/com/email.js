import nodemailer from 'nodemailer'
import {compile_template} from './handlebars'
import fs from 'fs'


var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
           callback(err); 
           throw err;
            
        }
        else {
            callback(null, html);
        }
    });
};


const template = (data) => {

    var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>"    

    var data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]}

    var result = compile_template({source, data})
    
    return result

}
const test_email = () => {
    //let testAccount = await nodemailer.createTestAccount();
    var replacements = {
         username: "John Doe"
    };
    var htmlToSend = template(replacements);  

    let info = {
        from: '"Yellow Collar 👻" <no-reply@yellowcollar.club>', // sender address
        to: "syedmuheethazam@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: htmlToSend, // html body
    };  
    console.log("INFO", info)
    return info    
}
const send_email = async ({info, test=false}) => {  
    //console.log("ENV", process.env.NOREPLYPW)  
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        //secureConnection: false,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: process.env.NOREPLYEMAIL, // generated ethereal user
            pass: process.env.NOREPLYPW, // generated ethereal password
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    if(test==true){
        info=test_email()
    }

    let info_res = await transporter.sendMail(info);
    //console.log("transporter", transporter)
    //console.log("INFO", info_res)
    
    return info_res
}

export {
    send_email
}
