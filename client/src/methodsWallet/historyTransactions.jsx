import StellarSdk from "stellar-sdk";
import { useState } from "react";

export default function HistoryTransactions({ publicKey }) {
  const [transactions, setTransactions] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  if(!transactions){
    server
    .transactions()
    .forAccount(publicKey)
    .call()
    .then(function (page) {
        console.log("este es page",page)
    setTransactions(page.records)
      return page.next();
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  return (
    <>
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.id}>
            {" "}
            id de transaction: {transaction.id} <br />
          </div> 
        ))}
    </>
  );
}
