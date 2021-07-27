import { Utils, Keypair, Transaction, Networks } from "stellar-sdk";
import axios from "axios";



export default async function useAuth(
  authEndpoint,
  serverPublicKey,
  publicKey,
  secretKey,
) {

  try {
    
    const tx = await startChallenge(
      authEndpoint,
      serverPublicKey,
      publicKey,
    );
     
    const transaction = await signChallenge( tx, secretKey );
    
    if (
      transaction &&
      Utils.verifyTxSignedBy(transaction, publicKey)
      ) {
        
        let token = await sendChallenge({ authEndpoint, transaction });

      return token;
    }
    return false;
  } catch (error) {
    console.log('Estamos en el catch', error)
    return error;
  }
}

const startChallenge = async ( authEndpoint, serverPublicKey, publicKey ) => {
  
  const params = { account: publicKey };
  
  const webDomain = 'localhost:3001'
  const webAuthDomain = 'localhost:3001/authentication'

  const authURL = new URL(authEndpoint);
  
  Object.entries(params).forEach(([key, value]) => {
    authURL.searchParams.append(key, value);
  });

  const result = await axios.get(`/authentication?clientAccountID=${publicKey}&webDomain=${webDomain}&webAuthDomain=${webAuthDomain}`);
  // const result = await axios.get(authEndpoint, {publicKey: publicKey});
  // const result = await axios.get(authURL.toString());
  
  if (!result.data) {
    throw new Error("The response didn’t contain a transaction");
  }
  
  const  {tx}  = Utils.readChallengeTx(
    result.data,
    serverPublicKey,
    Networks.TESTNET,
    webDomain, 
    webAuthDomain
  );
   
  return tx;
};

const signChallenge = ( tx, secretKey ) => {
  const envelope = tx.toEnvelope().toXDR("base64");
  const transaction = new Transaction(envelope, tx.networkPassphrase);
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
  if (!result.data.token) {
    return new Error("No token returned from `/auth`");
  }
  
  return result.data.token;
};
