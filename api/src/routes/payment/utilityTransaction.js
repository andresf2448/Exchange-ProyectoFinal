const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

require("dotenv").config();
const { REACT_APP_SUPABASE_PUBLIC_KEY, REACT_APP_SUPABASE_URL } = process.env;

const { createClient } = require("@supabase/supabase-js");
const { Asset } = require('stellar-sdk');
const { default: axios } = require('axios');
const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_PUBLIC_KEY
);

const main = async function (sourcePublicKey, sourceKeypair, receiverPublicKey, amount, currency) {
    // Transactions require a valid sequence number that is specific to this account.
    // We can fetch the current sequence number for the source account from Horizon.
    
    let asset

    if(currency.toUpperCase() === 'USDR') {
        asset = new Asset('USDR', 'GC6ODYBY4FY2VRF3NC3ASXLQ5Y3WKALMEQ4S4Y2OJBVREG3TO2VPZZC6')
    
    } else if (currency.toUpperCase() === 'SRT') {
        asset = new Asset('SRT', 'GCDNJUBQSX7AJWLJACMJ7I4BC3Z47BQUTMHEICZLE6MU4KQBRYG5JY6B')

    } else if (currency.toUpperCase() === 'USDC') {
        asset = new Asset('USDC', 'GC5W3BH2MQRQK2H4A6LP3SXDSAAY2W2W64OWKKVNQIAOVWSAHFDEUSDC')

    } else if (currency.toUpperCase() === 'ARST') {
        asset = new Asset('ARST', 'GB7TAYRUZGE6TVT7NHP5SMIZRNQA6PLM423EYISAOAP3MKYIQMVYP2JO')

    } else if (currency.toUpperCase() === 'ETH') {
        asset = new Asset('ETH', 'GBMMZMK2DC4FFP4CAI6KCVNCQ7WLO5A7DQU7EC7WGHRDQBZB763X4OQI')

    } else if (currency.toUpperCase() === 'POAT') {
        asset = new Asset('POAT', 'GAECL2FYQAMR2YFVCMOBBAIOOZGEAER6HART2MW7JWGNRDN53Q3S2WOB')

    } else if (currency.toUpperCase() === 'XLM') {
        asset = StellarSdk.Asset.native()

    } else if (currency.toUpperCase() === 'ARSR') {
        asset = new Asset('ARSR', 'GCHMQERSYAEIXDGRQLZZPXOLCZZLN535HWYC6ARIGSKZ2DKV4YQHJ6AB')

    } else if (currency.toUpperCase() === 'EURR') {
        asset = new Asset('EURR', 'GC3EFAUIEISOQ55SBNYHRRAI2DKUOLABSSMAXETE2BVLD3LLYEU5KGKH')

    }   else if (currency.toUpperCase() === 'HENRYCOIN') {
        asset = new Asset('HenryCoin', 'GDJX4IPQFAZRSBNA7ZM456O226SPZV33VCOZFFO4HE3NMH6JOZE66OAM')

    }
     console.log('El aset EURR',asset)
    
    
    const account = await server.loadAccount(sourcePublicKey);
      

    // Right now, there's one function that fetches the base fee.
    const fee = await server.fetchBaseFee();

    var transaction

    try {

    transaction = new StellarSdk.TransactionBuilder(account, {
        fee,
        // Uncomment the following line to build transactions for the live network. Be
        // sure to also change the horizon hostname.
        // networkPassphrase: StellarSdk.Networks.PUBLIC,
        networkPassphrase: StellarSdk.Networks.TESTNET
    })
  
        // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.payment({
            destination: receiverPublicKey,
            // The term native asset refers to lumens
            asset: asset,
            amount: amount // amount is a string with the amout to transfer
        }))

        // Make this transaction valid for the next 30 seconds only
        .setTimeout(30)
        // Uncomment to add a memo (https://www.stellar.org/developers/guides/concepts/transactions.html)
        .addMemo(StellarSdk.Memo.text('Hello world!'))

        .build();

         // Sign this transaction with the secret key
    transaction.sign(sourceKeypair);

    transaction.toEnvelope().toXDR('base64')

    } catch (e) {
        return {
            isError: true,
            error: e,
            message: 'Invalid account'
        }
    }

    try {
        const transactionResult = await server.submitTransaction(transaction);
        return {
            transactionResult: JSON.stringify(transactionResult, null, 2),
            transactionLink: transactionResult._links.transaction.href,
            isError: false
        }
        
    } catch (e) {
        return {
            isError: true,
            error: e,
            message: 'An error has occured'

        }
    }
}

const feeCalculator = async (amount) => {
    const {data} = await supabase
    .from('commsion_server')
    
    let amount_fee = parseFloat(amount) * (data[data.length - 1].percentage / 100)
    
    let amount_out = parseFloat(amount) - amount_fee

    return {amount_out: amount_out.toString(), fee: amount_fee.toString(), percentage: data[data.length - 1].percentage }

}

const calculatePrice = async (amount_out, currency, crypto) => {
    
    if(currency === "HenryCoin"){
        currency = "XLM";
    }
    let priceData = await axios(`https://min-api.cryptocompare.com/data/price?api_key={0aec49a900c2d7469630114260688bb1914813d1f365aa38f494f6c8a6e946d1}&fsym=XLM&tsyms=${currency.slice(0,3)}`)
    
    let price = amount_out / priceData.data[currency.slice(0,3)]

    return price.toFixed(2).toString()

}

module.exports = {main, feeCalculator, calculatePrice};
