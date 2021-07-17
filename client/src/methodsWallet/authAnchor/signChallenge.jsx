import { Keypair, Transaction } from "stellar-sdk";

const signChallenge = ({ tx, secretKey }) => {
  
  const envelope = tx.result.transaction.toEnvelope().toXDR("base64");
  const transaction = new Transaction(envelope, tx.result.network_passphrase);
  transaction.sign(Keypair.fromSecret(secretKey));

  return transaction;
};

export default signChallenge;
