const router = require("express").Router();

const accountSid = 'ACa0258709913f5d8e1b1961ac5433e06e';
const authToken = '6e8df5ffa6f8d3b249c11810f1f418f7';
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