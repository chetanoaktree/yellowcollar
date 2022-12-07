
import { supabase } from '../../../util/supabaseClient'


export default async function handler(req, res) {
  //console.log(supabase)
  //console.log(req.body)
  /*if(req.body){
    req.body.name="name"
    req.body.message="message"
  }
  
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'demo@demo.gmail',
      pass: process.env.password,
    },
    secure: true,
  })
  
  const mailData = {
    from: 'demo@demo.com',
    to: 'your email',
    subject: `Message From ${req.body.name}`,
    text: req.body.message,
    html: <div>{req.body.message}</div>
  }

  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
  })
  console.log(process.env)*/
  //console.log(req)
  //res.status(200)
  
  let { data, error } = await supabase
  .from('subscription')
  .select('created_at')
  .eq('email', req.body.email)

  console.log("data", data)

  if(!data.length){
    try {
      const { data, error } = await supabase
      .from('subscription')
      .insert([
        { email: req.body.email, user_type: req.body.user_type },
      ], { upsert: true })

      
      if (error) {
        throw error
      }
      console.log("data", data)  
    } catch (error) {
      console.log('Error in email subscription: ', error.message)
    }
  }

  

  /*try {
    let { data, error } = await supabase
    .from('subscription')
    .select('email')
    
    if (error) {
      throw error
    }
    console.log("data", data)   
  } catch (error) {
    console.log('Error downloading image: ', error.message)
  }*/


  res.status(200).json({
    //env: process.env
    env:123
  });
}

