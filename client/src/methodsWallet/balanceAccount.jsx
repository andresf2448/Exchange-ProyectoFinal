import React, { useState } from "react";
import StellarSdk from "stellar-sdk";

export default function BalanceAccount() {
  const [checkedAccount, setCheckedAccount] = useState(undefined);
  const [accountToCheck, setAccountToCheck] = useState("");
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const checkBalance = async () => {
    const account = await server.loadAccount(accountToCheck)
    setCheckedAccount(account);
  };

  return (
    <div>
      <input
        onChange={({ target: { value } }) => setAccountToCheck(value)}
        value={accountToCheck}
        placeholder="Cuenta a checar"
      
      />
      <button onClick={checkBalance} variantColor="green">
        Verificar balance
      </button>

      {checkedAccount?.balances.map(({ balance, asset_code }, index) => (
        <div  key={index}>
          <div>Número: {index}</div>
          <div>{balance} </div>
          <div>XLM</div>
          <div>Asset: {asset_code}</div>
        </div>
      ))}
    </div>
  );
}
