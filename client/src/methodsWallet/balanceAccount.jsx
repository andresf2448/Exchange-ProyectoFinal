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
  checkedAccount && console.log(checkedAccount)
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

      {checkedAccount?.balances.map(({ balance, asset_code, selling_liabilities, buying_liabilities }, index) => (
        <div  key={index}>
          <div>Asset: { !asset_code ? 'XLM' : asset_code } </div>
          <div>Balance: {balance} </div>
          <div> Monto en ofertas de venta: {selling_liabilities}</div>
          <div> Monto en ofertas de compra: {buying_liabilities}</div>
        </div>
      ))}
    </div>
  );
}
