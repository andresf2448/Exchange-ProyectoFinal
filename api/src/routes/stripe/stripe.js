const router = require('express').Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


router.post('/', async (req, res) => {
    console.log('veamos que onda el req.body', req.body)
    const { currency, amount } = req.body
   
    let centavoAmount = amount * 100

    const params = {
        payment_method_types: ['card'],
        amount: centavoAmount,
        currency: currency,
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create(params)

        return res.send({clientSecret: paymentIntent.client_secret})

    } catch (error) {
        console.log(error)
        return res.status(400).send({error: {message: error.message}})

    }

})




module.exports = router;