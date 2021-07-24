const router = require("express").Router();
var nodemailer = require("nodemailer");
require("dotenv").config();
const { pass } = process.env;

router.post("/", (req, res) => {
  const {sendEmail, inviteEmail} = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rocketexchange1@gmail.com",
      pass: pass,
    },
  });

  var mailOptions = {
    from: "rocketexchange1@gmail.com",
    to: `${inviteEmail}`,
    subject: "subscription invitation",
    html: `${sendEmail} is inviting you to subscribe to RocketExChange (pagina en deploy)`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
});

module.exports = router;
