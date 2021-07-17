import { Keypair, Transaction } from "stellar-sdk";

const signChallenge = ({
  challengeTransaction,
  networkPassphrase,
  secretKey, // buscarlo en supabase
}) => {
 
  const envelope = challengeTransaction.toEnvelope().toXDR("base64");
  const transaction = new Transaction(envelope, networkPassphrase);
  transaction.sign(Keypair.fromSecret(secretKey));
  
  return transaction;
}

export default signChallenge;

