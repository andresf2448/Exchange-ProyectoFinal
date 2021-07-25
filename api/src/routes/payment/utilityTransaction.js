const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

const main = async function (sourcePublicKey, sourceKeypair, receiverPublicKey, amount) {
    // Transactions require a valid sequence number that is specific to this account.
    // We can fetch the current sequence number for the source account from Horizon.
    
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
            asset: StellarSdk.Asset.native(),
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

const assetCalculator = (sourceCurrency, receiverCurrency) => {

}

module.exports = main;
