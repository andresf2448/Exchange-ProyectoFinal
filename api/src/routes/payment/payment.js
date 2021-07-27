const router = require('express').Router();

require("dotenv").config();
const { REACT_APP_SUPABASE_PUBLIC_KEY, REACT_APP_SUPABASE_URL } = process.env;

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_PUBLIC_KEY
);

const main = require('./utilityTransaction')
const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');


router.post('/', async (req, res) => {
    const { sourceId, receiverId, amount, currency} = req.body

    let sourceSecretKey

    if (sourceId === 1) {
        const {data} = await supabase
        .from('rocketWallet')
        .select('stellarSecretKey')
        console.log(data)
        sourceSecretKey = data[0].stellarSecretKey
    } else {
        const {data} = await supabase
        .from('wallet')
        .select('secret_key')
        .eq('id_user', sourceId)
        sourceSecretKey = data[0].secret_key
    }

    const {data} = await supabase
    .from('datauser')
    .select('public_key')
    .eq('id_user', receiverId)

    const receiverPublicKey = data[0].public_key
    
    if(amount < 1 || amount === '') return res.status(400).json({message: 'Invalid amount'})

    var sourceKeypair

    try {
        sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
        
    } catch (error) {
        return res.status(400).json({message: 'Invalid secretKey', error: error})
    }
    
    const sourcePublicKey = sourceKeypair.publicKey();

  
    const amount_out = amount * 0.95

    const amountToClient = amount_out * 3.732

    let transaction = await main(sourcePublicKey, sourceKeypair, receiverPublicKey, amountToClient.toString())

    if (transaction.isError && transaction.message === 'Invalid account') return res.status(400).json({ message: transaction.message, error: transaction.error  })
    if (transaction.isError) return res.status(500).json({ message: transaction.message, error: transaction.error  })
    
    return res.json(transaction.transactionLink)

    
})


module.exports = router;