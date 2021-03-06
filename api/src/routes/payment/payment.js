const router = require('express').Router();

require("dotenv").config();
const { REACT_APP_SUPABASE_PUBLIC_KEY, REACT_APP_SUPABASE_URL } = process.env;

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_PUBLIC_KEY
);

const {main, feeCalculator, calculatePrice} = require('./utilityTransaction')
const StellarSdk = require('stellar-sdk');



router.post('/', async (req, res) => {
    const { sourceId, receiverId, amount, currency, crypto} = req.body

    let sourceSecretKey
    let payFee = false
    let receiverRocket = false
    
    if (sourceId === 'rocket') {
        
        const {data} = await supabase
        .from('rocketWallet')
        .select('stellarSecretKey')
        
        sourceSecretKey = data[0].stellarSecretKey            

        
    } else {
        const {data} = await supabase
        .from('wallet')
        .select('secret_key')
        .eq('id_user', sourceId)
        sourceSecretKey = data[0].secret_key
        
        payFee = true
    }

    let receiverPublicKey
    if(receiverId === 'rocket') {
        const {data} = await supabase
        .from('rocketWallet')
        .select('stellarPublicKey')
        payFee = false
        receiverRocket = true
        receiverPublicKey = data[0].stellarPublicKey   

    } else {
        const {data} = await supabase
        .from('datauser')
        .select('public_key')
        .eq('id_user', receiverId)
    
        receiverPublicKey = data[0].public_key


    }

    
    if(amount < 1 || amount === '') return res.status(400).json({message: 'Invalid amount'})

    var sourceKeypair

    try {
        sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
        
    } catch (error) {
        return res.status(400).json({message: 'Invalid secretKey', error: error})
    }
    
    const sourcePublicKey = sourceKeypair.publicKey();

    let {amount_out, fee, percentage} = await feeCalculator(amount)
    
    let transaction

    if( crypto ) {
        amount_out = await calculatePrice(amount_out, currency, crypto)
        transaction = await main(sourcePublicKey, sourceKeypair, receiverPublicKey, amount_out.toString(), crypto)
    } else if(receiverRocket) {
        amount_out = amount_out + fee
        transaction = await main(sourcePublicKey, sourceKeypair, receiverPublicKey, amount_out.toString(), currency)

    } else {
        transaction = await main(sourcePublicKey, sourceKeypair, receiverPublicKey, amount_out.toString(), currency)

    }
      

    if(payFee) {
        let {data} = await supabase
        .from('rocketWallet')
        .select('stellarPublicKey')
        let feeReceiverPublicKey = data[0].stellarPublicKey

        let transactionFee = await main(sourcePublicKey, sourceKeypair, feeReceiverPublicKey, fee.toString(), currency)
        
        if (transactionFee.isError && transactionFee.message === 'Invalid account') return res.status(400).json({ message: transaction.message, error: transaction.error  })
        if (transactionFee.isError) return res.status(500).json({ message: transaction.message, error: transaction.error  })
    }
    
    
    if (transaction.isError && transaction.message === 'Invalid account') return res.status(400).json({ message: transaction.message, error: transaction.error  })
    if (transaction.isError) return res.status(500).json({ message: transaction.message, error: transaction.error  })
    
    return res.json({message: 'succeeded', amount: amount_out, fee: fee, feePercentage: percentage, currency: currency })

})


module.exports = router;
