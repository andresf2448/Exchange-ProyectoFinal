const router = require("express").Router();
var nodemailer = require("nodemailer");
require("dotenv").config();
const { pass } = process.env;

router.post("/", (req, res) => {
  const { receivers, message, title } = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rocketexchange1@gmail.com",
      pass: pass,
    },
  });

  var mailOptions = {
    from: "rocketexchange1@gmail.com",
    to: `${receivers}`,
    subject: `${title}`,
    html: `${message}`,
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
