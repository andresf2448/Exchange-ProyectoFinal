import StellarSdk from 'stellar-sdk';

export default function SubAccount(id) {
    
    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
    const publicKey = server.loadAccount("GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33")
    const account = new StellarSdk.Account.subAccount(publicKey)

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",account);

    return(
        <div>
            <p>
                holaaa subaccount
            </p>
        </div>
    )
}