import { Utils, Keypair, Transaction } from "stellar-sdk";
import axios from "axios";

export default async function useAuth({
  authEndpoint,
  serverPublicKey,
  publicKey,
  secretKey,
}) {
  try {
    const tx = await startChallenge({
      authEndpoint,
      serverPublicKey,
      publicKey,
    });

    const transaction = await signChallenge({ tx, secretKey });

    if (
      transaction &&
      Utils.verifyTxSignedBy(transaction, publicKey) &&
      Utils.validateTimebounds(transaction)
    ) {
      let token = await sendChallenge({ authEndpoint, transaction });
      return token;
    }
    return false;
  } catch (error) {
    return error;
  }
}

const startChallenge = async ({ authEndpoint, serverPublicKey, publicKey }) => {
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

const signChallenge = ({ tx, secretKey }) => {
  const envelope = tx.result.transaction.toEnvelope().toXDR("base64");
  const transaction = new Transaction(envelope, tx.result.network_passphrase);
  transaction.sign(Keypair.fromSecret(secretKey));

  return transaction;
};

const sendChallenge = async ({ authEndpoint, transaction }) => {
  const params = {
    transaction: transaction.toEnvelope().toXDR("base64"),
  };

  const urlParams = new URLSearchParams(params);

  const result = await axios({
    method: "POST",
    url: authEndpoint,
    data: urlParams.toString(),
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  if (!result.token) {
    return new Error("No token returned from `/auth`");
  }

  return result.token;
};
