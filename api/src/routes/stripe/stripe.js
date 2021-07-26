const router = require('express').Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


router.post('/', async (req, res) => {
    
    const { currency, amount } = req.body
    console.log(currency)
    console.log(amount)
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
        
        return res.status(400).send({error: {message: error.message}})

    }

})




module.exports = router;
