import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";

export default function ClaimBalance({ publicKey, secretKey }) {
  const [balances, setBalances] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  useEffect(() => {
    if (publicKey) {
      server
        .claimableBalances()
        .claimant(publicKey)
        .limit(10) // there may be many in general
        .order("desc") // so always get the latest one
        .call()
        .then((res) => setBalances(res.records))
        .catch(function (err) {
          console.error(`Claimable balance retrieval failed: ${err}`);
        });
    }
  }, []);

  const claimBalance = async (event) => {
     
    const keyp = StellarSdk.Keypair.fromSecret(secretKey);

    console.log("soy balances  aaaaa", balances);
    const balanceId = balances.filter(
      (b) => b.id === event.target.value
    );

    const claimBalance = StellarSdk.Operation.claimClaimableBalance({
      balanceId: balanceId,
    });

    const Account = await server.loadAccount(publicKey).catch(function (err) {
      console.error(`Failed to load ${publicKey}: ${err}`);
    });

    const tx = new StellarSdk.TransactionBuilder(Account, {
      fee: StellarSdk.BASE_FEE,
    })
      .addOperation(claimBalance)
      .setNetworkPassphrase(StellarSdk.Networks.TESTNET)
      .setTimeout(0)
      .build();

    tx.sign(keyp);
    console.log("Este es el console de tx", tx);
    await server
      .submitTransaction(tx)
      .then((res) => console.log("cosnole.log de res", res))
      .catch(function (err) {
        console.error(`Tx submission failed: ${err}`);
      });
  };

  return (
    <div>
      <>
        {balances?.length > 1 &&
          balances.map((balance) => (
            <div key={balance.id}>
              <div>
                monto: {balance.amount}
                sponsor: {balance.sponsor}
                asset: {balance.asset}
                id: {balance.id}
              </div>
              <button onSubmit={(event) => claimBalance(event)}>Claim</button>
            </div>
          ))}
      </>
    </div>
  );
}