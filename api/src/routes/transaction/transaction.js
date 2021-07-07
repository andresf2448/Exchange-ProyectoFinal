const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const router = require('express').Router();
const {main} = require('./utilityTransaction')


router.post('/transaction', (req, res) => {
    const { sourceSecretKey, receiverPublicKey, amount} = req.body

    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    main(sourcePublicKey, amount)
})




module.exports = router;