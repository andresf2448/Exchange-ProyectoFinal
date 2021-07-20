const router = require("express").Router();
var nodemailer = require('nodemailer');
const supabase = require("../../supabase/supabase");

router.post('/', (req,res) => {
    const {receivers, message} = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rocketexchange1@gmail.com',
          pass: 'Correo*2020'
        }
      });
    
      var mailOptions = {
        from: 'rocketexchange1@gmail.com',
        to: `${receivers}`,
        subject: 'Asunto Del Correo',
        html: `${message}`
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
})

module.exports = router;