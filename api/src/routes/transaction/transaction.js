const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const router = require('express').Router();
const main = require('./utilityTransaction')


router.post('/transaction', async (req, res) => {
    const { sourceSecretKey, receiverPublicKey, amount} = req.body

    if(amount < 1 || amount === '') return res.status(400).json({message: 'Invalid amount'})

    var sourceKeypair

    try {
        sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
        
    } catch (error) {
        return res.status(400).json({message: 'Invalid secretKey', error: error})
    }
    
    
    
    const sourcePublicKey = sourceKeypair.publicKey();

    let transaction = await main(sourcePublicKey, sourceKeypair, receiverPublicKey, amount)

    if (transaction.isError && transaction.message === 'Invalid account') return res.status(400).json({ message: transaction.message, error: transaction.error  })
    if (transaction.isError) return res.status(500).json({ message: transaction.message, error: transaction.error  })
    
    return res.json(transaction.transactionLink)

    
})




module.exports = router;