import { Utils, Keypair, Transaction } from "stellar-sdk";
import axios from "axios";

export const readChallenge =  async ({
  authEndpoint,
  serverPublicKey,
  publicKey,
}) => {
  const params = { account: publicKey };

  const authURL = new URL(authEndpoint);

  Object.entries(params).forEach(([key, value]) => {
    authURL.searchParams.append(key, value);
  });

  const result = await axios.get(authURL.toString());

  if (!result.transaction) {
    throw new Error("The response didn’t contain a transaction");
  }

  const { tx } = Utils.readChallengeTx(
    result.transaction,
    serverPublicKey,
    result.network_passphrase,
    authURL.host
  );

  return tx;
};

export const signChallenge = ({ tx, secretKey }) => {
  
    const envelope = tx.result.transaction.toEnvelope().toXDR("base64");
    const transaction = new Transaction(envelope, tx.result.network_passphrase);
    transaction.sign(Keypair.fromSecret(secretKey));
  
    return transaction;
  };


  export const sendChallenge = async ({ authEndpoint, signedChallengeTransaction }) => {
    const params = {
      transaction: signedChallengeTransaction.toEnvelope().toXDR("base64"),
    };
  
    const urlParams = new URLSearchParams(params);
  
    const result = await axios({
      method: "POST",
      url: authEndpoint,
      data: urlParams.toString(),
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    if (!result.token) {
      throw new Error("No token returned from `/auth`");
    }
  
    return result.token;
  };
  