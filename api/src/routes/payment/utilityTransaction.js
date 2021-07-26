const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

require("dotenv").config();
const { REACT_APP_SUPABASE_PUBLIC_KEY, REACT_APP_SUPABASE_URL } = process.env;

const { createClient } = require("@supabase/supabase-js");
const { Asset } = require('stellar-sdk');
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

    }
    
    
    
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
        // let newAsset = new Asset ('USDR', 'GC6ODYBY4FY2VRF3NC3ASXLQ5Y3WKALMEQ4S4Y2OJBVREG3TO2VPZZC6')
        // console.log('La nueva Asset', newAsset)
        // console.log('La asset nativa', StellarSdk.Asset.native())
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
        console.log('Estamos en el catch', e)
        return {
            isError: true,
            error: e,
            message: 'Invalid account'
        }
    }

   

    // Submit the transaction to the Horizon server. The Horizon server will then
    // submit the transaction into the network for us.
    try {
        const transactionResult = await server.submitTransaction(transaction);
        return {
            transactionResult: JSON.stringify(transactionResult, null, 2),
            transactionLink: transactionResult._links.transaction.href,
            isError: false
        }
        // console.log(JSON.stringify(transactionResult, null, 2));
        // console.log('\nSuccess! View the transaction at: ');
        // console.log(transactionResult._links.transaction.href);
    } catch (e) {
        return {
            isError: true,
            error: e,
            message: 'An error has occured'

        }
        // console.log('An error has occured:');
        // console.log(e);
    }
}

const feeCalculator = async (amount) => {
    const {data} = await supabase
    .from('commsion_server')
    
    let amount_fee = parseFloat(amount) * (data[data.length - 1].percentage / 100)
    
    let amount_out = parseFloat(amount) - amount_fee

    return {amount_out: amount_out.toString(), fee: amount_fee.toString(), percentage: data[data.length - 1].percentage }

}

module.exports = {main, feeCalculator};
