const router = require("express").Router();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

router.get('/', (req, res) => {
  const { code, number } = req.query
  try {
    client.messages
      .create({
        body: `your RocketExchange verification code is ${code}`,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+${number}`
      })
      .then(message => console.log(message.sid))
      .done();
    res.send('done')
  } catch (err) {
    res.send(err)
  }
})

module.exports = router;