import { useState, useEffect, useMemo } from "react";
import StellarSdk from "stellar-sdk";
import Swal from "sweetalert2";

export default function ClaimBalance({ publicKey, secretKey }) {
  const [balances, setBalances] = useState();
  const server = useMemo(
    () => new StellarSdk.Server("https://horizon-testnet.stellar.org"),
    []
  );

  useEffect(() => {
    if (publicKey) {
      server
        .claimableBalances()
        .claimant(publicKey)
        .limit(20)
        .order("desc")
        .call()
        .then((res) => setBalances(res.records))
        .catch(function (err) {
          Swal.fire({
            text: `Claimable balance retrieval failed: ${err}`,
            icon: "error",
            confirmButtonText: "Okay!",
            background: "#1f1f1f",
            confirmButtonColor: "rgb(158, 158, 158)",
          });
        });
    }
  }, [publicKey, server]);

  const claimBalance = async (balance) => {
    const keyp = StellarSdk.Keypair.fromSecret(secretKey);
    const balanceId = balances.filter((b) => b.id === balance.id);

    const claimBalance = StellarSdk.Operation.claimClaimableBalance({
      balanceId: balanceId[0].id,
    });

    const Account = await server.loadAccount(publicKey).catch((err) => {
      Swal.fire({
        text: `Failed to load ${publicKey}: ${err}`,
        icon: "error",
        confirmButtonText: "Error!",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    });

    const tx = new StellarSdk.TransactionBuilder(Account, {
      fee: StellarSdk.BASE_FEE,
    })
      .addOperation(claimBalance)
      .setNetworkPassphrase(StellarSdk.Networks.TESTNET)
      .setTimeout(0)
      .build();

    tx.sign(keyp);
    await server
      .submitTransaction(tx)
      .then((res) =>
        Swal.fire({
          text: `Claim success. Operation ID: ${res.id}`,
          icon: "success",
          confirmButtonText: "Ok!",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        })
      )
      .catch(function (err) {
        Swal.fire({
          text: `Tx submission failed: ${err}`,
          icon: "error",
          confirmButtonText: "Error!",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
      });
  };

  return (
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
            <button onClick={() => claimBalance(balance)}>Claim</button>
          </div>
        ))}
    </>
  );
}
