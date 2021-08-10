import { useState, useEffect, useMemo } from "react";
import StellarSdk from "stellar-sdk";

export default function GetClaimableBalances({ publicKey }) {
  const [balances, setBalances] = useState();
  const server = useMemo(
    () => new StellarSdk.Server("https://horizon-testnet.stellar.org"),
    []
  );

  useEffect(() => {
    if (publicKey) {
      server
        .claimableBalances()
        .sponsor(publicKey)
        .limit(20)
        .order("desc")
        .call()
        .then((res) => {
          console.log('estos son los saldos reclamables por esta cuenta',res.records);
          setBalances(res.records);
        })
        .catch(function (err) {
          console.error(`Claimable balance retrieval failed: ${err}`);
        });
    }
  }, [publicKey, server]);

  return (
    <div>
      {balances?.length > 1 ? 
        balances.map((balance) => (
          <div key={balance.id}>
            <div>
              monto: {balance.amount}
              asset: {balance.asset}
              id: {balance.id}
            </div>
          </div>
        )) : <div> Sin saldos reclamables por el momento </div>}
    </div>
  );
}
